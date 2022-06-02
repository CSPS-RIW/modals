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

    // Prevent inert from staying open

    if (typeof dialog.showModal !== 'function') {
        //  If a browser doesn't support the dialog, remove it and make it a link
        let linkToReplace = document.querySelector('.trigger-modal[data-modal="modal_1"]');
        console.warn('Update your browser for a more interactive experience');
        linkToReplace.classList.add('replaced-link');
        linkToReplace.classList.add('new-window');
        linkToReplace.setAttribute('target', '_blank');
        linkToReplace.setAttribute('title', 'Opens in a new window/tab');
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
            });

            // Fix bug #5373 remove inert when closing modal with esc key
            document.addEventListener('keydown', (e) => {
                if ((e.key == 'Escape' || e.key == 'Esc' || e.code == 27)) {
                    content.removeAttribute('inert');
                    // closeModal(e);
                }
            });

            // remove inert when closing modal with esc key
            modal.addEventListener('keydown', (e) => {
                let mBody = modal.querySelector('.modal-body');
                if ((e.key == 'Escape' || e.key == 'Esc' || e.code == 27)) {
                    closeModal(e);
                }
                // control sclolling inside a  modal
                if ((e.key === 'ArrowDown' || e.key == 'down arrow' || e.code === 40 || e.key === 's' || e.code === 83)) {
                    mBody.scrollBy({
                        top: 100,
                        behavior: 'smooth'
                    });
                }
                if ((e.key === 'ArrowUp' || e.key == 'up arrow' || e.code === 38 || e.key === 'w' || e.code === 87)) {
                    mBody.scrollBy({
                        top: -100,
                        behavior: 'smooth'
                    })
                }
            });

        } else {
            modal.remove();
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
                '1': 0,
                '2': 0,
                '3': 1,
                '4': 1,
                '5': 1,
                '6': 1,
                '7': 2,
                '8': 3,
            },
            resultFr: 'Results fr',
        },
        Robert: {
            id: 2,
            name: 'Robert',
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 1,
                '2': 1,
                '3': 1,
                '4': 1,
                '5': 2,
                '6': 2,
                '7': 2,
                '8': 2,
            },
            resultFr: 'Results fr',
        },
        Morena: {
            id: 3,
            name: 'Morena',
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 1,
                '2': 1,
                '3': 2,
                '4': 2,
                '5': 3,
                '6': 3,
                '7': 4,
                '8': 5,
            },
        },
        Alex: {
            id: 4,
            name: 'Alex',
            // positions: [3, 2, 3, 2, 3, 4, 5, 6],
            positions: {
                '1': 1,
                '2': 2,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 5,
                '8': 5,
            },
        }
    }

    const updatesObj = {
        'one': {
            updateEn: '<strong>Megan</strong> did not advance because she is a lesbian and has had to navigate multiple coming outs in her life. <br>The other course guides moved forward because they did not have to come out about their sexual orientation or gender identity.', //*Can be html
            updateFr: 'Update Fr 1'
        },
        'two': {
            updateEn: '<strong>Megan</strong> did not advance because she is a First Nation woman and have seen Indigenous peoples been portrayed on television in a degrading way. <br> <strong>Robert</strong> did not advance because he is a Black man and has seen other Black people portrayed on television in a stereotypical way. <br> <strong>Morena</strong> did not advance because she is from Central America and have witnessed colleagues invocating stereotypes regarding immigration when addressing to her or other immigrants. <br> <strong>Alex</strong> advanced because he is a white man, and the media positively and widely represents people of his race. ',
            updateFr: 'Update Fr 2'
        },
        'three': {
            updateEn: '<strong>Robert</strong> did not advance. Because of his dyslexia and anxiety has experienced people in his workplace making assumptions about tasks he can and cannot complete based on focus on the task itself rather than the barrier it presents and assumptions about what he can do, as opposed to adopting a person-centered lens and brainstorming together and providing accommodations. <br>Alex did not advance because of his mental health. As opposed to accommodations being asked about proactively, <strong>Alex</strong> feels as though he constantly has to advocate for himself and identify how he would like to engage in all activities and how he can best envision doing so.<br> <strong>Megan</strong> and <strong>Morena</strong> did advance.',
            updateFr: 'Update Fr 3'
        },
        'four': {
            updateEn: '<strong>Alex</strong> is the only one who advanced in this situation because as a straight white man, he does not experience systemic racism, homophobia, or transphobia. His employer’s mental health resources readily speak to his experience.',
            updateFr: 'Update Fr 4'
        },
        'five': {
            updateEn: '<strong>Megan</strong> is the only one who cannot advance here. She is a lesbian and has been sometimes afraid to express affection in social situations  ',
            updateFr: 'Update Fr 5'
        },
        'six': {
            updateEn: '<strong>Megan</strong> did not advance because even among kind, “socially-aware” colleagues, anti-Indigenous sentiment, misunderstandings, and biases towards Indigenous people prevail, negatively impacting Megan as well as concerning her based on possible negative impacts of these views on Indigenous people. <br><strong>Robert</strong> did not advance because while he has lived in Canada for his entire life, racially motivated jokes continue to make him feel like he is not totally accepted and included and he must choose whether to intervene gently to not further distance others from him OR choose to not interject when uncomfortable.<br><strong>Morena</strong> did not advance because negative views among colleagues on immigration being debated in the news make Morena question how much she can fully be accepted in her country and workplace.<br><strong>Alex</strong> advanced because… ',
            updateFr: 'Update Fr 6'
        },
        'seven': {
            updateEn: '<strong>Robert</strong> did not advance because he has dyslexia and has had to ask for accommodations on numerous times.<br><strong>Alex</strong> did not advance because he has a mental illness which is an invisible disability.<br><strong>Morena</strong> and <strong>Megan</strong> advanced because …  ',
            updateFr: 'Update Fr 7'
        },
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
    const reviewContent = () => {
        // - create array from updateObj in en || fr
        // - loop through array and display one message per click
        let updatesArr = [];
        let c = 0;
        for (let update in updatesObj) {
            const createLegend = () => {
                let updateTxt = ``;
                if (lang != 'en') {
                    updateTxt += `${updatesObj[update].updateFr}`;
                } else {
                    updateTxt += `${updatesObj[update].updateEn}`;
                }
                updatesArr.push(updateTxt);
            }
            createLegend();
        }
        // -create add label function
        const addLabel = () => {
            allQuestions.forEach(fieldset => {
                if (c < updatesArr.length && fieldset.hasAttribute('data-response') && (c + 1) == fieldset.getAttribute('data-response')) {
                    // - for each fieldset data-response=== c, add that bubble
                    let content = updatesArr[c];
                    fieldset.querySelector('legend').innerHTML = content;
                    c++;
                }
            });
        }
        // -call addLabel futction
        addLabel();
    };

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

                // reviewContent();
                if (question.hasAttribute('data-movement')) {
                    changePosition();
                    // form.focus();
                }
                reviewContent();

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