
//Array dos números sorteados
let drawnNumbers = [];

//Número máximo que pode ser sorteado
let maximumNumber = 100;

//Gera o número secreto
let secretNumber = randomNumber();

//Contador de tentativas
let attempts = 1;

//Exibe o texto
function showTextOnTheScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
  }


  // Mensagem inicial do jogo
function showInitialMessage() {
    showTextOnTheScreen('h1', 'Jogo do número secreto');
    showTextOnTheScreen('p', `Escolha um número de 1 a ${maximumNumber}`);
}

showInitialMessage();


//Função para o palpite e validação
function checkGuess() {

    let guess = parseInt(document.querySelector('input').value.trim());

    if (isNaN(guess) ||guess < 1 || guess > maximumNumber){
        showTextOnTheScreen('p', 'Digite um número válido.');
        return;
    }

//Verifica se o palpite está correto
    if (guess == secretNumber) {
        showTextOnTheScreen('h1', 'Acertou!');
        let wordAttempts = attempts > 1 ? 'tentativas' : 'tentativa';
        let messageAttempts = `Você descobriu o número secreto com ${attempts} ${wordAttempts}!`;
        showTextOnTheScreen('p', messageAttempts);

        //Habilita botão de Novo Jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
           showTextOnTheScreen('p', 'O número secreto é menor.');
        } else {
            showTextOnTheScreen('p', 'O número secreto é maior.');
        }

        //Incrementa o contador de tentativas
        attempts++;

        //Chama a função que limpa o campo de entrada
        clearInput();
    }
}


//Função para gerar número que não foi gerado antes
function randomNumber() {
    let chosenNumber = parseInt(Math.random() * maximumNumber + 1);
    let numbersOfElementsDrawn = drawnNumbers.length;


//Limpa o histórico depois de sortear todos os números
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

//Função que limpa o campo de entrada
function clearInput() {
   let guess = document.querySelector('input');
    guess.value = '';
}

//Função para reiniciar o jogo
function restartGame() {
    secretNumber = randomNumber();
    clearInput();
    attempts = 1;
    showInitialMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}