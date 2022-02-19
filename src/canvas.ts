import { checkDefined } from './preconditions'
import type { CanvasContext, CanvasInfo } from './types'

const defaultWidth: number = 1

function initializeCanvas(canvasElementId: string): CanvasInfo {
  const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement
  const ctx = checkDefined(canvas.getContext('2d'), 'canvas context')

  const adjustCanvas = (canvasInfo: CanvasInfo) => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight

    // Check if the canvas is not the same size and possibly adjust.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth
      canvas.height = displayHeight
      return {
        ...canvasInfo,
        width: displayWidth,
        height: displayHeight,
      }
    }
    return canvasInfo
  }

  let canvasInfo: CanvasInfo = {
    canvas,
    ctx,
    width: 0,
    height: 0,
  }
  adjustCanvas(canvasInfo)

  return canvasInfo
}

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

function fillRGB(ctx: CanvasContext, r: string, g: string, b: string): void {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()
}

export { initializeCanvas, defaultWidth, clear, fill, fillRGB, stroke }
