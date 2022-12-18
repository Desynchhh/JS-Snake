import {Snake} from './Snake.js'
import {Food} from './Food.js'

export class Game {
    constructor(ctx, width, height) {
        this.controlKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'w', 'd', 's', 'a']
        this.keys = []
        this.ctx = ctx
        this.width = width
        this.height = height
        this.score = 0
        this.snake = this.#spawnSnake()
        this.food = this.#spawnFood()
        this.winCondition = this.#calcWinLength()
    }

    update(dt) {
        if(this.snake.x == this.food.x && this.snake.y == this.food.y) {
            this.score += 10
            this.snake.grow()
            console.log('score:', this.score)
            this.food = this.#spawnFood()
        }

        [this.food, this.snake].forEach(obj => obj.update(dt, this.keys))
    }

    draw() {
        this.ctx.clearRect(0,0, this.width, this.height)
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
        const res = (this.width * this.height) / (this.snake.w * this.snake.h) - this.snake.h
        return res
    }

    #reset() {
        this.score = 0
        this.food = this.#spawnFood()
        this.snake = this.#spawnSnake()
    }

    #spawnSnake() {
        return new Snake(this, 240, 240)
    }

    #spawnFood() {
        return new Food(this)
    }
}