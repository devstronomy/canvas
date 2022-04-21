import { stroke } from './canvas'
import { CanvasInfo } from './types'

function drawDebugBox({ ctx, width }: CanvasInfo) {
  console.log('%cMK: drawDebugBox()', 'font-weight: bold')
  ctx.save()
  ctx.beginPath()
  const boxWidth = 200
  const boxHeight = 200

  ctx.globalAlpha = 0.65
  ctx.fillStyle = 'black'
  ctx.fillRect(width - boxWidth - 10, 10, boxWidth, boxHeight)

  ctx.globalAlpha = 1
  ctx.rect(width - boxWidth - 10, 10, boxWidth, boxHeight)
  stroke(ctx, 'gray')

  ctx.restore()
}

export default drawDebugBox
