import { stroke } from './canvas'
import { CanvasInfo } from './types'

function drawDebugBox({ ctx, width, height }: CanvasInfo) {
  const nOfLines = 2
  const fontSize = 12
  const boxWidth = 100
  const boxHeight = (nOfLines + 1) * fontSize
  const boxX = width - boxWidth - 10
  const boxY = 10

  ctx.save()

  // rectangle
  ctx.beginPath()
  ctx.globalAlpha = 0.65
  ctx.fillStyle = 'black'
  ctx.fillRect(boxX, 10, boxWidth, boxHeight)
  // rectangle border
  ctx.globalAlpha = 1
  ctx.rect(boxX, 10, boxWidth, boxHeight)
  stroke(ctx, '#ddd')

  // text information
  ctx.beginPath()
  const textLineY = (n: number) => boxY + n * (fontSize + 2)
  const textLineX = boxX + 6
  ctx.fillStyle = '#0e0'
  ctx.font = `normal normal ${fontSize}px Monospace`
  ctx.fillText(`Width  ${width}`, textLineX, textLineY(1), boxWidth - 12)
  ctx.fillText(`Height ${height}`, textLineX, textLineY(2), boxWidth - 12)

  ctx.restore()
}

export default drawDebugBox
