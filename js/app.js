/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = null;

document.getElementById('btn__reset').addEventListener('click', function(){
    if(!game){
       game = new Game();
    }
    game.startGame();
});

let keys = Array.from(document.getElementsByClassName('key'));
for(let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', (e) => {
        game.handleInteraction(e);
    });
};

document.addEventListener('keyup', (e) => game.handleInteraction(e));