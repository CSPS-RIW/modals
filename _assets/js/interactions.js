$(function () {
	// ADD CUSTOM JS HERE!
	/*
	 *Privilege activity
	 */
	//clamp between min and max values
	function clamp(number, min, max) {
		return Math.max(min, Math.min(number, max));
	}

	function simpleArraySum(ar) {
		let sum = 0;
		for (let i = 0; i < ar.length; i++) {
			sum += ar[i];
		}
		return sum;
	}

	let pa = $('.privilege-activity');
	let megan = pa.find('.pa-figure').children('.megan');
	let meganPos = megan.data('pos');
	let paLiveRegion = $('.pa-sr-hide');

	let stepMin = 1;
	let stepMax = 11;
	let countSteps = meganPos;

	const liveRegionMsg = [
		'Morena has moved toward More Privilege.',
		'Morena has moved toward Less Privilege.',
		'Morena has reached the highest point of the Privilege scale.',
		'Morena has reached the lowest point of the Privilege scale.'
	];

	let nbQuestions = pa.find('fieldset');
	let allQuestions = document.querySelectorAll('fieldset');
	let posArr = [];

	let newQuestArr = [];

	Array.from(allQuestions, (question) => {
		newQuestArr.push(question);
	})
	console.log(newQuestArr)
	newQuestArr.forEach((question, index) => {

		// console.log(newQuestArr.getAttribute('data-last'))
		// TODO if it is the last fieldset, don't add class hidden
		question.addEventListener('change', () => {
			let nextField = question.nextElementSibling;
			let currentField = question;
			if (!newQuestArr[index].hasAttribute('data-last')) {
				// Show/hide fieldset
				currentField.setAttribute('slide-up', '');
				nextField.setAttribute('slide-down', '');
				nextField.classList.remove('hidden');

				setTimeout(() => {
					nextField.classList.remove('hidden');
					currentField.classList.add('hidden');
					// Add extra info
					let didYouKnow = document.querySelectorAll('.did-you-know');
					let facts = [
						'Apples are red',
						'Bananas are yellow',
						'Oranges are orange',
						'Pears are brown or green'
					]
					// TODO Make this work in vanilla js
					for (let i = 0; i <= didYouKnow.length; i++) {
						let currFact = document.querySelector(`.fact${i}`);
						let legendFact = document.querySelector(`.did-you-know${i} > legend`);
						// currFact.remove();
						legendFact.appendChild(`<div class="fact${i} alert alert-primary">Did you know? ${facts[i - 1]}.</div>`);
					}
				}, 500);

				setTimeout(() => {
					nextField.removeAttribute('slide-down');
					currentField.removeAttribute('slide-up');
				}, 500);



			} else {
				alert('last')
			}

		})

	});

	$(nbQuestions).each(function (index) {
		posArr.push(0);

		var index = index;

		$(this).find('input[type=radio]').on('change', function () {
			let value = $(this).attr('value');
			//var reducer = (previousValue, currentValue) => previousValue + currentValue;
			let oldValueinArray = posArr[index];

			posArr[index] = parseInt(value);
			// Sum of array entries
			//var posArrSum = posArr.reduce(reducer);

			let posArrSum = simpleArraySum(posArr);

			// console.log(posArrSum)

			let finalPos = countSteps + posArrSum;

			// console.log(posArr);

			meganPos = clamp(finalPos, stepMin, stepMax);
			megan.attr('data-pos', meganPos);

			// console.log('old: ' + oldValueinArray, 'new: ' + posArr[index]);

			if (posArr[index] > oldValueinArray) {
				paLiveRegion.html('<p>' + liveRegionMsg[0] + ' Morena is at position ' + meganPos + ' out of ' + stepMax + '.</p>');
			} else if (posArr[index] < oldValueinArray) {
				paLiveRegion.html('<p>' + liveRegionMsg[1] + ' Morena is at position ' + meganPos + ' out of ' + stepMax + '.</p>');
			} else if (posArr[index] == oldValueinArray) {
				paLiveRegion.html('<p>Morena is still at position ' + meganPos + ' out of ' + stepMax + '.</p>');
			}

			if (meganPos === stepMax) {
				paLiveRegion.html('<p>' + liveRegionMsg[2] + '</p>');
			} else if (meganPos === stepMin) {
				paLiveRegion.html('<p>' + liveRegionMsg[3] + '</p>');
			}

		});

	});

});