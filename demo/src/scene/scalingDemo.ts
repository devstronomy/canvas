import { circle, ellipse, line } from 'Canvas/index'
import { CanvasInfo } from 'Canvas/types'

import { hsl } from '../tools'

function scalingDemo(ci: CanvasInfo) {
  const width = ci.width
  const height = ci.height
  const scaledWidth = ci.scale(width)
  const r = width / 50
  const lineWidth = 10

  ci.ctx.translate(width / 2, height / 2)

  ellipse(ci.ctx, { x: 0, y: 0, rx: scaledWidth / 2, ry: height / 2, color: 'white', width: lineWidth })
  line(ci.ctx, { x1: -scaledWidth / 2, x2: scaledWidth / 2, y1: 0, y2: 0, color: 'grey', width: 2 })
  line(ci.ctx, { x1: 0, x2: 0, y1: -height / 2, y2: height / 2, color: 'grey', width: ci.scale(2) })

  circle(ci.ctx, { x: 0, y: 0, r: r, color: hsl(350), width: lineWidth })
  circle(ci.ctx, { x: 0, y: 0, r: ci.scale(r), color: hsl(10), width: ci.scale(lineWidth) })

  circle(ci.ctx, { x: -scaledWidth / 2 + r + lineWidth, y: 0, r: r, color: hsl(72), width: lineWidth })
  circle(ci.ctx, { x: scaledWidth / 2 - r - lineWidth, y: 0, r: r, color: hsl(144), width: lineWidth })

  circle(ci.ctx, { x: 0, y: height / 2, r: ci.scale(r), color: hsl(216), width: lineWidth, fillColor: hsl(216) })
  circle(ci.ctx, { x: 0, y: -height / 2, r: ci.scale(r), color: hsl(288), width: lineWidth, fillColor: hsl(288) })
}

export { scalingDemo }
