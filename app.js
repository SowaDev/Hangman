import Draw from './draw.js'
const words = ['marine', 'butterfly', 'house', 'animal', 'bridge', 'car']
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
// document.getElementById('welcomeText').innerText = wordToGuess
var badGuesses = 0
var againButton;

fetch('words.txt')
    .then(response => response.text())
    .then(text => console.log(text))


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
}

const createPlayAgainButton = () => {
    againButton = document.createElement('button')
    againButton.className = 'again'
    againButton.innerText = 'Play Again?'
    const middle = document.querySelector('.middle')
    middle.appendChild(againButton)
    againButton.style.visibility = 'hidden'
    //againButton.addEventListener('click', play)
}

const canvas = document.querySelector('.letters')
canvas.width = 800;
canvas.height = 150;
const ctx = canvas.getContext("2d")

const canvasHanger = document.querySelector('.hanger')
canvasHanger.width = 500;
canvasHanger.height = 500;
const context = canvasHanger.getContext("2d")


const draw = new Draw(context, ctx, wordToGuess)

let length = draw.drawUnderscores(wordToGuess)
createButtons()
createPlayAgainButton()
const moveToMiddle = (canvas, length) => {
    let move = 850 - length
    canvas.style.paddingLeft = `${move}px`
}

moveToMiddle(canvas, length)

const handleClick = (letter, button) => {
    if(badGuesses < 7){
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
    console.log(letter)
    if(wordToGuess.toUpperCase().includes(letter)){
        let indices = findIndices(letter)
        draw.drawLetter(letter, indices)
    } else {
        badGuesses++
        handleBadGuess(badGuesses);
    }
}

const handleBadGuess = badGuesses => {
    if(badGuesses === 1)
        draw.drawHanger();
    else
        draw.drawHangman(badGuesses)
    if(badGuesses === 7)
        handleGameLost()
}

const handleGameLost = () => {
    againButton.style.visibility = 'visible'
}