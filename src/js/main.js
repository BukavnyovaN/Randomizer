document.addEventListener('DOMContentLoaded', function () {
    const resultWindow = document.querySelector('.result');
    const resultText = document.getElementById('resultText');
    const resultIcon = document.getElementById('resultIcon');
    const generateNumberBtn = document.getElementById('generateNumber');
    const generateActionBtn = document.getElementById('generateAction');
    const createRoomBtn = document.getElementById('createRoom');
    const enterRoomForm = document.getElementById('form');
    const mainApp = document.getElementById('mainApp');
    const login = document.getElementById('login');
    const roomNumberTemplate = document.getElementById('roomNumber');
    const closeButton = document.querySelector('.btn-close');
    let roomNumber;


    generateNumberBtn.addEventListener('click', generateRandomNumber);
    generateActionBtn.addEventListener('click', generateRandomAction);
    createRoomBtn.addEventListener('click', getRoom);
    enterRoomForm.addEventListener('submit', enterRoom);
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

    

    function enterRoom(event){
         event.preventDefault();
         let msg = document.getElementById("input").value;
        console.log(msg);

    }

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
