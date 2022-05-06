import { defaultWidth, stroke } from './canvas'
import { CanvasContext } from './types'

type Line = {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
  dashed?: boolean
  dashGap?: number
}

function line(
  ctx: CanvasContext,
  { x1, y1, x2, y2, width, dashed, color, dashGap = 5 }: Line
): void {
  ctx.save()
  ctx.beginPath()
  if (dashed) {
    ctx.setLineDash([dashGap, dashGap])
  }
  ctx.lineWidth = width ?? defaultWidth

  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)

  if (color) {
    stroke(ctx, color)
  }
  ctx.restore()
}

export { line }
