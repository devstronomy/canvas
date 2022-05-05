import { circle, line } from 'Canvas/index'
import { CanvasInfo } from 'Canvas/types'

import { hsl } from '../tools'

function gridDemo(ci: CanvasInfo) {
  const width = ci.width
  const height = ci.height
  const scaledWidth = ci.scale(width)
  const scaledHeight = ci.scale(height)
  const gridGap = width / 7

  ci.ctx.translate(width / 2, height / 2)

  // horizontal lines
  const xStart = -scaledWidth / 2 + ((scaledWidth / 2) % gridGap)
  for (let x = xStart; x < scaledWidth / 2; x += gridGap) {
    line(ci.ctx, { x1: x, y1: -scaledHeight / 2, x2: x, y2: scaledHeight / 2, color: 'white', width: ci.scale(1) })
  }

  // vertical lines
  const yStart = -scaledHeight / 2 + ((scaledHeight / 2) % gridGap)
  for (let y = yStart; y < scaledHeight / 2; y += gridGap) {
    line(ci.ctx, { x1: -scaledWidth / 2, y1: y, x2: scaledWidth, y2: y, color: 'white', width: ci.scale(1) })
  }

  circle(ci.ctx, {
    x: 0,
    y: 0,
    r: Math.max(width, height) / 20,
    color: hsl(120),
    width: 4,
    fillColor: hsl(120, 80),
  })
}

export { gridDemo }
