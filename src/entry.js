import './styles.css'
// vast-fetch module
import { vastFetch } from './modules/vast-fetch/vast-fetch'
import { vastFetchTemplate } from './modules/vast-fetch/template'
// vast-form module 
import { vastForm } from './modules/vast-form/vast-form'
import { vastFormTemplate } from './modules/vast-form/template'

$(document).ready(function () {

    var toggleButtons = $('.toggleBtn'); // toggle buttons between fetch and create views
    var parentContainer = $('#main-content')[0];

    toggleButtons.click(function () {
        let clicked = this

        // highlight clicked button
        toggleButtons.removeClass('selected');
        $(clicked).addClass('selected');

        // append and initialize selected module
        if (clicked.id == 'toggle-vast-fetch')
            vastFetch.initialize(parentContainer);

        else if (clicked.id == 'toggle-vast-form')
            vastForm.initialize(parentContainer);
    })

    // initialize vastFetch module by default 
    $('#toggle-vast-fetch').click();
})