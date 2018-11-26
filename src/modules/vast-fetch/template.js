export const vastFetchTemplate = `
    <div id="vast-fetch-ui">
        <div id="fetch-controls">
            <button id="fetch-button">Fetch</button>
            <input id="fetch-input" type="number" placeholder="Enter vast id (i.e - 1, 2...)">
            <label id="fetch-error"></label>
        </div>
        <div id="vast-viewer">
            <div id="buttons-container">
                <button id="show-xml">show xml</button>
                <button id="show-video">show video</button>
            </div>
            <div id="xml-container" class="view-container"></div>
            <div id="video-container" class="view-container"></div>
        </div>
    </div>
`