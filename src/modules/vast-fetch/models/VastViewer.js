import * as VASTPlayer from 'vast-player'
import { Builder } from 'xml2js';

export class VastViewer {

    constructor(mainContainer, xmlContainer, videoContainer) {
        this._mainContainer = mainContainer
        this._xmlContainer = xmlContainer
        this._videoContainer = videoContainer
        this._videoPlayer = new VASTPlayer(this._videoContainer)
        this.initShowButtons();
    }

    reveal() {
        $(this._mainContainer).addClass('revealed')
    }

    clear() {
        $(this._xmlContainer).html(null)
        $(this._videoContainer).html(null)
        $(this._mainContainer).removeClass('revealed')
    }

    printVastXML(XMLString) {
        let formatted = new Builder().buildObject(XMLString)
        $(this._xmlContainer).html(`<pre>${formatted}</pre>`)
    }

    loadVastVideo(url) {
        // function will be called with 'false' url when vast doesnt contain a valid video
        if (!url)
            return $(this._videoContainer).html('<h2>Vast doesnt contain valid media</h2>');

        // if url exists - fetch, load and play
        return this._videoPlayer.load(url)
            .then(() => this._videoPlayer.startAd())
            .catch(err => {
                $(this._videoContainer).html('<h2>Vast doesnt contain valid media</h2>')
                throw err;
            });
    }

    initShowButtons() {
        $('#show-xml').click(() => this.showXML())
        $('#show-video').click(() => this.showVideo())
    }

    showXML() {
        $(this._videoContainer).removeClass('show');
        $(this._xmlContainer).addClass('show');
    }

    showVideo() {
        $(this._xmlContainer).removeClass('show');
        $(this._videoContainer).addClass('show');
    }
}