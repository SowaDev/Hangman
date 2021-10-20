import Draw from './draw.js'
const words = ['marine', 'butterfly', 'house', 'animal', 'bridge', 'car', 'leaf', 'spider', 'bird', 'whale', 'keyboard']
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
var againButton = document.querySelector('.again')
var winLoseButton = document.querySelector('.winLose')
var goodGuesses = 0
var badGuesses = 0
var draw = new Draw(wordToGuess)

const createButtons = () => {
    for(let i = 0; i < alphabet.length; i++){
        const firstRow = document.querySelector('.firstRow')
        const secondRow = document.querySelector('.secondRow')
        var letter = document.createElement("BUTTON")
        letter.setAttribute('letterId', alphabet[i])
        letter.innerText = alphabet[i]
        letter.className='letterClass'
        letter.addEventListener("click", function(){
            handleClick(alphabet[i], this)
        })
        if(i < 13)
            firstRow.appendChild(letter)
        else
            secondRow.appendChild(letter)
    }
    againButton.addEventListener('click', playAgain)
}

const playAgain = () => {
    draw.clearContext();
    againButton.style.visibility = 'hidden'
    winLoseButton.style.visibility = 'hidden'
    wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
    draw.wordToGuess = wordToGuess
    draw.drawUnderscores()
    goodGuesses = 0
    badGuesses = 0
    let letters = document.getElementsByClassName('letterClass')
    for(let letter of letters){
        letter.style.visibility = 'visible'
    }
}

draw.drawUnderscores()
createButtons()

const handleClick = (letter, button) => {
    if(badGuesses < 7 && goodGuesses < wordToGuess.length){
        check(letter)
        button.style.visibility = 'hidden'
    }
}

const findIndices = letter => {
    let indices = []
    let index = wordToGuess.indexOf(letter)
    while(index != -1){
        indices.push(index)
        index = wordToGuess.indexOf(letter, index + 1)
    }
    return indices
}

const check = letter => {
    if(wordToGuess.toUpperCase().includes(letter)){
        handleGoodGuess(letter)
    } else {
        badGuesses++
        handleBadGuess(badGuesses);
    }
}

const handleGoodGuess = letter => {
    let indices = findIndices(letter)
    draw.drawLetter(letter, indices)
    goodGuesses += indices.length
    if(goodGuesses === wordToGuess.length){
        document.querySelector('.again').style.visibility = 'visible'
        winLoseButton.innerText = "You win"
        winLoseButton.style.visibility = 'visible'
    }
}

const handleBadGuess = badGuesses => {
    if(badGuesses === 1)
        draw.drawHanger();
    else
        draw.drawHangman(badGuesses)
    if(badGuesses === 7)
        handleLose()
}

const handleLose = () => {
    document.querySelector('.again').style.visibility = 'visible'
    for(let letter of wordToGuess){
        let indices = findIndices(letter)
        draw.drawLetter(letter, indices)
    }
    winLoseButton.innerText = "You Lose"
    winLoseButton.style.visibility = 'visible'
}