export class Food {
    constructor(game, x, y) {
        this.game = game
        this.h = 20
        this.w = this.h
        this.x = x
        this.y = y
    }

    update() {
        return        
    }

    draw() {
        this.game.ctx.fillStyle = 'green'
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}
