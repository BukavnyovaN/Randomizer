document.addEventListener('DOMContentLoaded', function () {
    const resultWindow = document.querySelector('.result');
    const resultText = document.getElementById('resultText');
    const resultIcon = document.getElementById('resultIcon');
    const generateNumberBtn = document.getElementById('generateNumber');
    const generateActionBtn = document.getElementById('generateAction');
    const closeButton = document.querySelector('.btn-close');
    let roomNumber;


    generateNumberBtn.addEventListener('click', generateRandomNumber);
    generateActionBtn.addEventListener('click', generateRandomAction);
    closeButton.addEventListener('click', closeCard);

    const actions = [
        {
            name: 'Run away',
            icon: 'https://api.iconify.design/fluent/run-24-regular.svg?color=white&width=70&height=70',
        },
        {
            name: 'Oops...you were bitten!',
            icon: 'https://api.iconify.design/material-symbols/skull-outline.svg?color=white&width=70&height=70',
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

    async function getRoom() {
        const response = await fetch("http://158.160.75.148/room/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        roomNumber = await response.json();
        console.log(roomNumber);
    };
    getRoom();

    async function getRandomNumber() {
        const response = await fetch(`http://158.160.75.148/game/${roomNumber}/run`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        let randomNumber = await response.json();
        return randomNumber;
    };

    async function getRandomAction() {
        const response = await fetch(`http://158.160.75.148/game/${roomNumber}/fight`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        let randomAction = await response.json();
        return randomAction;
    };

    function generateRandomNumber() {
        getRandomNumber()
            .then((data) => {
                console.log(data);
                resultWindow.classList.remove('animation');
                if(generateNumberBtn.classList.contains('disabled')){
                    return
                } else { 
                    generateNumberBtn.classList.add('disabled');
                    displayResult(data.steps, 'https://api.iconify.design/mdi/crystal-ball.svg?color=white&width=70&height=70');
                    enableButton('#generateNumber', 1000)
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    function generateRandomAction() {
        getRandomAction()
        .then((data) => {
            console.log(data);
            resultWindow.classList.remove('animation');
            if(generateActionBtn.classList.contains('disabled')){
                return
            } else {
                generateActionBtn.classList.add('disabled');
                displayResult(actions[data.subtype - 1].name, actions[data.subtype - 1].icon, data.steps);
                enableButton('#generateAction', 1000)
            }
        })

       
    }

    function enableButton(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).classList.remove('disabled');
          }, time);
    }

    function displayResult(message, iconUrl, steps) {
        animation();
        const numberOfSteps = Math.floor(Math.random() * 4) + 1;
        resultWindow.classList.remove('hidden');
        steps ? resultText.textContent = `${message}! [${steps}]` : resultText.textContent = `${message}`;
        resultIcon.src = iconUrl;
    }

    function closeCard() {
        resultWindow.classList.add('hidden');
    };

    function animation() {
        setTimeout(function () {
            resultWindow.classList.add('animation');
          }, 0);
    }
});
