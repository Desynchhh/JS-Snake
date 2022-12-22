export class Food {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.h = this.game.unit
        this.w = this.game.unit
    }

    update() {
        return        
    }

    draw() {
        this.game.ctx.fillStyle = 'green'
        this.game.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}
