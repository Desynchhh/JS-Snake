export class Food {
    constructor(game) {
        this.game = game
        this.h = 20
        this.w = this.h
        this.x = randomNumber(0, this.game.width - this.w, this.h)
        this.y = randomNumber(0, this.game.height - this.h, this.h)
    }

    update(snake) {
        if(this.x == snake.x && this.y == snake.y) {
            if(randomNumber(0,1) < 1) {
                this.y == randomNumber(0, this.game.height - this.h, this.h)
            } else {
                this.x = randomNumber(0, this.game.width - this.w, this.h)
            }
        }
    }

    draw() {
        this.game.ctx.fillStyle = 'green'
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

const randomNumber = (min, max, divideBy=null) => {
    let randNum = Math.floor(Math.random() * (max - min + 1)) + min
    if(divideBy <= 0) return randNum
    
    const remainder = randNum % divideBy
    if(remainder === 0) return randNum
    return randNum - remainder
}