const express = require('express');
const router = express.Router();
const fs = require('fs');
const dbHandler = require('../handlers/dbHandler');
const vastHandler = require('../handlers/vastHandler');
const resHandler = require('../handlers/responseHandler');

router.get('/fetch_vast', async function (req, res) {
    try {
        let vastId = dbHandler.sanitize(req.query.id); // sanitize input
        let vastData = await dbHandler.fetch(vastId) // get vast's data from db
        let vastXML;
        if (!vastData)
            vastXML = '<VAST version="2.0"></VAST>'
        else {
            vastXML = await vastHandler.getXML(vastData.vast_url); // download vast
            vastXML = await vastHandler.modifyXML(vastXML, vastData); // modify vast to include relevant properties (position etc...)
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
        await vastHandler.validateVastURL(req.body.vast_url); // check if valid url
        let vData = dbHandler.sanitize(req.body); // sanitize input
        let creation = await dbHandler.insert(vData); // create db record

        return resHandler.success(res, 201, 'vast created', creation)

    } catch (error) {
        return resHandler.error(res, 400, 'Failed to create vast', error)
    }
})

module.exports = router