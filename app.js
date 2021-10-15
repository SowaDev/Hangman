const words = ['marine', 'butterfly', 'house', 'animal', 'bridge', 'car']
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
// document.getElementById('welcomeText').innerText = wordToGuess
const firstRow = document.querySelector('.firstRow')
const secondRow = document.querySelector('.secondRow')
var drawXCoordinates = []
var badGuesses = 0

const createButtons = () => {
    for(let i = 0; i < alphabet.length; i++){
        var letter = document.createElement("BUTTON")
        letter.setAttribute('letterId', alphabet[i])
        letter.innerText = alphabet[i]
        letter.className='letterClass'
        letter.addEventListener("click", function(){
            check(alphabet[i])
            this.style.visibility = 'hidden'
        })
        if(i < 13)
            firstRow.appendChild(letter)
        else
            secondRow.appendChild(letter)
    }
}

const canvas = document.querySelector('.letters')
canvas.width = 800;
canvas.height = 150;
const ctx = canvas.getContext("2d")

const drawUnderscores = word => {
    /** @type {HTMLCanvasElement} */
    const lineLength = 45;
    let beggining = 0;
    for(let i = 0; i < word.length; i++){
        let space = Math.floor(Math.random()*10 + 20)
        beggining = drawAUnderscore(beggining, lineLength, space)
    } 
    moveToMiddle(canvas, beggining)
}

const drawAUnderscore = (beggining, lineLength, space) => {
    /** @type {HTMLCanvasElement} */
    drawXCoordinates.push(beggining)
    ctx.lineWidth = Math.floor(Math.random()*2 + 4)
    let heightA = Math.floor(Math.random()*6) + 100
    let heightB = Math.floor(Math.random()*6) + 100
    ctx.strokeStyle = '#e0dbd1'
    ctx.beginPath();
    ctx.moveTo(beggining, heightA)
    beggining += lineLength
    ctx.lineTo(beggining, heightB)
    ctx.stroke()
    ctx.closePath;
    beggining += space
    return beggining
}

const moveToMiddle = (canvas, length) => {
    let move = 850 - length
    canvas.style.paddingLeft = `${move}px`
}

const check = letter => {
    console.log(letter)
    if(wordToGuess.toUpperCase().includes(letter)){
        console.log('includes')
        drawLetter(letter)
    } else {
        console.log("doesn't include")
        badGuesses++
        handleBadGuess(badGuesses);
    }
}

const handleBadGuess = badGuesses => {
    if(badGuesses === 1)
        drawHanger();
    else
        drawHangman(badGuesses)
}

const drawLetter = letter => {
    var indices = findIndices(letter)
    ctx.font = "30px Arial";
    ctx.fillStyle = '#e0dbd1'
    for(let i = 0; i < indices.length; i++){
        console.log(drawXCoordinates[indices[i]])
        ctx.font = "50px Comic Sans MS"
        ctx.fillStyle = '#e0dbd1'
        ctx.fillText(letter, drawXCoordinates[indices[i]],90)
    }
}

const findIndices = letter => {
    let indices = []
    index = wordToGuess.indexOf(letter)
    while(index != -1){
        indices.push(index)
        index = wordToGuess.indexOf(letter, index + 1)
    }
    return indices
}


const canvasHanger = document.querySelector('.hanger')
canvasHanger.width = 500;
canvasHanger.height = 500;
const context = canvasHanger.getContext("2d")

const drawHangman = badGuesses => {
    context.strokeStyle = '#e0dbd1'
    context.lineWidth = 3
    //FIRST MOVE DRAWING HEAD
    switch (badGuesses) {
        //FIRST MOVE DRAWING HEAD
        case 2:
            context.moveTo(300, 100)
            context.beginPath()
            context.arc(300, 150, 50, 0, 2*Math.PI, true)
            context.stroke();
            break;
        case 3:
            //Draw corpse
            drawALine(300, 200, 300, 350)
            break;
        case 4:
            //Draw right arm
            drawALine(300, 275, 375, 200)
            break;
        case 5:
            //Draw left arm
            drawALine(300, 275, 225, 200)
            break;
        case 6:
            //Draw right leg
            drawALine(300, 350, 350, 425)
            break;
        case 7:
            //Draw left leg
            drawALine(300, 350, 250, 425)
            break;
    }
}

const drawALine = (x1, y1, x2, y2) => {
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

const drawHanger = () => {
    /** @type {HTMLCanvasElement} */
    context.strokeStyle = '#e0dbd1'
    context.lineWidth = 5
    context.beginPath();
    drawALine(50, 490, 150, 490)
    drawALine(100, 490, 100, 50)
    context.lineTo(300, 50)
    context.lineTo(300, 100)
    context.stroke()
    context.closePath();
}


createButtons()
drawUnderscores(wordToGuess)
// drawHanger()
// drawHangman()