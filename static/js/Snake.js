export class Snake {
    directions = {
        'UP': 1,
        'RIGHT': 2,
        'DOWN': -1,
        'LEFT': -2
    }
    constructor(game, x, y) {
        this.game = game
        this.head = {x, y}
        this.h = 20
        this.w = this.h
        this.body = []
        this.timeSinceMove = 0
        this.moveInterval = 100
        this.isAlive = true
        this.stepSize = this.h
        this.direction = this.directions.RIGHT
    }

    #checkHitWall() {
        if (this.head.y < 0) this.isAlive = false
        else if (this.head.x > this.game.width - this.w) this.isAlive = false
        else if (this.head.y > this.game.height - this.h) this.isAlive = false
        else if (this.head.x < 0) this.isAlive = false
    }

    #checkHitSelf() {
        for(let body of this.body) {
            const xAlign = body.x == this.head.x
            const yAlign = body.y == this.head.y
            if(xAlign && yAlign) {
                this.isAlive = false
                return
            }
        }
    }

    move() {
        if(this.direction == this.directions.UP) this.head.y -= this.stepSize
        else if(this.direction == this.directions.RIGHT) this.head.x += this.stepSize
        else if(this.direction == this.directions.DOWN) this.head.y += this.stepSize
        else if(this.direction == this.directions.LEFT) this.head.x -= this.stepSize
    }

    setDirection(keys) {
        if(keys.length > 0) {
            const key = keys[keys.length-1]
            switch(key) {
                case 'ArrowUp':
                case 'w':
                    this.direction = this.directions.UP
                    break;
                case 'ArrowRight':
                case 'd':
                    this.direction = this.directions.RIGHT
                    break;
                case 'ArrowDown':
                case 's':
                    this.direction = this.directions.DOWN
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.direction = this.directions.LEFT
                    break;
                default:
                    break;   
            }
        }
    }

    grow() {
        const x = this.head.x
        const y = this.head.y
        this.body.unshift({ x, y })
    }

    update(dt, keys) {
        this.setDirection(keys)
        this.timeSinceMove = this.timeSinceMove + dt
        if(this.timeSinceMove >= this.moveInterval) {
            const hasBody = this.body.length > 0
            if(hasBody) {
                this.body.push({"x": this.head.x, "y": this.head.y})
                this.body.shift()
            }
            this.move()
            this.#checkHitSelf()
            this.#checkHitWall()
            this.game.checkReset()
            this.timeSinceMove = 0

        }
    }
    
    draw() {
        let fillStyle = '000000'
        this.game.ctx.fillStyle = this.#setFillStyle(fillStyle)
        this.game.ctx.fillRect(this.head.x, this.head.y, this.w, this.h)
        for(const body of this.body) {
            this.game.ctx.fillRect(body.x, body.y, this.w, this.h)
        }
    }

    #setFillStyle(fillStyle) {
        return `#${fillStyle}`
    }
}

const subHexColor = (c1, c2) => {
    var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
  }