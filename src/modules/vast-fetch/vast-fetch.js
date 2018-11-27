import './vast-fetch.css';
import './vast-viewer.css';
import { vastFetchTemplate } from './template'
import { VastViewer } from './models/VastViewer';
import { extractErrorMessage } from '../errorHandler/ErrorHandler'

let vastViewer;

function initialize(parentContainer) {
    // insert module's template to the parent container
    $(parentContainer).html(vastFetchTemplate);
    vastViewer = new VastViewer($('#vast-viewer')[0], $('#xml-container')[0], $('#video-container')[0])

    $('#fetch-button').on('click', function () {
        setErrorMessage(null);
        vastViewer.clear()
        let vastId = $('#fetch-input').val();
        if (vastId)
            fetchVast(vastId);
        else
            setErrorMessage('No vast id entered');
    })
}

async function fetchVast(id) {
    try {
        // reveal vast viewer
        vastViewer.reveal();
        let vastUrl = `/vasts/fetch_vast?id=${id}`;
        console.log('changed')
        // fetch vast xml
        let vastString = await $.ajax({ method: 'GET', url: vastUrl, dataType: 'text' });
        if (!vastString) throw 'Couldnt fetch vast string';
        // print and show xml view (default)
        vastViewer.printVastXML(vastString);
        vastViewer.showXML()

        // if the vast contains a valid video - try to load and play it, otherwise notify 'invalid'
        if (vastString == '<VAST version="2.0"></VAST>')  
            vastViewer.loadVastVideo(false)
        else
            await vastViewer.loadVastVideo(vastUrl)

    } catch (error) {
        let errorMsgs = extractErrorMessage(error)
        console.log(errorMsgs.consoleMessage)
        setErrorMessage(errorMsgs.clientMessage)
    }
}

function setErrorMessage(message) {
    $('#fetch-error').text(message)
}

export const vastFetch = { initialize }