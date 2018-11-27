const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbHandler = require('../handlers/dbHandler');
const vastHandler = require('../handlers/vastHandler');
const resHandler = require('../handlers/responseHandler');

router.get('/fetch_vast', async function (req, res) {
    try {
        // sanitize input
        let vastId = dbHandler.sanitize(req.query.id);

        let q = `SELECT * FROM heroku_7fcf0ba2a626332.vasts WHERE id=${vastId}`
        // let q = `SELECT * FROM vasts WHERE id=${vastId}`
        let vastData = await dbHandler.fetch(q) // get vast's data from db
        let vastXML;
        if (!vastData)
            vastXML = '<VAST version="2.0"></VAST>'
        else {
            vastXML = await vastHandler.getXML(vastData.vast_url); // download vast
            vastXML = await vastHandler.modifyXML(vastXML, vastData); // modify vast to include relevant properties
        }

        return res.header('Content-Type', 'application/xml')
            .send(vastXML)
    }
    catch (err) {
        return resHandler.error(res, 400, 'Failed to fetch vast', err)
    }
})

router.post('/create_vast', async function (req, res) {
    try {
        // check if valid url 
        await vastHandler.validateVastURL(req.body.vast_url)
        let vData = dbHandler.sanitize(req.body);

        // validate and sanitize all vData inputs
        // let q = `INSERT INTO cheq_exercise.vasts (vast_url, position, hide_ui) VALUES (${vData.vast_url}, ${vData.position}, ${vData.hide_ui})`;
        let q = `INSERT INTO vasts (vast_url, position, hide_ui) VALUES (${vData.vast_url}, ${vData.position}, ${vData.hide_ui})`;
        let creation = await dbHandler.insert(q);
        return resHandler.success(res, 201, 'vast created', creation)

    } catch (error) {
        return resHandler.error(res, 400, 'Failed to create vast', error)
    }
})

module.exports = router