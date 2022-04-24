import { defaultWidth, stroke } from './canvas'
import { CanvasContext } from './types'

type Rectangle = {
  x: number
  y: number
  w: number
  h: number
  color?: string
  lineWidth?: number
  dashed?: boolean
  dashGap?: number
}

function rect(ctx: CanvasContext, { x, y, w, h, lineWidth, dashed, color, dashGap = 5 }: Rectangle): void {
  ctx.save()
  ctx.beginPath()
  if (dashed) {
    ctx.setLineDash([dashGap, dashGap])
  }
  ctx.lineWidth = lineWidth ?? defaultWidth
  ctx.rect(x, y, w, h)

  if (color) {
    stroke(ctx, color)
  }
  ctx.restore()
}

export { rect }
