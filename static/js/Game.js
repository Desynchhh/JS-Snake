import {Snake} from './Snake.js'
import {Food} from './Food.js'

export class Game {
    moveUp = ['ArrowUp', 'w']
    moveRight = ['ArrowRight', 'd']
    moveDown = ['ArrowDown', 's']
    moveLeft = ['ArrowLeft', 'a']
    controlKeys = [...this.moveUp, ...this.moveRight, ...this.moveDown, ...this.moveLeft]
    constructor(ctx, width, height) {
        this.unit = 20
        this.width = width - (width % this.unit)
        this.height = height - (height % this.unit)
        this.ctx = ctx
        this.keys = []
        this.score = 0
        this.snake = this.#spawnSnake()
        this.spaces = this.#getSpaces()
        this.totalSpaces = this.spaces.length
        // this.winCondition = this.#calcWinLength()
        this.food = this.#spawnFood()
        console.log(this.width, this.height)
    }

    update(dt) {
        this.#updateSpaces()
        if(this.snake.head.x == this.food.x && this.snake.head.y == this.food.y) {
            this.score += 10
            this.snake.grow()
            console.log('score:', this.score)
            this.food = this.#spawnFood()
        }
        this.#updateGameObjects(dt)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.food.draw()
        this.snake.draw()
    }

    addKeyPress(key) {
        if(!this.keys.includes(key)) {
            this.keys.push(key)
        }
    }

    removeKeyPress(key) {
        if(this.keys.includes(key)) {
            this.keys.splice(this.keys.indexOf(key), 1)
        }
    }

    checkReset() {
        if(!this.snake.isAlive) {
            this.#reset()
        }
    }

     #calcWinLength() {
        const res = (this.width * this.height) / (this.unit * this.unit)
        return res
    }

    #updateSpaces() {
        this.spaces = this.#getSpaces()
        const snakeParts = this.snake.getAllSnakeParts()
        for(let snakePart of snakeParts) {
            this.#occupySpaces(snakePart.x, snakePart.y)
        }
    }

    #updateGameObjects(dt) {
        [this.food, this.snake].forEach(obj => obj.update(dt, this.keys))
    }

    #getSpaces() {
        const spaces = []
        let x = 0
        let y = 0
        while(y < this.height) {
            if(x < this.width) {
                spaces.push({x, y})
                x += this.unit
            } else {
                y += this.unit
                x = 0
            }
        }
        return spaces
    }

    #occupySpaces(x, y) {
        for(let i = 0; i < this.spaces.length; i++) {
            const sx = this.spaces[i].x
            const sy = this.spaces[i].y
            if(x == sx && y == sy) {
                this.spaces.splice(i, 1)
                return
            }
        }
    }

    #reset() {
        this.score = 0
        this.food = this.#spawnFood()
        this.snake = this.#spawnSnake()
        this.spaces = this.#getSpaces()
    }

    #spawnSnake() {
        return new Snake(this, 0, 0)
    }

    #spawnFood() {
        const i = this.#getRandomSpaceIndex()
        const {x, y} = this.spaces[i]
        return new Food(this, x, y)
    }

    #getRandomSpaceIndex() {
        const max = this.spaces.length-1
        const min = 0
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}