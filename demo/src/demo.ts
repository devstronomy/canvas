import { initializeCanvas } from 'Canvas/index'

import { ellipseDemo } from './ellipseDemo'
import { lineDemo } from './lineDemo'

function demo() {
  const canvasInfo = initializeCanvas('canvas')
  const { ctx, canvas } = canvasInfo

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  lineDemo(canvasInfo)
  ellipseDemo(canvasInfo)
}

export { demo }
