/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase{
    constructor(phrase, hint=""){
        this.phrase = phrase;
        this.hint = hint;
        this.phraseList = this.grabPhraseList();
    }
    
    grabPhraseList(){
        var p = document.getElementById('phrase').getElementsByTagName('ul')[0];
        return p;
    }
    
    addPhraseToDisplay(board){
        //make sure this <ul> is empty, for the next set of game tiles
        while (this.phraseList.firstChild) {
            this.phraseList.removeChild(this.phraseList.firstChild);
        }
        //split phrase into array of characters
        let chars = this.phrase.split('');
        //create <li> tags for each letter, adding the appropriate classes
        chars.forEach(letter => {
            let li = document.createElement('LI');
            //display letters in uppercase, for better readability
            //however, make sure any letter classes in the LI tags are lowercase
            let txt = document.createTextNode(`${letter.toUpperCase()}`);
            li.appendChild(txt);
            if(letter == ' '){
                li.className = `space`;
            }else{
                li.className = `hide letter ${letter.toLowerCase()}`;
            }
            //add child to <ul>
            this.phraseList.appendChild(li);
        });
    }
    
    checkLetter(letter){
        //checks the lowercase version of the phrase, so it's not case-sensitive
        return (this.phrase.toLowerCase().includes(letter));
    }
    
    showMatchedLetter(letter){
        let matches = Array.from(this.phraseList.getElementsByClassName(letter));
        matches.forEach(match => match.className = `show letter ${letter}`);
    }
    
}