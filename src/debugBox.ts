import { stroke } from './canvas'
import { CanvasInfo } from './types'

function drawDebugBox({ ctx, width, height, zoomLevel }: CanvasInfo, loop: boolean) {
  // prettier-ignore
  const lines = [
    `Width    ${width}`,
    `Height   ${height}`,
    `Zoom     ${zoomLevel}`,
    `Looping  ${loop}`,
  ]

  const nOfLines = lines.length
  const fontSize = 12
  const boxWidth = 120
  const boxHeight = (nOfLines + 1) * (fontSize + 2) - 6
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

  lines.forEach((line, idx) => ctx.fillText(line, textLineX, textLineY(idx + 1), boxWidth - 12))

  ctx.restore()
}

export default drawDebugBox
