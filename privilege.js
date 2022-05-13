window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init();

});

const init = () => {
    modals();
}

const modals = () => {
    let triggerBtn = document.querySelectorAll('.trigger-btn');
    let closeBtns = document.querySelectorAll('.close-modal');
    let dialog = document.querySelector('dialog');
    let modals = document.querySelectorAll('dialog');
    let content = document.querySelector('.D2L-template-layout');

    // TODO If a browser doesn't support the dialog, then hide the
    // dialog contents by default and add content modal content to div
    if (typeof dialog.showModal !== 'function') {
        dialog.classList.add('hidden');
        console.log('Update your browser for a more interactive experience');

    }

    modals.forEach((modal) => {
        triggerBtn.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (typeof dialog.showModal === "function") {
                    // if trigger's data-modal maches modal's id, open that one
                    if (e.target.getAttribute('data-modal') === modal.getAttribute('id')) {
                        modal.setAttribute('showing', '');
                        modal.showModal();
                        modal.addEventListener('animationend', () => {
                            modal.removeAttribute('showing');
                            content.setAttribute('inert', 'true');
                        }, {
                            once: true
                        })
                    }
                } else {
                    console.log('Update your browser for a more interactive experience');
                    modal.hidden = true;

                }
            })
        });

        // Close modals
        closeBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                let closestDialog = e.target.closest('dialog');
                // Animate closing modals
                closestDialog.setAttribute('hiding', '');
                closestDialog.close();
                closestDialog.addEventListener('animationend', () => {
                    closestDialog.removeAttribute('hiding');
                    content.removeAttribute('inert');
                }, {
                    once: true
                })
            });
        });
        // Close modal w/ backdrop
        modal.addEventListener('click', (e) => {
            let closestDialog = e.target.closest('dialog');
            // e.target.nodeName === 'DIALOG' ? modal.close() : '';
            if (e.target.nodeName === 'DIALOG') {
                closestDialog.setAttribute('hiding', '');
                closestDialog.addEventListener('animationend', () => {
                    closestDialog.close();
                    closestDialog.removeAttribute('hiding');
                    content.removeAttribute('inert');
                }, {
                    once: true
                })
            }
        })

        // remove inert when closing modal with esc key
        modal.addEventListener('keydown', (e) => {
            // e.preventDefault();
            let closestDialog = e.target.closest('dialog');
            if ((e.key == 'Escape' || e.key == 'Esc' || e.code == 27)) {
                console.log(e.target.nodeName);
                closestDialog.setAttribute('hiding', '');
                closestDialog.addEventListener('animationend', () => {
                    closestDialog.close();
                    closestDialog.removeAttribute('hiding');
                    content.removeAttribute('inert');
                }, {
                    once: true
                })

            }
        })

    })
}