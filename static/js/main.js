import {Game} from './Game.js'

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    canvas.height = 500
    canvas.width = 500
    
    
    const game = new Game(ctx, canvas.width, canvas.height)
    let lastTime = 0
    const animate = timestamp => {
        const dt = timestamp - lastTime
        lastTime = timestamp
        game.update(dt)
        game.draw()
        requestAnimationFrame(animate)
    }
    
    window.addEventListener('keydown', e => {
        if(game.controlKeys.includes(e.key)) {
            game.addKeyPress(e.key)
        }
    })
    window.addEventListener('keyup', e => {
        if(game.controlKeys.includes(e.key)) {
            game.removeKeyPress(e.key)
        }
    })
    animate(0)
})