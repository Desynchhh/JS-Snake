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
        this.h = this.game.unit
        this.w = this.game.unit
        this.body = []
        this.timeSinceMove = 0
        this.moveInterval = 100
        this.isAlive = true
        this.stepSize = this.h
        this.lastMovedTowards = this.directions.RIGHT
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
        if(this.direction == this.directions.UP) this.head.y -= this.game.unit
        else if(this.direction == this.directions.RIGHT) this.head.x += this.game.unit
        else if(this.direction == this.directions.DOWN) this.head.y += this.game.unit
        else if(this.direction == this.directions.LEFT) this.head.x -= this.game.unit
    }

    #attemptToSetDirection(key, directionArray, desiredDirection) {
        if(directionArray.includes(key)) {
            const oppositeDirection = this.direction * -1
            if(desiredDirection != oppositeDirection && this.lastMovedTowards == this.direction) {
                this.direction = desiredDirection
                return true
            }
        }
        return false
    }

    setDirection(keys) {
        if(keys.length > 0) {
            const key = keys[keys.length-1]
            const options = [
                {
                    'directionArray': this.game.moveUp,
                    'directionToMove': this.directions.UP
                },
                {
                    'directionArray': this.game.moveRight,
                    'directionToMove': this.directions.RIGHT
                },
                {
                    'directionArray': this.game.moveDown,
                    'directionToMove': this.directions.DOWN
                },
                {
                    'directionArray': this.game.moveLeft,
                    'directionToMove': this.directions.LEFT
                }
            ]
            for(let option of options) {
                if(this.#attemptToSetDirection(key, option.directionArray, option.directionToMove)) break
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
            this.lastMovedTowards = this.direction
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

    getAllSnakeParts() {
        const snakeHead = {'x': this.head.x, 'y': this.head.y}
        return [snakeHead, ...this.body]
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