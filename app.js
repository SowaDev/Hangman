const words = ['marine', 'butterfly', 'house', 'animal', 'bridge', 'car']
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
document.getElementById('welcomeText').innerText = wordToGuess
const firstRow = document.querySelector('.firstRow')
const secondRow = document.querySelector('.secondRow')
var drawXCoordinates = [0]

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


const drawUnderscores = word => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector('.underscores')
    canvas.width = 800;
    const ctx = canvas.getContext("2d")
    const lineLength = 45;
    let beggining = 0;
    for(let i = 0; i < word.length; i++){
        let space = Math.floor(Math.random()*10 + 20)
        beggining = drawALine(ctx, beggining, lineLength, space)
    } 
    moveToMiddle(canvas, beggining)
}

const drawALine = (ctx, beggining, lineLength, space) => {
    /** @type {HTMLCanvasElement} */
    drawXCoordinates.push(beggining)
    ctx.lineWidth = Math.floor(Math.random()*2 + 4)
    let heightA = Math.floor(Math.random()*6)
    let heightB = Math.floor(Math.random()*6)
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
        drawHangman();
    }
}

const drawLetter = letter => {
    const canvas = document.querySelector('.letters')
    canvas.width = 800;
    const ctx = canvas.getContext("2d")
    var indices = findIndices(letter)
    ctx.font = "30px Arial";
    ctx.fillStyle = '#e0dbd1'
    ctx.fillText("Hello World", 10, 50);
    // for(let i = 0; i < indices.length; i++){
    //     console.log(drawXCoordinates[indices[i]])
    //     ctx.font = "30px Comic Sans MS"
    //     ctx.fillStyle = '#e0dbd1'
    //     ctx.strokeText(letter, drawXCoordinates[indices[i]],0)
    // }
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

const drawHangman = () => {

}

console.log(wordToGuess.includes('a'))


createButtons()
drawUnderscores(wordToGuess)