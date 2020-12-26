let Gameboard = (function(){
    let squares = document.querySelectorAll('.game-board div');
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
})();

let playerProto = {};
let player = function(name, score, piece){
    let player = Object.create(playerProto);
    player.name = name;
    player.score = score;
    player.piece = piece;
    return player;
}

player1 = player('player1', 0, 'O');
player2 = player('player2', 0, 'X');
