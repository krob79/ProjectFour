/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Board{
    constructor(){
        this.keyList = this.grabKeyList();
        this.scoreBoard = this.grabScoreBoard();
    }
    
    grabKeyList(){
        var k = document.getElementById('qwerty');
        return k;
    }
    
    grabScoreBoard(){
        var s = document.getElementById('scoreboard');
        return s;
        
    }
    
    
}