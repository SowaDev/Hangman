class Draw {
	constructor(wordToGuess) {
		this._wordToGuess = wordToGuess;
		this.unCanvas = this.createCanvas('.letters', 800, 150);
		this._ctx = this.unCanvas.getContext('2d');
		this.haCanvas = this.createCanvas('.hanger', 500, 500);
		this._context = this.haCanvas.getContext('2d');
		this.drawXCoordinates = [];
	}

	get context() {
		return this._context;
	}

	get ctx() {
		return this._ctx;
	}

	get wordToGuess() {
		return this._wordToGuess;
	}

	set wordToGuess(word) {
		this._wordToGuess = word;
	}

	clearContext() {
		this.ctx.clearRect(0, 0, this.unCanvas.width, this.unCanvas.height);
		this.context.clearRect(0, 0, this.haCanvas.width, this.haCanvas.height);
	}

	createCanvas(query, width, height) {
		const canvas = document.querySelector(query);
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}

	drawUnderscores() {
		const lineLength = 45;
		let beggining = 0;
		for (let i = 0; i < this.wordToGuess.length; i++) {
			let space = Math.floor(Math.random() * 10 + 20);
			beggining = this.drawUnderscore(beggining, lineLength, space);
		}
		this.moveToMiddle(beggining);
	}

	moveToMiddle(length) {
		let move = 850 - length;
		this.unCanvas.style.paddingLeft = `${move}px`;
	}

	drawUnderscore(beggining, lineLength, space) {
		this.drawXCoordinates.push(beggining);
		this.ctx.lineWidth = Math.floor(Math.random() * 2 + 4);
		let heightA = Math.floor(Math.random() * 6) + 100;
		let heightB = Math.floor(Math.random() * 6) + 100;
		this.ctx.strokeStyle = '#e0dbd1';
		this.ctx.beginPath();
		this.ctx.moveTo(beggining, heightA);
		beggining += lineLength;
		this.ctx.lineTo(beggining, heightB);
		this.ctx.stroke();
		this.ctx.closePath;
		beggining += space;
		return beggining;
	}

	drawLetter(letter, indices) {
		this.ctx.font = '30px Arial';
		this.ctx.fillStyle = '#e0dbd1';
		for (let i = 0; i < indices.length; i++) {
			this.ctx.font = '50px Comic Sans MS';
			this.ctx.fillStyle = '#e0dbd1';
			this.ctx.fillText(letter, this.drawXCoordinates[indices[i]] + 5, 90);
		}
	}

	drawHangman(badGuesses) {
		this.context.strokeStyle = '#e0dbd1';
		this.context.lineWidth = 3;
		switch (badGuesses) {
			//DRAW HEAD
			case 2:
				this.context.moveTo(300, 100);
				this.context.beginPath();
				this.context.arc(300, 150, 50, 0, 2 * Math.PI, true);
				this.context.stroke();
				break;
			case 3:
				//Draw corpse
				this.drawLine(300, 200, 300, 350);
				break;
			case 4:
				//Draw right arm
				this.drawLine(300, 275, 375, 200);
				break;
			case 5:
				//Draw left arm
				this.drawLine(300, 275, 225, 200);
				break;
			case 6:
				//Draw right leg
				this.drawLine(300, 350, 350, 425);
				break;
			case 7:
				//Draw left leg
				this.drawLine(300, 350, 250, 425);
				break;
		}
	}

	drawLine(x1, y1, x2, y2) {
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
	}

	drawHanger() {
		this.context.strokeStyle = '#e0dbd1';
		this.context.lineWidth = 5;
		this.context.beginPath();
		this.drawLine(50, 490, 150, 490);
		this.drawLine(100, 490, 100, 50);
		this.context.lineTo(300, 50);
		this.context.lineTo(300, 100);
		this.context.stroke();
		this.context.closePath();
	}
}

export default Draw;
