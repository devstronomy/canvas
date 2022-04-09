import { checkDefined } from './preconditions'
import type { CanvasContext, CanvasInfo } from './types'

const defaultWidth: number = 1

function initializeCanvas(canvasElementId: string, drawFunction: (ci: CanvasInfo) => void): CanvasInfo {
  const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement
  const canvasContainer = checkDefined(
    canvas.parentElement,
    'canvas (id=' + canvasElementId + ') must have parent element'
  )

  const ctx = checkDefined(canvas.getContext('2d'), 'canvas context')

  const adjustCanvas = (canvasInfo: CanvasInfo): CanvasInfo => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvasContainer.clientWidth
    const displayHeight = canvasContainer.clientHeight

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

  let animationHandle: number | undefined

  function startLoop() {
    console.log('%cMK: startLoop()', 'font-weight: bold')
    // prepare canvas
    canvasInfo = adjustCanvas(canvasInfo)
    drawFunction(canvasInfo)
    animationHandle = requestAnimationFrame(startLoop)
  }

  function stopLoop() {
    console.log('%cMK: stopLoop()', 'font-weight: bold')
    if (animationHandle !== undefined) {
      cancelAnimationFrame(animationHandle!)
      animationHandle = undefined
    } else {
      console.log('Animation is not running.')
    }
  }

  let canvasInfo: CanvasInfo = {
    canvas,
    ctx,
    width: 0,
    height: 0,
    redraw: () => drawFunction(canvasInfo),
    startLoop,
    stopLoop,
  }

  adjustCanvas(canvasInfo)

  const resizeObserver = new ResizeObserver((_entries) => {
    canvasInfo = adjustCanvas(canvasInfo)
    drawFunction(canvasInfo)
  })
  resizeObserver.observe(canvasContainer)

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

function fillCanvas({ ctx, canvas }: CanvasInfo, color: string): void {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function fillRGB(ctx: CanvasContext, r: string, g: string, b: string): void {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()
}

export { initializeCanvas, defaultWidth, clear, fill, fillRGB, fillCanvas, stroke }
