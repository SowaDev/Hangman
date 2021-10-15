const words = ['marine', 'butterfly', 'house', 'animal', 'bridge', 'car']
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let wordToGuess = words[Math.floor(Math.random() * words.length)]
document.getElementById('welcomeText').innerText = wordToGuess
const firstRow = document.querySelector('.firstRow')
const secondRow = document.querySelector('.secondRow')


const createButtons = () => {
    for(let i = 0; i < alphabet.length; i++){
        var letter = document.createElement("BUTTON")
        letter.setAttribute('letterId', alphabet[i])
        letter.innerText = alphabet[i]
        letter.className='letterClass'
        if(i < 13)
            firstRow.appendChild(letter)
        else
            secondRow.appendChild(letter)
    }
}



const drawUnderscores = word => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector('.underscores')
    //canvas.width = canvas.parentNode.getBoundingClientRect().width;
    canvas.width = document.querySelector('.container').offsetWidth;
    const ctx = canvas.getContext("2d")
    const lineLength = 45;
    let beggining = 0;
    for(let i = 0; i < word.length; i++){
        let space = Math.floor(Math.random()*10 + 20)
        beggining = drawALine(ctx, beggining, lineLength, space)
    }
}

const drawALine = (ctx, beggining, lineLength, space) => {
    /** @type {HTMLCanvasElement} */
    //ctx.lineWidth = Math.floor(Math.random()*2 + 3)
    ctx.lineWidth = 4;
    let heightA = Math.floor(Math.random()*6)
    let heightB = Math.floor(Math.random()*6)
    ctx.strokeStyle = 'white'
    ctx.beginPath();
    ctx.moveTo(beggining, heightA)
    beggining += lineLength
    ctx.lineTo(beggining, heightB)
    ctx.stroke()
    ctx.closePath;
    beggining += space
    return beggining
}

const drawBigLine = () => {
    var canvas = document.querySelector('.bigLine')
    var ctx = canvas.getContext("2d")
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(300, 0)
    ctx.stroke()
}


createButtons()
//drawALine()
drawUnderscores(wordToGuess)
drawBigLine()