/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.board = new Board();
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.hints = this.createHints();
        this.keys = this.grabKeyList();
        this.activePhrase = null;
        this.activePhraseHint = null;
        this.hearts = [];
        this.timer = this.createTimer();
        this.interval = null;
        document.addEventListener('keyup', (e) => this.handleInteraction(e));
    }
    
    init(){
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
        console.log("active phrase is now: "+this.activePhrase.phrase);
        this.startTimer(60);
    }
    /**
    *Creates phrase for use in the game
    *@return {array} An array of phrases that could be used
    */
    createPhrases(){
        let phrases = [
            "Yippee Ki Yay",
            "Do you feel lucky punk",
            "Your move creep",
            "Ill be back",
            "Im too old for this"
        ]
        let lowercasePhrases = phrases.map((item) => {
            return item.toLowerCase();
        });
        return lowercasePhrases;
    }
    
    createHints(){
        let hints = [
            "HINT: Die Hard Movie Quote",
            "HINT: Dirty Harry Movie Quote",
            "HINT: Robocop Movie Quote",
            "HINT: Terminator Movie Quote",
            "HINT: Lethal Weapon Movie Quote"
        ]
        return hints; 
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
                console.log("stop tick");
                self.gameOver("lose","OUT OF TIME!");
            }
            let perc = (count/seconds)*100;
            console.log(`tick - ${count}/${seconds} - ${perc} ${(perc > 50)}`);
            if(perc > 50){
                console.log("***"+self.activePhraseHint);
                document.getElementById('hintDisplay').textContent = self.activePhraseHint;
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
        for(let i = 0; i < keys.length; i++){
            keys[i].addEventListener('click', (e) => {
                game.handleInteraction(e);
            });
        };
        return keys;
    }
    
    getRandomPhrase(){
        let rand = Math.ceil(Math.random()*this.phrases.length-1);
        this.activePhraseHint = this.hints[rand];
        console.log("HINT: " + this.activePhraseHint);
        return new Phrase(this.phrases[rand]);
    }
    
    handleInteraction(event){
        let keyElement = null;
        if(event.key){
            console.log(`KEY: ${event.code}`);
            if(event.code.includes('Key')){
                console.log("Yes, it's a letter");
                keyElement = this.keys.find(element => element.innerHTML === event.key);
            }else{
                return;
            }
            
        }else{
            keyElement = event.target;
        }
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
        this.hearts[this.missed].src = "/images/lostHeart.png";
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