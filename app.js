let drawnNumbers = [];
let maximumNumber = 100;
let secretNumber = randomNumber();
let attempts = 1;


function showTextOnTheScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
  }

function showInitialMessage() {
    showTextOnTheScreen('h1', 'Jogo do número secreto');
    showTextOnTheScreen('p', `Escolha um número de 1 a ${maximumNumber}`);
}

showInitialMessage();

function checkGuess() {
    let guess = parseInt(document.querySelector('input').value);

    if (guess == secretNumber) {
        showTextOnTheScreen('h1', 'Acertou!');
        let wordAttempts = attempts > 1 ? 'tentativas' : 'tentativa';
        let messageAttempts = `Você descobriu o número secreto com ${attempts} ${wordAttempts}!`;
        showTextOnTheScreen('p', messageAttempts);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
           showTextOnTheScreen('p', 'O número secreto é menor.');
        } else {
            showTextOnTheScreen('p', 'O número secreto é maior.');
        }
        attempts++;
        clearInput();
    }
}
function randomNumber() {
    let chosenNumber = parseInt(Math.random() * maximumNumber + 1);
    let numbersOfElementsDrawn = drawnNumbers.length;

    if (numbersOfElementsDrawn == maximumNumber){
        drawnNumbers = [];
    }
    if (drawnNumbers.includes(chosenNumber)){
        return randomNumber();
    } else {
        drawnNumbers.push(chosenNumber);
        console.log(drawnNumbers);
        return chosenNumber;
    }
}
function clearInput() {
    guess = document.querySelector('input');
    guess.value = ' ';
}
function restartGame() {
    secretNumber = randomNumber();
    clearInput();
    attempts = 1;
    showInitialMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}