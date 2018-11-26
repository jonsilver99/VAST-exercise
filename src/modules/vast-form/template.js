export const vastFormTemplate = `
<form id="vast-form" action="">

    <div id="form-head">
        <h2>New vast</h2>
        <div id="feedback"></div>
    </div>

    <div class="field-wrapper">
        <label for="">Vast url</label>
        <input type="text" name="vast_url">
    </div>

    <div class="field-wrapper">
        <label for="">Position</label>
        <select name="position">
            <option value="top_left">Top left</option>
            <option value="top_middle">Top middle</option>
            <option value="top_right">Top right</option>
            <option value="middle_left">Middle left</option>
            <option value="middle_right">Middle right</option>
            <option value="bottom_left">Bottom left</option>
            <option value="bottom_middle">Bottom middle</option>
            <option value="bottom_right">Bottom right</option>
        </select>
    </div>

    <div class="field-wrapper">
        <label for="">Hide ui</label>
        <select name="hide_ui">
            <option value="0">False</option>
            <option value="1">True</option>
        </select>
    </div>

    <div class="field-wrapper submit-field">
        <button type="submit">Create</button>
    </div>

</form>
`