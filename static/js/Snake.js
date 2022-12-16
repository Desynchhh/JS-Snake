export class Snake {
    directions = {
        'UP': 1,
        'RIGHT': 2,
        'DOWN': -1,
        'LEFT': -2
    }
    constructor(x, y, canvasW, canvasH) {
        this.canvasW = canvasW
        this.canvasH = canvasH
        this.startDirection = this.directions.RIGHT
        this.startX = x
        this.startY = y
        this.x = x
        this.y = y
        this.h = 20
        this.w = this.h
        this.body = []
        this.timeSinceMove = 0
        this.moveInterval = 100
        this.stepSize = this.h
        this.direction = this.startDirection
        this.winCondition = this.calcWinLength()
        console.log(this.winCondition)
    }

    calcWinLength() {
        const res = (this.canvasW * this.canvasH) / (this.h * this.w) - this.h 
        return res
    }

    die() {
        this.body = []
        this.x = this.startX
        this.y = this.startY
        this.direction = this.startDirection
    }

    checkHitWall(canvasWidth, canvasHeight) {
        if (this.y < 0) {
            this.y = 0
            this.die()
        }
        else if (this.x > canvasWidth - this.w) {
            this.x = canvasWidth - this.w
            this.die()
        }
        else if (this.y + this.h > canvasHeight) {
            this.y = canvasHeight - this.h
            this.die()
        }
        else if (this.x < 0) {
            this.x = 0
            this.die()
        }
    }

    checkHitSelf() {
        for(let body of this.body) {
            const xAlign = body.x == this.x
            const yAlign = body.y == this.y
            if(xAlign && yAlign) {
                this.die()
                return
            }
        }
    }

    move() {
        if(this.direction == this.directions.UP) this.y -= this.stepSize
        else if(this.direction == this.directions.RIGHT) this.x += this.stepSize
        else if(this.direction == this.directions.DOWN) this.y += this.stepSize
        else if(this.direction == this.directions.LEFT) this.x -= this.stepSize
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
        const x = this.x
        const y = this.y
        this.body.unshift({ x, y })
    }

    update(dt, keys, canvasW, canvasH) {
        this.setDirection(keys)
        this.timeSinceMove = this.timeSinceMove + dt
        if(this.timeSinceMove >= this.moveInterval) {
            this.body.push({'x': this.x, 'y': this.y})
            this.body.shift()
            this.move()
            this.checkHitSelf()
            this.checkHitWall(canvasW, canvasH)
            this.timeSinceMove = 0
        }
    }

    draw(ctx) {
        let fillStyle = '000000'
        ctx.fillStyle = `#${fillStyle}`
        ctx.fillRect(this.x, this.y, this.w, this.h)
        for(const body of this.body) {
            console.log(fillStyle)
            ctx.fillRect(body.x, body.y, this.w, this.h)
        }
    }
}

const subHexColor = (c1, c2) => {
    var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
  }