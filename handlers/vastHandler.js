const cheerio = require('cheerio');
const nodeURL = require('url');
const http = require('http');
const https = require('https');

function getXML(url) {
    let protocol = nodeURL.parse(url).protocol == 'http:' ? http : https;

    return new Promise((resolve, reject) => {
        protocol.get(url, (response) => {
            if (response.statusCode === 200) {
                response.setEncoding('utf8');
                let data = "";
                response.on('data', (chunk) => data += chunk.toString('utf8'))
                response.on('end', () => resolve(data))
            }
            else
                reject({ message: `Failed to download vast. Code${response.statusCode}, ${response.statusText}` })
        })
            .on('error', (err) => reject(err))

    })
}

function modifyXML(XML, vastData) {
    // edit the xml to add the properties 
    const $ = cheerio.load(XML, { xmlMode: true })
    const mediaFileNode = $('MediaFile')
    let CData = mediaFileNode.contents().text()
    let parsedURL = nodeURL.parse(CData)
    let vidURL = `${parsedURL.protocol}//${parsedURL.host}${parsedURL.path}?position=${vastData.position}&hide_ui=${!!vastData.hide_ui}&videoId=${vastData.id}`
    mediaFileNode.contents().text(vidURL)
    return $.xml()
}


function validateVastURL(url) {
    let protocol = nodeURL.parse(url).protocol == 'http:' ? http : https;

    return new Promise((resolve, reject) => {
        protocol.get(url, (response) => {
            if (response.statusCode >= 200 && response.statusCode <= 226) {
                let contentType = response.headers['content-type'];
                if (contentType === 'text/xml' || contentType === 'application/xml') return resolve();
                else return reject({ message: "url doesn't return a valid xml" })
            }
            else
                reject({ message: `Failed to validate vast url. Code${response.statusCode}, ${response.statusText}` })
        })
            .on('error', (err) => reject(err))
    })
}

module.exports = { validateVastURL, getXML, modifyXML }