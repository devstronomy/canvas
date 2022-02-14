import { line } from 'CanvasMK/line'

function initCanvas() {
  console.log('Initializing canvas...')
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (ctx == null) {
    throw new Error('Context of the canvas not available')
  }

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  line(ctx, 10, 10, canvas.width - 10, canvas.height - 10, 'red')
}

export { initCanvas }
