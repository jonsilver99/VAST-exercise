import './vast-form.css'
import { vastFormTemplate } from './template'
import { extractErrorMessage } from '../errorHandler/ErrorHandler'

function initialize(parentContainer) {
    // insert module's template to the parent container
    $(parentContainer).html(vastFormTemplate);

    $('#vast-form').on('submit', function (e) {
        e.preventDefault();
        let inputs = {};
        $(this).serializeArray().forEach(field => inputs[field.name] = field.value);
        postNewVast(inputs)
    })
}

function postNewVast(inputs) {
    $.ajax({
        method: 'POST',
        url: `http://localhost:4200/vasts/create_vast`,
        data: inputs,
        dataType: 'json'
    })
        .then(res => {
            console.log(res)
            setSuccessMessage(`Vast #${res.data.insertId} created!`)
        })
        .catch(error => {
            let errorMsgs = extractErrorMessage(error)
            console.log(errorMsgs.consoleMessage)
            setErrorMessage(errorMsgs.clientMessage)
        })
}

function setErrorMessage(message) {
    $('#vast-form #feedback').html(`<label id="error-message">${message}</label>`);
}

function setSuccessMessage(message) {
    $('#vast-form #feedback').html(`<label id="success-message">${message}</label>`);
}

export const vastForm = { initialize }

/*
Example vasts to create
https://video.combotag.com/17.xml
http://demo.tremorvideo.com/proddev/vast/vast2RegularLinear.xml
http://shadowcdn-01.yumenetworks.com/ym/1B3uA91O2152/1349/levLYHWa/vpaid_u_as3.xml
http://demo.tremorvideo.com/proddev/vast/vast1VPAIDLinear.xml
http://demo.tremorvideo.com/proddev/vast/vast2VPAIDLinear.xml
*/