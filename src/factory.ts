import drawDebugBox from './debugBox'
import { checkDefined } from './preconditions'
import type { CanvasInfo, DrawFunction } from './types'

function initializeCanvas(canvasElementOrId: string | HTMLCanvasElement, drawFunction: DrawFunction): CanvasInfo {
  let loop: boolean = false
  let debugBoxVisible: boolean = false

  const canvas =
    typeof canvasElementOrId === 'string'
      ? (document.getElementById(canvasElementOrId) as HTMLCanvasElement)
      : canvasElementOrId

  const canvasContainer = checkDefined(
    canvas.parentElement,
    'canvas (id=' + canvasElementOrId + ') must have parent element'
  )

  const ctx = checkDefined(canvas.getContext('2d'), 'canvas context')

  const adjustCanvas = (ci: CanvasInfo): CanvasInfo => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvasContainer.clientWidth
    const displayHeight = canvasContainer.clientHeight

    // Check if the canvas is not the same size and possibly adjust.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth
      canvas.height = displayHeight
      return {
        ...ci,
        width: displayWidth,
        height: displayHeight,
      }
    }
    return ci
  }

  function drawCanvas(ci: CanvasInfo) {
    drawFunction(ci)
    if (debugBoxVisible) {
      drawDebugBox(ci)
    }
  }

  let animationHandle: number
  function doLoop() {
    drawCanvas(ci)
    if (loop) {
      animationHandle = requestAnimationFrame(() => doLoop())
    }
  }

  function startLoop() {
    if (loop) {
      console.warn('Attempt to start the loop, but the loop is already running.')
    } else {
      loop = true
      doLoop()
    }
  }

  function stopLoop() {
    if (!loop) {
      console.warn('Attempt to stop the loop, but no loop is not running.')
    }
    if (animationHandle == null) {
      console.warn('Attempt to stop the loop, with undefined animationHandle.')
    } else {
      cancelAnimationFrame(animationHandle)
    }
    loop = false
  }

  let ci: CanvasInfo = {
    canvas,
    ctx,
    width: 0,
    height: 0,
    redraw: () => drawCanvas(ci),
    startLoop,
    stopLoop,
    destroy: () => {},
    showDebugBox: () => {
      debugBoxVisible = true
    },
    hideDebugBox: () => {
      debugBoxVisible = false
    },
  }

  ci = adjustCanvas(ci)
  const resizeObserver = new ResizeObserver((_entries) => {
    ci = adjustCanvas(ci)
    drawCanvas(ci)
  })
  resizeObserver.observe(canvasContainer)
  ci.destroy = () => {
    resizeObserver.unobserve(canvasContainer)
  }

  return ci
}

export { initializeCanvas }
