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
        this.freeSpaces = this.#getFreeSpaces()
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
        const res = (this.width * this.height) / (this.snake.w * this.snake.h)
        console.log(res)
        return res
    }

    #getFreeSpaces() {
        const freeSpaces = []
        const gameSize = (this.width * this.height) / (this.snake.w * this.snake.h)
        if(this.snake.body.length <= 0) {
            // First iteration; All spaces are free.
            let x = 0
            let y = 0
            for(let i = 0; i < gameSize; i++) {
                if(y >= this.height) break
                if(x >= this.width) {
                    y += 20
                    x = 0
                }
                freeSpaces.push({x, y})
                x += 20
            }
        } else {
            // Game is running; Some spaces might be free.
            if(freeSpaces === 0) {
                // Snake has taken up all spaces - the game is won.
            }
        }
        console.log(freeSpaces)
        console.log(freeSpaces.length)
        return freeSpaces
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