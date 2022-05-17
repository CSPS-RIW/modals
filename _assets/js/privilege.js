window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init();

});

const init = () => {
    'use strict';
    form();
    modals();
}

const modals = () => {
    let triggerBtn = document.querySelectorAll('.trigger-btn');
    let closeBtns = document.querySelectorAll('.close-modal');
    let dialog = document.querySelector('dialog');
    let modals = document.querySelectorAll('dialog');
    let content = document.querySelector('.D2L-template-layout');

    if (typeof dialog.showModal !== 'function') {
        modals.hidden === true;
        console.log('Update your browser for a more interactive experience');
    }

    modals.forEach((modal) => {
        if (typeof dialog.showModal === "function") {

            triggerBtn.forEach(trigger => {
                trigger.addEventListener('click', (e) => {

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

                })
            });

            // Close modals
            closeBtns.forEach(button => {
                button.addEventListener('click', (e) => {
                    let closestDialog = e.target.closest('dialog');
                    // Animate closing modals
                    closestDialog.setAttribute('hiding', '');
                    content.removeAttribute('inert');
                    closestDialog.addEventListener('animationend', () => {
                        closestDialog.close();
                        closestDialog.removeAttribute('hiding');
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
                    content.removeAttribute('inert');
                    closestDialog.addEventListener('animationend', () => {
                        closestDialog.close();
                        closestDialog.removeAttribute('hiding');
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
                    content.removeAttribute('inert');

                    closestDialog.addEventListener('animationend', () => {
                        closestDialog.close();
                        closestDialog.removeAttribute('hiding');
                    }, {
                        once: true
                    })

                }
            })
        } else {
            // TODO If a browser doesn't support the dialog, then hide the
            // dialog contents by default and add content modal content to div
            console.warn('Update your browser for a more interactive experience');
            modal.hidden = true;

        }

    })
}

const form = () => {
    'use strict';
    let lang = document.querySelector('html').getAttribute('lang');
    let paResult = document.querySelector('.pa-result');
    let triggerBtnForm = document.querySelectorAll('.trigger-btn');
    let allQuestions = document.querySelectorAll('fieldset');
    let newQuestArr = [];

    const characterObj = {
        Megan: {
            id: 1,
            name: 'Megan',
            positions: [3, 2, 3, 2, 3, 4, 5, 6],
            updatesEn: [
                'Megan went back because 3',
                'Megan went back because 2',
                'Megan went forwards because 3',
                'Megan went back because 2',
                'Megan went forwards because 3',
                'Megan went forwards because 4',
                'Megan went forwards because 5',
                'Megan went forwards because 6',
            ],
            resultEn: 'Megan ended in 6',
            updatesFr: [
                'FR Megan went back because 3',
                'FR Megan went back because 2',
                'FR Megan went forwards because 3',
                'FR Megan went back because 2',
                'FR Megan went forwards because 3',
                'FR Megan went forwards because 4',
                'FR Megan went forwards because 5',
                'FR Megan went forwards because 6',
            ],
            resultFr: 'Results fr',
        },
        Robert: {
            id: 2,
            name: 'Robert',
            positions: [3, 2, 3, 2, 3, 4, 5, 6],
            updatesEn: [
                'Robert went back because 3',
                'Robert went back because 2',
                'Robert went forwards because 3',
                'Robert went back because 2',
                'Robert went forwards because 3',
                'Robert went forwards because 4',
                'Robert went forwards because 5',
                'Robert went forwards because 6',
            ],
            resultEn: 'Robert ended in 6',
            updatesFr: [
                'FR Robert went back because 3',
                'FR Robert went back because 2',
                'FR Robert went forwards because 3',
                'FR Robert went back because 2',
                'FR Robert went forwards because 3',
                'FR Robert went forwards because 4',
                'FR Robert went forwards because 5',
                'FR Robert went forwards because 6',
            ],
            resultFr: 'Results fr',
        },
        Morena: {
            id: 3,
            name: 'Morena',
            positions: [3, 2, 3, 2, 3, 4, 5, 6],
            updatesEn: [
                'Morena went back because 3',
                'Morena went back because 2',
                'Morena went forwards because 3',
                'Morena went back because 2',
                'Morena went forwards because 3',
                'Morena went forwards because 4',
                'Morena went forwards because 5',
                'Morena went forwards because 6',
            ],
            resultEn: 'Morena ended in 6',
            updatesFr: [
                'FR Morena went back because 3',
                'FR Morena went back because 2',
                'FR Morena went forwards because 3',
                'FR Morena went back because 2',
                'FR Morena went forwards because 3',
                'FR Morena went forwards because 4',
                'FR Morena went forwards because 5',
                'FR Morena went forwards because 6',
            ],
            resultFr: 'Results fr',
        },
        Alex: {
            id: 4,
            name: 'Alex',
            positions: [3, 2, 3, 2, 3, 4, 5, 6],
            updatesEn: [
                'Alex went back because 3',
                'Alex went back because 2',
                'Alex went forwards because 3',
                'Alex went back because 2',
                'Alex went forwards because 3',
                'Alex went forwards because 4',
                'Alex went forwards because 5',
                'Alex went forwards because 6',
            ],
            resultEn: 'Alex ended in 6',
            updatesFr: [
                'FR Alex went back because 3',
                'FR Alex went back because 2',
                'FR Alex went forwards because 3',
                'FR Alex went back because 2',
                'FR Alex went forwards because 3',
                'FR Alex went forwards because 4',
                'FR Alex went forwards because 5',
                'FR Alex went forwards because 6',
            ],
            resultFr: 'Results fr',
        }
    }

    const createModalContent = () => {
        // TODO if data pos === p, show new update message
        let c = 1; // Count
        let p = 0; // Position
        for (const character in characterObj) {
            let dialog = '';
            let dialogBody = document.querySelectorAll(`#modal_${c} .modal-body`);
            dialogBody.forEach(content => {
                dialog += `<img src="./_assets/images/SVG/${characterObj[character].name.toLowerCase()}-sm.svg" alt="" style="height: 15em;position: relative;left: 30%;">`;
                if (lang !== 'fr') {
                    dialog += `<p>${characterObj[character].updatesEn[p]}</p>`;
                } else {
                    dialog += `<p>${characterObj[character].updatesFr[p]}</p>`;
                }
                content.innerHTML = dialog;
            });
            c++;
        }
    }

    Array.from(allQuestions, (question) => {
        newQuestArr.push(question);
    })
    newQuestArr.forEach((question, index) => {
        question.addEventListener('change', () => {
            // TODO Show modal btn after first cickps
            let nextField = question.nextElementSibling;
            let currentField = question;
            if (!newQuestArr[index].hasAttribute('data-last')) {
                // Show/hide fieldset
                currentField.setAttribute('slide-up', '');
                nextField.setAttribute('slide-down', '');
                nextField.classList.remove('hidden');
                let counter = 0;
                // Add focus to top of img to allow kb users 
                // interact with dialogs
                paResult.focus();
                // show modal btns
                // TODO add fadein animation
                triggerBtnForm.forEach(button => {
                    button.classList.contains('hidden') ?
                        button.classList.remove('hidden') : '';
                });
                console.log(triggerBtnForm)

                createModalContent();

                setTimeout(() => {
                    nextField.classList.remove('hidden');
                    currentField.classList.add('hidden');

                }, 500);

                setTimeout(() => {
                    nextField.removeAttribute('slide-down');
                    currentField.removeAttribute('slide-up');
                }, 500);

                // counter = (counter + 1) % characterObj[character].name;
                // console.log(counter)

            } else {
                // TODO if it is the last fieldset, don't add class hidden

                alert('last')
            }

        })

    });
}