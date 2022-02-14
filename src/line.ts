import { stroke } from './basic'

function line(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width = 3
): void {
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  stroke(ctx, color)
  ctx.restore()
}

export { line }
