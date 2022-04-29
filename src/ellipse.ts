import { defaultWidth, stroke } from './canvas'
import { CanvasContext } from './types'

type Base = {
  x: number
  y: number
  color?: string
  fillColor?: string
  width?: number
  dashed?: boolean
}

type Ellipse = { rx: number; ry: number } & Base

type Circle = { r: number } & Base

function ellipse(ctx: CanvasContext, e: Ellipse): void {
  ctx.save()
  ctx.beginPath()
  if (e.fillColor) {
    ctx.fillStyle = e.fillColor
  }
  if (e.dashed) {
    ctx.setLineDash([5, 5])
  }
  ctx.lineWidth = e.width ?? defaultWidth

  ctx.ellipse(e.x, e.y, e.rx, e.ry, 0, 0, Math.PI * 2)
  if (e.color) {
    stroke(ctx, e.color)
  }
  if (e.fillColor) {
    ctx.fill()
  }
  ctx.restore()
}

function circle(ctx: CanvasContext, { r, ...rest }: Circle): void {
  ellipse(ctx, { ...rest, rx: r, ry: r })
}

export { ellipse, circle }
