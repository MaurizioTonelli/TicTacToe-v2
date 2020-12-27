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

    }
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
    }
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
    }
    let gameOver = function(){
        if(hasFullVertical()
        || hasFullHorizontal()
        || hasFullDiagonal()){
            return true;
        }
        return false;
    };
    let resetGame = function(){
        gameIsOver = false;
        currentTurn = 'X';
        Gameboard.cleanBoard();
        DisplayController.hideGameOverSign();
    }
    let isDraw = function(){
        if(gameOver()) {
            return false;
        }
        for(key in Gameboard.squareValues()){
            if(Gameboard.squareValues()[key].value == ''){
                return false;
            }
        }
        console.log("draw");
        return true;
    }
    return{
        attemptMove: function(square){
            isDraw();
            if(square.textContent == "" && !gameIsOver){
                DisplayController.writeSymbol(square, currentTurn);
                if(gameOver() || isDraw()){
                    let message = currentTurn;
                    if(isDraw()){
                        message = "Draw";
                    }
                    DisplayController.showGameOverSign(message);
                    currentTurn = 'X';
                    gameIsOver = true;
                }
                currentTurn = (currentTurn == 'O')? 'X': 'O';
            }   
        }
    }
})();


document.querySelector('#edit-player1').addEventListener('click',(e)=>{
    //CHANGE PLAYER1 NAME
});
document.querySelector('#edit-player2').addEventListener('click',(e)=>{
    //CHANGE PLAYER2 NAME
});
