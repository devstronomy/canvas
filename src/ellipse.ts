import { defaultWidth, stroke } from './canvas'
import { CanvasContext } from './types'

type Base = {
  x: number
  y: number
  color?: string
  width?: number
  dashed?: boolean
}

type Ellipse = { rx: number; ry: number } & Base

type Circle = { r: number } & Base

function ellipse(ctx: CanvasContext, { x, y, rx, ry, color, width, dashed }: Ellipse): void {
  ctx.save()
  ctx.beginPath()
  if (dashed) {
    ctx.setLineDash([5, 5])
  }
  ctx.lineWidth = width ?? defaultWidth

  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  if (color) {
    stroke(ctx, color)
  }
  ctx.restore()
}

function circle(ctx: CanvasContext, { x, y, r, color, width, dashed }: Circle): void {
  ellipse(ctx, { x, y, rx: r, ry: r, color, width, dashed })
}

export { ellipse, circle }
