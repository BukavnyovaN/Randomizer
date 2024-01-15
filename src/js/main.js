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
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        displayResult(randomNumber, 'https://api.iconify.design/mdi/crystal-ball.svg?color=white&width=70&height=70');
    }

    function generateRandomAction() {
        const actions = [
            {
                name: 'Oops...you were bitten!',
                icon: 'https://api.iconify.design/material-symbols/skull-outline.svg?color=white&width=70&height=70',
            },
            {
                name: 'Run away!',
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
        const randomAction = actions[Math.floor(Math.random() * actions.length)]; 
        displayResult(randomAction.name, randomAction.icon);
    }

    function displayResult(message, iconUrl) {
        resultWindow.classList.remove('hidden');
        resultText.textContent = `${message}`;
        resultIcon.src = iconUrl;
    }
});
