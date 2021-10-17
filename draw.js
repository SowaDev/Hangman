class Draw {
    constructor(context, ctx, wordToGuess){
        this._context = context
        this._ctx = ctx
        this._wordToGuess = wordToGuess
        this.drawXCoordinates = []
    }
    set context (context) {
        this._context = context
    }

    get context () {
        return this._context
    }

    get ctx () {
        return this._ctx
    }

    get wordToGuess () {
        return this._wordToGuess
    }

    drawUnderscores(word){
        /** @type {HTMLCanvasElement} */
        const lineLength = 45;
        let beggining = 0;
        for(let i = 0; i < word.length; i++){
            let space = Math.floor(Math.random()*10 + 20)
            beggining = this.drawAUnderscore(beggining, lineLength, space)
        } 
        return beggining
    }

    drawAUnderscore(beggining, lineLength, space){
        /** @type {HTMLCanvasElement} */
        this.drawXCoordinates.push(beggining)
        this.ctx.lineWidth = Math.floor(Math.random()*2 + 4)
        let heightA = Math.floor(Math.random()*6) + 100
        let heightB = Math.floor(Math.random()*6) + 100
        this.ctx.strokeStyle = '#e0dbd1'
        this.ctx.beginPath();
        this.ctx.moveTo(beggining, heightA)
        beggining += lineLength
        this.ctx.lineTo(beggining, heightB)
        this.ctx.stroke()
        this.ctx.closePath;
        beggining += space
        return beggining
    }

    drawLetter (letter, indices) {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = '#e0dbd1'
        for(let i = 0; i < indices.length; i++){
            console.log(this.drawXCoordinates[indices[i]])
            this.ctx.font = "50px Comic Sans MS"
            this.ctx.fillStyle = '#e0dbd1'
            this.ctx.fillText(letter, this.drawXCoordinates[indices[i]],90)
        }
    }

    drawHangman (badGuesses) {
        this.context.strokeStyle = '#e0dbd1'
        this.context.lineWidth = 3
        switch (badGuesses) {
            //DRAW HEAD
            case 2:
                this.context.moveTo(300, 100)
                this.context.beginPath()
                this.context.arc(300, 150, 50, 0, 2*Math.PI, true)
                this.context.stroke();
                break;
            case 3:
                //Draw corpse
                this.drawALine(300, 200, 300, 350)
                break;
            case 4:
                //Draw right arm
                this.drawALine(300, 275, 375, 200)
                break;
            case 5:
                //Draw left arm
                this.drawALine(300, 275, 225, 200)
                break;
            case 6:
                //Draw right leg
                this.drawALine(300, 350, 350, 425)
                break;
            case 7:
                //Draw left leg
                this.drawALine(300, 350, 250, 425)
                break;
        }
    }

    drawALine (x1, y1, x2, y2) {
        this.context.moveTo(x1, y1)
        this.context.lineTo(x2, y2)
        this.context.stroke()
    }

    drawHanger () {
        /** @type {HTMLCanvasElement} */
        this.context.strokeStyle = '#e0dbd1'
        this.context.lineWidth = 5
        this.context.beginPath();
        this.drawALine(50, 490, 150, 490)
        this.drawALine(100, 490, 100, 50)
        this.context.lineTo(300, 50)
        this.context.lineTo(300, 100)
        this.context.stroke()
        this.context.closePath();
}
}

export default Draw;