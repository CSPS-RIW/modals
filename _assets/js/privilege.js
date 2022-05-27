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
    let triggerModal = document.querySelectorAll('.trigger-modal');
    let closeBtns = document.querySelectorAll('.close-modal');
    let dialog = document.querySelector('dialog');
    let modals = document.querySelectorAll('dialog');
    let content = document.querySelector('.D2L-template-layout');
    let linkToReplace = document.querySelector('.trigger-modal[data-modal="modal_1"]');

    console.log(linkToReplace);

    const closeModal = (e) => {
        let closestDialog = e.target.closest('dialog');
        // Animate closing modals
        content.removeAttribute('inert');
        closestDialog.setAttribute('hiding', '');
        closestDialog.addEventListener('animationend', () => {
            closestDialog.close();
            closestDialog.removeAttribute('hiding');
        }, {
            once: true
        })
    }

    if (typeof dialog.showModal !== 'function') {
        // TODO If a browser doesn't support the dialog, then hide the
        // dialog contents by default and add content modal content to div
        console.warn('Update your browser for a more interactive experience');
        linkToReplace.classList.add('replaced-link');
        linkToReplace.classList.add('new-window');
        linkToReplace.setAttribute('target', '_blank');
        linkToReplace.href = "https://app.csps-efpc.gc.ca/d2l/le/lessons/9301/topics/35138";
        linkToReplace.classList.remove('trigger-modal');
        linkToReplace.removeAttribute('data-modal');
    }

    modals.forEach((modal) => {
        if (typeof dialog.showModal === "function") {

            triggerModal.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
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
                    closeModal(e);
                });
            });
            // Close modal w/ backdrop
            modal.addEventListener('click', (e) => {
                if (e.target.nodeName === 'DIALOG') {
                    closeModal(e);
                }
            })

            // remove inert when closing modal with esc key
            modal.addEventListener('keydown', (e) => {
                if ((e.key == 'Escape' || e.key == 'Esc' || e.code == 27)) {
                    closeModal(e);

                }
            })
        } else {
            modal.hidden = true;
        }

    })
}

const form = () => {
    'use strict';
    let lang = document.querySelector('html').getAttribute('lang');
    let paResult = document.querySelector('.pa-result');
    let triggerModalForm = document.querySelectorAll('.trigger-btn');
    let allQuestions = document.querySelectorAll('fieldset');
    let characterPositions = document.querySelectorAll('.figure-cont');
    let form = document.querySelector('form');
    let summaryArea = document.querySelector('.pa-questions');
    let dataPosIndx = 1;
    let newQuestArr = [];

    const characterObj = {
        Megan: {
            id: 1,
            name: 'Megan',
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 4,
                '2': 3,
                '3': 4,
                '4': 3,
                '5': 2,
                '6': 1,
                '7': 2,
                '8': 3,
            },
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
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 6,
                '2': 5,
                '3': 4,
                '4': 3,
                '5': 4,
                '6': 3,
                '7': 2,
                '8': 1,
            },
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
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 6,
                '2': 5,
                '3': 6,
                '4': 5,
                '5': 6,
                '6': 5,
                '7': 6,
                '8': 7,
            },
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
        },
        Alex: {
            id: 4,
            name: 'Alex',
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 6,
                '2': 7,
                '3': 6,
                '4': 7,
                '5': 8,
                '6': 8,
                '7': 7,
                '8': 6,
            },
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
        }
    }


    // Change persona position based on position index in characterObj
    const changePosition = () => {
        for (let character in characterObj) {
            let currentChar = characterObj[character];
            characterPositions.forEach((personaPosition) => {
                let persona = personaPosition.getAttribute('data-persona');
                if (persona === currentChar.name.toLowerCase()) {
                    personaPosition.setAttribute('data-pos', currentChar.positions[dataPosIndx])
                }
            })
        }
        dataPosIndx++;

    };

    const lastPosition = () => {
        dataPosIndx = 8;
        for (let character in characterObj) {
            let currentChar = characterObj[character];
            characterPositions.forEach((personaPosition) => {
                let persona = personaPosition.getAttribute('data-persona');
                if (persona === currentChar.name.toLowerCase()) {
                    personaPosition.setAttribute('data-pos', currentChar.positions[dataPosIndx])
                }
            })
        }
    }
    // TODO Add focus to newSummaryArea when it first appear so screen reader reads it?
    // Display message with where the characters ended
    const resultSummary = () => {
        let newSummaryArea = document.createElement('div');
        let i = 1;
        newSummaryArea.classList.add('summary-content');
        summaryArea.insertAdjacentElement('beforeend', newSummaryArea);
        for (let character in characterObj) {
            let currChar = characterObj[character];
            if (lang !== 'fr') {
                // English content
                let newParagraph = document.createElement('p');
                newParagraph.classList.add(`summary-item-${i}`);
                newParagraph.innerText = `${currChar.name} ended in position ${currChar.positions[8]}.`;
                newSummaryArea.insertAdjacentElement('beforeend', newParagraph);
            } else {
                // French content
                let newParagraph = document.createElement('p');
                newParagraph.classList.add(`summary-item-${i}`);
                newParagraph.innerText = `${currChar.name} a terminé en position ${currChar.positions[8]}.`;
                newSummaryArea.insertAdjacentElement('beforeend', newParagraph);
            }
            i++;
        }
    }

    Array.from(allQuestions, (question) => {
        newQuestArr.push(question);
    })
    newQuestArr.forEach((question, index) => {
        question.addEventListener('change', () => {
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
                triggerModalForm.forEach(button => {
                    if (button.classList.contains('hidden')) {
                        button.classList.remove('hidden');
                        button.setAttribute('showing', '');
                        button.addEventListener('animationend', () => {
                            button.removeAttribute('showing');
                        }, {
                            once: true
                        })
                    };
                });

                changePosition();
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
                // TODO add results
                form.remove();
                lastPosition();
                resultSummary();

            }

        })

    });
}