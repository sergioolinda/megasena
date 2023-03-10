var state= {board:[], currentGame:[], savedGame:[] };

function start (){
    readLocalStorage();
   createBoard();
   newGame();

}

function readLocalStorage(){
    if(!window.localStorage){
        return;
    }
    var saveGamesFromLocalStorage = window.localStorage.getItem('saved-games');

    if (saveGamesFromLocalStorage){
        state.savedGame = JSON.parse(saveGamesFromLocalStorage);
    }
}

function writeToLocalStorage(){
    window.localStorage.setItem('saved-games', JSON.stringify(state.savedGame));

}

function createBoard(){
    state.board = [];

    for(var i = 1; i <= 60; i++){
        state.board.push(i);
    }

}

function newGame(){
    resetGame();
    render();
}

function render(){
    renderBoard();
    renderButtons();
    renderSavedGames();
}

function renderBoard(){
    var divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';

    var ulNumbers = document.createElement('ul'); 
    ulNumbers.classList.add('numbers');

    for(var i = 0; i < state.board.length; i++){
        var currentNumber = state.board[i];

        var liNumber = document.createElement('li');
        liNumber.textContent= currentNumber;
        liNumber.classList.add('number');

        liNumber.addEventListener('click',handleNumberClick);

        if(isNumberInGame(currentNumber)){
            liNumber.classList.add('selected-number');
        }

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);

}

function handleNumberClick(event){
    var value = Number(event.currentTarget.textContent); 

    if (isNumberInGame(value)){
        removeNumberFromGame(value);
     }else{
         addNumberToGame(value);
     }
     render();
}

function renderButtons(){
   var divButtons = document.querySelector('#megasena-buttons'); 
   divButtons.innerHTML = '';

   var buttonNewGame = createNewGameButton();
   var buttonRandomGame = createRandomGameButton();
   var buttonSaveGame = createSaveGameButton();
    
   divButtons.appendChild(buttonNewGame);
   divButtons.appendChild(buttonRandomGame);
   divButtons.appendChild(buttonSaveGame);
   
}

function createRandomGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Jogo aleat??rio';

    button.addEventListener('click', randomGame);

    return button;
}

function createNewGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Novo jogo';

    button.addEventListener('click', newGame);

    return button;
}    

function createSaveGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Salvar jogo';
    button.disabled = !isgameComplete();

    button.addEventListener('click', saveGame);

    return button;
}

function renderSavedGames(){
    var divSavedGames = document.querySelector('#megasena-saved-games');
    divSavedGames.innerHTML = '';
    
    if(state.savedGame.length === 0){
        divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>'
    }else{
        var ulSavedGames = document.createElement('ul');
    }

    for (var i = 0; i < state.savedGame.length; i++){
        var ulSavedGames = ulSavedGames || document.createElement('ul');

        var currentGame = state.savedGame[i];

        var liGame = document.createElement('li');
        liGame.textContent = currentGame.join(', ');

        ulSavedGames.appendChild(liGame);
    }

        divSavedGames.appendChild(ulSavedGames);
}

function addNumberToGame(numberToAdd){
    if (numberToAdd < 1||numberToAdd > 60 ){
        console.error('N??mero Inv??lido', numberToAdd);
        return;
    }
    if (state.currentGame.length >= 6){
        console.error('O jogo j?? est?? completo');
        return;
    }
    if(isNumberInGame(numberToAdd)){
        console.error('Este n??mero j?? est?? no jogo.',numberToAdd);
        return;
    }

    state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove){
    if (numberToRemove < 1||numberToRemove > 60 ){
        console.error('N??mero Inv??lido', numberToRemove);
        return;
    }

    var newGame = []

    for (var i = 0; i < state.currentGame.length; i++){
        var currentNumber= state.currentGame[1]

        if (currentNumber === numberToRemove) {
            continue;
        }           
        newGame.push(currentNumber);
    }
    state.currentGame = newGame;
}

function isNumberInGame(numberToCheck){
   // if (state.currentGame.includes(numberToCheck)){
     //   return true;
    //}

    return state.currentGame.includes(numberToCheck);
}

function saveGame(){
    if(!isgameComplete()){
        console.error('O jogo n??o est?? completo!');
        return;
    }
    state.savedGame.push(state.currentGame);
    writeToLocalStorage();
    newGame();
}

function isgameComplete(){
    return state.currentGame.length === 6;
}

function resetGame(){
    state.currentGame = [];
}

function randomGame(){
    resetGame();

    while(!isgameComplete()){
        var randomNumber = Math.ceil(Math.random () * 60);
        addNumberToGame(randomNumber);

    }
    render();

}

start();