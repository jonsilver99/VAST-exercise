function extractErrorMessage(error) {
    let consoleMessage;
    let clientMessage;

    // reduce error response
    if (error.responseJSON)
        error = error.responseJSON
    else if (error.responseText)
        error = JSON.parse(error.responseText)

    // extract error messages
    consoleMessage = error;
    if (typeof error === 'string')
        clientMessage = error
    else
        clientMessage = (error.message) ? error.message : 'Error occured. refer to console for further info';

    return { consoleMessage, clientMessage };
}

export { extractErrorMessage }