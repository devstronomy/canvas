import type { CanvasContext, CanvasInfo } from './types'

const defaultWidth: number = 1

function clear({ ctx, width, height }: CanvasInfo): void {
  ctx.save()
  ctx.beginPath()
  ctx.translate(-100, 0)
  ctx.clearRect(0, 0, width, height)
  ctx.restore()
}

function stroke(ctx: CanvasContext, color: string): void {
  ctx.strokeStyle = color
  ctx.stroke()
}

function fill(ctx: CanvasContext, color: string): void {
  ctx.fillStyle = color
  ctx.fill()
}

function fillCanvas(ci: CanvasInfo, color: string): void {
  ci.ctx.fillStyle = color
  ci.ctx.fillRect(0, 0, ci.width, ci.height)
}

function fillRGB(ctx: CanvasContext, r: string, g: string, b: string): void {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()
}

export { defaultWidth, clear, fill, fillRGB, fillCanvas, stroke }
