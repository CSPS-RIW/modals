$(function () {
    /* ***************************************************************************************
     * * RevealMore
     * **************************************************************************************/
    // $('.revealMore').revealMore();

    /* ***************************************************************************************
     * * DragonDrop
     * **************************************************************************************/
    // window.dragManager = new DragManager();
    // window.dragManager.initialize();

    // console.log('plugins')


    //  Flipcards Fix 
    $.each($('.flip-card-content'), function (index) {
        $(this).attr({
            tabindex: '0',
            role: 'button',
        });
    });
    $('.flip-card-content').on('click', function () {
        $(this).toggleClass('apply-flip');
    });
    /** Trigger Click on Focus + Enter  **/
    $('.flip-card-content').keydown(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === 13) {
            $(e.target).trigger('click');
        }
    });

    /* Fix button to open & close all accordion slides. */
    $.each($('button.expandall'), function (index) {
        $(this).attr('aria-expanded', 'false');
    });
    $('.expandall').on('click', function () {
        var nextAccordion = $(this).parent().next('.accordion');
        /* in case button is not in p tag */
        if ($(this).next('.accordion').length > 0) {
            nextAccordion = $(this).next('.accordion');
        }
        var nextAccId = '#' + nextAccordion.attr('id');
        if ($(nextAccId).hasClass('show-all')) {
            $(nextAccId + ' .collapse.show').collapse('hide');
            $(nextAccId).removeClass('show-all');
            $(this).attr('aria-expanded', 'false');

            const lang = document.documentElement.lang;

            if (lang === 'fr') {
                $(this).text('Ouvrir tous les panneaux');
            } else {
                $(this).text('Open All Panels');
            }
        } else {
            $(nextAccId + ' .collapse:not(".show")').collapse('show');
            $(nextAccId).addClass('show-all');
            $(this).attr('aria-expanded', 'true');
            const lang = document.documentElement.lang;

            if (lang === 'fr') {
                $(this).text('Fermer tous les panneaux');
            } else {
                $(this).text('Close All Panels');
            }
        }
    });


});