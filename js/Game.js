/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.board = new Board();
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.keys = this.grabKeyList();
        this.activePhrase = null;
        this.hearts = [];
        this.timer = this.createTimer();
        this.interval = null;
    }
    
    init(){
        document.getElementById('hintDisplay').textContent = "";
        document.getElementById('hintDisplay').className = '';
        document.getElementById('timerFill').style.backgroundColor = '';
        document.getElementById('timerDisplay').style.color = '';
        //reset classes on keys so they are selectable
        this.keys.forEach(key => key.className = 'key');
        //reset heart display and misses count to 0 
        this.hearts = Array.from(this.board.scoreBoard.getElementsByTagName('img'));
        this.hearts.forEach(heart => heart.src = "/images/liveHeart.png");
        this.missed=0;
    }
    
    startGame(){
        this.init();
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay(this.board);
        document.getElementById('overlay').style.display = 'none';
        this.startTimer(60);
    }
    /**
    *Creates phrase for use in the game
    *@return {array} An array of phrases that could be used
    */
    createPhrases(){
        /*Changes
        -Make Phrases array objects instead of strings
        -Change where the toLowerCase method is used to match letters
        -Change code where hint is displayed
        */
        let phrases = [
            new Phrase("Yippee Ki Yay", "Die Hard Movie"),
            new Phrase("Do you feel lucky punk", "Dirty Harry Movie"),
            new Phrase("Your move creep", "Robocop Movie"),
            new Phrase("Ill be back", "Terminator Movie"),
            new Phrase("Im too old for this", "Lethal Weapon Movie")
        ]
        return phrases;
    }
    
    createTimer(){
        let main = document.getElementById('main-container');
        let qwerty = document.getElementById('qwerty');
        let scoreboard = document.getElementById('scoreboard');
        let div = document.createElement('DIV');
        let numDisplay = document.createElement('DIV');
        let hint = document.createElement('DIV');
        hint.id = "hintDisplay";
        hint.textContent = "";
        numDisplay.id = "timerDisplay"
        div.id = "timerBox";
        let timerBar = document.createElement('DIV');
        timerBar.id = "timerFill";
        div.appendChild(timerBar);
        div.appendChild(numDisplay);
        qwerty.parentNode.insertBefore(hint, qwerty);
        scoreboard.parentNode.insertBefore(div, scoreboard);
        
        return div;
    }
    
    startTimer(seconds){
        let count = 0;
        let self = this;
        this.interval = setInterval(function(){
            count++;
            if(count >= seconds){
                self.gameOver("lose","OUT OF TIME!");
            }
            let perc = (count/seconds)*100;
            if(perc > 50){
                document.getElementById('hintDisplay').textContent = `HINT: ${self.activePhrase.hint}`;
                document.getElementById('timerFill').style.width = `${perc}%`;
            }
            if(perc > 80){
                document.getElementById('hintDisplay').className = 'timerDisplayAlmostOver';
                document.getElementById('timerFill').style.backgroundColor = 'red';
                document.getElementById('timerDisplay').style.color = 'red';
            }
            document.getElementById('timerFill').style.width = `${perc}%`;
            document.getElementById('timerDisplay').textContent = `${seconds - count}`;
        }, 1000)
    }
    
    stopTimer(){
        clearInterval(this.interval);
    }
    
    grabKeyList(){
        let keys = Array.from(document.getElementsByClassName('key'));
        return keys;
    }
    
    getRandomPhrase(){
        let rand = Math.ceil(Math.random()*this.phrases.length-1);
        console.log(this.phrases[rand].phrase);
        return this.phrases[rand];
    }
    
    handleInteraction(event){
        let keyElement = null;
        //if the event has a 'key' property, it's from the keyup event, so assign keyElement the onscreen key that has the same innerHTML content as the event.key value
        if(event.key){
            if(event.code.includes('Key')){
                keyElement = this.keys.find(element => element.innerHTML === event.key);
            }else{
                return;
            }
        //otherwise, just assign keyElement the target of the event
        }else{
            keyElement = event.target;
        }
        //check if the key's class has already been switched to 'chosen' or 'wrong' from a previous guess
        if(keyElement.className != 'chosen' && keyElement.className != 'wrong'){
            let keyVal = keyElement.innerHTML.toString();
            if(this.activePhrase.checkLetter(keyVal)){
                keyElement.className = 'chosen';
                this.activePhrase.showMatchedLetter(keyVal);
                this.checkForWin();
            }else{
                keyElement.className = 'wrong';
                this.removeLife();
            }
            
        }
    }
    
    removeLife(){
        this.hearts[this.missed].src = "./images/lostHeart.png";
        this.missed++;
        if(this.missed >= this.hearts.length){
           this.gameOver('lose', "Sorry! Better luck next time!");
        }
    }
    
    checkForWin(){
        let self = this;
        let totalLetters = Array.from(this.activePhrase.phraseList.getElementsByClassName('letter'));
        let revealedLetters = Array.from(this.activePhrase.phraseList.getElementsByClassName('show'));
        if(totalLetters.length == revealedLetters.length){
           setTimeout(function(){self.gameOver('win', "Nice Job!")},1500);
        }
    }
    
    gameOver(winOrLoseString, message){
        this.stopTimer();
        console.log("GAME OVER");
        document.getElementById('timerFill').style.width = '1%';
        let overlay = document.getElementById('overlay');
        let msg = document.getElementById('game-over-message');
        msg.innerHTML = message;
        overlay.style.display = 'flex';
        overlay.className = winOrLoseString;
    }
    
}