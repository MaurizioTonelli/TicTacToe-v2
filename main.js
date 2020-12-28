let playerProto = {};
let player = function(name, score, piece){
    let player = Object.create(playerProto);
    player.name = name;
    player.score = score;
    player.piece = piece;
    return player;
}

let player1 = player('player1', 0, 'O');
let player2 = player('player2', 0, 'X');

let DisplayController = (function(){
    let gameMessageBox = document.querySelector('.game-message-box');
    return{
        writeSymbol: function(elem, text){
            elem.textContent = text;
        },
        showGameOverSign: function(message){
            let gameOverMessage = document.querySelector('#game-over-message');
            gameMessageBox.style.display = 'block';
            gameOverMessage.textContent = message;

        },
        hideGameOverSign: function(){
            gameMessageBox.style.display = 'none';
        },
        drawScores: function(){
            let player1Score = document.querySelector('#player1-score');
            let player2Score = document.querySelector('#player2-score');
            player1Score.textContent = player1.score;
            player2Score.textContent = player2.score;
        }
    }
})();

let Gameboard = (function(){
    let squares = document.querySelectorAll('.game-board div');

    squares.forEach(div=>{
        div.addEventListener('click', square=>{
            Game.attemptMove(div);
        });
    });
    let cleanBoard = function(){
        squares.forEach(square => square.textContent = '');
    }
    let squareValues = function(){
        return {
            'a1': {value : document.querySelector('#a1').textContent},
            'b1': {value : document.querySelector('#b1').textContent},
            'c1': {value : document.querySelector('#c1').textContent},
            'a2': {value : document.querySelector('#a2').textContent},
            'b2': {value : document.querySelector('#b2').textContent},
            'c2': {value : document.querySelector('#c2').textContent},
            'a3': {value : document.querySelector('#a3').textContent},
            'b3': {value : document.querySelector('#b3').textContent},
            'c3': {value : document.querySelector('#c3').textContent},
        };
    };
    
    return {squareValues, cleanBoard};
})();

let Game = (function(){
    let currentTurn = 'X';
    let gameIsOver = false;
    let playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', e=>{resetGame()});
    let hasFullVertical= function(){
        if((Gameboard.squareValues().a1.value !== '' 
            && Gameboard.squareValues().a1.value === Gameboard.squareValues().a2.value 
            && Gameboard.squareValues().a1.value === Gameboard.squareValues().a3.value) 
                || 
            ( Gameboard.squareValues().b1.value !== '' 
            && Gameboard.squareValues().b1.value === Gameboard.squareValues().b2.value 
            && Gameboard.squareValues().b1.value === Gameboard.squareValues().b3.value)
                || 
            (Gameboard.squareValues().c1.value !== '' 
            && Gameboard.squareValues().c1.value === Gameboard.squareValues().c2.value 
            && Gameboard.squareValues().c1.value === Gameboard.squareValues().c3.value) ){
            return true;
        }
        return false;

    };
    let hasFullHorizontal = function(){
        if((Gameboard.squareValues().a1.value !== '' 
            && Gameboard.squareValues().a1.value === Gameboard.squareValues().b1.value 
            && Gameboard.squareValues().a1.value === Gameboard.squareValues().c1.value) 
            || 
            (Gameboard.squareValues().a2.value !== '' 
            && Gameboard.squareValues().a2.value === Gameboard.squareValues().b2.value 
            && Gameboard.squareValues().a2.value === Gameboard.squareValues().c2.value)
            || 
            (Gameboard.squareValues().a3.value !== '' 
            && Gameboard.squareValues().a3.value === Gameboard.squareValues().b3.value 
            && Gameboard.squareValues().a3.value === Gameboard.squareValues().c3.value) ){
                return true;
            }
        return false;
    };
    let hasFullDiagonal = function(){
        if((Gameboard.squareValues().a1.value !== '' 
            && Gameboard.squareValues().a1.value === Gameboard.squareValues().b2.value 
            && Gameboard.squareValues().a1.value === Gameboard.squareValues().c3.value) 
            || 
            (Gameboard.squareValues().c1.value !== '' 
            && Gameboard.squareValues().c1.value === Gameboard.squareValues().b2.value 
            && Gameboard.squareValues().c1.value === Gameboard.squareValues().a3.value)){
                return true;
            }
        return false;
    };
    let gameOver = function(){
        if(hasFullVertical()
        || hasFullHorizontal()
        || hasFullDiagonal()){
            return true;
        }
        return false;
    };
    let updateScores = function(){
        if(currentTurn == 'X'){
            player1.score++;
        }
        if(currentTurn == 'O'){
            player2.score++;
        }
        DisplayController.drawScores();
    };

    let resetGame = function(){
        gameIsOver = false;
        currentTurn = 'X';
        Gameboard.cleanBoard();
        DisplayController.hideGameOverSign();
    };
    let isDraw = function(){
        if(gameOver()) {
            return false;
        }
        for(key in Gameboard.squareValues()){
            if(Gameboard.squareValues()[key].value == ''){
                return false;
            }
        }
        return true;
    };
    let getRoundMessage = function(){
        let message = currentTurn;
        if(isDraw()){
            message = "Draw";
        }
        if(message == 'X'){
            message = `${player1.name} Wins!`;
        }
        if(message == 'O'){
            message = `${player2.name} Wins!`;
        }
        return message;
    }
    return{
        attemptMove: function(square){
            if(square.textContent == "" && !gameIsOver){
                DisplayController.writeSymbol(square, currentTurn);
                if(gameOver() || isDraw()){
                    let message = getRoundMessage();
                    DisplayController.showGameOverSign(message);
                    updateScores();
                    currentTurn = 'X';
                    gameIsOver = true;
                }
                currentTurn = (currentTurn == 'O')? 'X': 'O';
            }   
        }
    };
})();


document.querySelector('#edit-player1').addEventListener('click',(e)=>{
    let playerDiv = document.querySelector('.player1');
    let playerPara = document.querySelector('.player1-name');
    let playerInput = document.createElement('input');
    playerInput.classList.add('score-input');
    playerInput.addEventListener('keyup', e=>{
        if(e.key == 'Enter'){
            playerPara.textContent = playerInput.value;
            player1.name = playerInput.value;
            playerDiv.appendChild(playerPara);
            playerDiv.removeChild(playerInput);
        }
    });
    playerDiv.appendChild(playerInput);
    playerDiv.removeChild(playerPara);

    player1.name = playerPara.textContent;
});

document.querySelector('#edit-player2').addEventListener('click',(e)=>{
    let playerDiv = document.querySelector('.player2');
    let playerPara = document.querySelector('.player2-name');
    let playerInput = document.createElement('input');
    playerInput.classList.add('score-input');
    playerInput.addEventListener('keyup', e=>{
        if(e.key == 'Enter'){
            playerPara.textContent = playerInput.value;
            player2.name = playerInput.value;
            playerDiv.insertAdjacentElement('afterbegin',playerPara);
            playerDiv.removeChild(playerInput);
        }
    });
    playerDiv.insertAdjacentElement('afterbegin',playerInput);
    playerDiv.removeChild(playerPara);

    player2.name = playerPara.textContent;
});

document.querySelector('#reset-score').addEventListener('click', (e)=>{
    player1.score = 0;
    player2.score = 0;
    DisplayController.drawScores();
});