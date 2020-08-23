/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = null;

//console.log(`PHRASEs: ${game.getRandomPhrase().addPhraseToDisplay(game.board)}`);

document.getElementById('btn__reset').addEventListener('click', function(){
    if(!game){
       game = new Game();
    }
    game.startGame();
});

