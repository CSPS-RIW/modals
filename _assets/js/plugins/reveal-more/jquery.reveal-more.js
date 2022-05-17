$(function () {
    $.fn.revealMore = () => {
        let $txa1 = $('#q1');
        let $txa2 = $('#q2');

        $('.custom-collapse').hide();

        // BTN 1
        $('.custom-btn-reveal#rvm1').data('reveal-more', 'reveal_1').on('click', () => {
            // Validate form
            if ($txa1.val() === '' || $txa1.val() == null) {
                if ($('html').attr('lang') != 'en') {
                    alert('Ecrivez votre réponse')
                } else {

                    alert('Write down your response')
                }
            } else {

                // Show hidden content
                let $that = $(this);
                if ($that.attr('data-reveal-more', 'reveal_1') && $('.custom-collapse').attr('data-revealme', 'reveal_1')) {
                    $('.custom-collapse.reveal_1').show() && setTimeout(() => {
                            $('.custom-btn-reveal.reveal_1')
                                .attr('disabled', 'disabled')
                                .addClass('btn-disabled');
                            $txa1.attr('disabled', 'disabled');

                        },
                        100)

                }
            }

        })
        // BTN 2
        $('.custom-btn-reveal#rvm2').data('reveal-more', 'reveal_2').on('click', () => {
            // Validate form
            if ($txa2.val() === '' || $txa2.val() == null) {
                if ($('html').attr('lang') != 'en') {
                    alert('Ecrivez votre réponse')
                } else {

                    alert('Write down your response')
                }
            } else {

                // Show hidden content
                let $that = $(this);
                if ($that.attr('data-reveal-more', 'reveal_2') && $('.custom-collapse').attr('data-revealme', 'reveal_2')) {
                    $('.custom-collapse.reveal_2').show() && setTimeout(() => {
                            $('.custom-btn-reveal.reveal_2')
                                .attr('disabled', 'disabled')
                                .addClass('btn-disabled');
                            $txa2.attr('disabled', 'disabled');


                        },
                        100)
                }

            }
        })

        // Possible way to refactor http://jsfiddle.net/3xdq3Lb3/
        // Select .custom-textarea maybe?



        return this;

    }
}(jQuery));