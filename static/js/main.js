import {Snake} from './Snake.js'
import {Food} from './Food.js'

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    canvas.height = 500
    canvas.width = 500
    let score = 0;
    let lastTime = 0
    const keys = []


    const gameUpdate = () => {
        if(snake.x == food.x && snake.y == food.y) {
            score += 10
            snake.grow()
            console.log('score:', score)
            food = new Food(canvas.width, canvas.height)
        }
    }

    const update = (dt, keys, canvasW, canvasH) => {
        gameUpdate()
        food.update(snake)
        snake.update(dt, keys, canvasW, canvasH)
    }
    
    const draw = (ctx) => {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        food.draw(ctx)
        snake.draw(ctx)
    }
    
    const snake = new Snake(240, 240, canvas.width, canvas.height)
    let food = new Food(canvas.width, canvas.height)
    const animate = timestamp => {
        const dt = timestamp - lastTime
        lastTime = timestamp
        update(dt, keys, canvas.width, canvas.height)
        draw(ctx)
        requestAnimationFrame(animate)
    }
    
    window.addEventListener('keydown', e => {
        if(!keys.includes(e.key)) {
            keys.push(e.key)
        }
    })
    window.addEventListener('keyup', e => {
        if(keys.includes(e.key)) {
            keys.splice(keys.indexOf(e.key), 1)
        }
    })
    animate(0)
})