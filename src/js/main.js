document.addEventListener('DOMContentLoaded', function () {
    const resultWindow = document.querySelector('.result');
    const resultText = document.getElementById('resultText');
    const resultIcon = document.getElementById('resultIcon');
    const generateNumberBtn = document.getElementById('generateNumber');
    const generateActionBtn = document.getElementById('generateAction');
    const closeButton = document.querySelector('.btn-close');

    generateNumberBtn.addEventListener('click', generateRandomNumber);
    generateActionBtn.addEventListener('click', generateRandomAction);
    closeButton.addEventListener('click', closeCard);

    function closeCard() {
        resultWindow.classList.add('hidden');
    };

    function generateRandomNumber() {
        if(generateNumberBtn.classList.contains('disabled')){
            return
        } else {
            generateNumberBtn.classList.add('disabled');
            const randomNumber = Math.floor(Math.random() * 4) + 1;
            displayResult(randomNumber, 'https://api.iconify.design/mdi/crystal-ball.svg?color=white&width=70&height=70');
            enableButton('#generateNumber', 2000)
        }
    }

    function generateRandomAction() {
        const actions = [
            {
                name: 'Oops...you were bitten!',
                icon: 'https://api.iconify.design/material-symbols/skull-outline.svg?color=white&width=70&height=70',
            },
            {
                name: 'Run away',
                icon: 'https://api.iconify.design/fluent/run-24-regular.svg?color=white&width=70&height=70',
            },
            {
                name: 'Use steel arms!',
                icon: 'https://api.iconify.design/ph/knife.svg?color=white&width=70&height=70',
            },
            {
                name: 'Use firearms!',
                icon: 'https://api.iconify.design/covid/vaccine-protection-infrared-thermometer-gun.svg?color=white&width=70&height=70',
            }
        ];
        if(generateActionBtn.classList.contains('disabled')){
            return
        } else {
            generateActionBtn.classList.add('disabled');
            const randomAction = actions[Math.floor(Math.random() * actions.length)]; 
            displayResult(randomAction.name, randomAction.icon);
            enableButton('#generateAction', 2000)
        }
    }

    function enableButton(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).classList.remove('disabled');
          }, time);
    }

    function displayResult(message, iconUrl) {
        const numberOfSteps = Math.floor(Math.random() * 4) + 1;
        resultWindow.classList.remove('hidden');
        message == 'Run away' ? resultText.textContent = `${message}! [${numberOfSteps}]` : resultText.textContent = `${message}`;
        resultIcon.src = iconUrl;
    }
});
