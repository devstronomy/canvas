import drawDebugBox from './debugBox'
import { checkDefined } from './preconditions'
import type { CanvasInfo, DrawFunction } from './types'

type InternalState = {
  loop: boolean
  debugBoxVisible: boolean
}

function initializeCanvas(canvasElementOrId: string | HTMLCanvasElement, drawFunction: DrawFunction): CanvasInfo {
  const state: InternalState = {
    loop: false,
    debugBoxVisible: false,
  }

  const canvasEl =
    typeof canvasElementOrId === 'string'
      ? (document.getElementById(canvasElementOrId) as HTMLCanvasElement)
      : canvasElementOrId

  const canvasContainer = checkDefined(
    canvasEl.parentElement,
    'canvas (id=' + canvasElementOrId + ') must have parent element'
  )

  const ctx = checkDefined(canvasEl.getContext('2d'), 'canvas context')

  const adjustCanvas = (ci: CanvasInfo): CanvasInfo => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvasContainer.clientWidth
    const displayHeight = canvasContainer.clientHeight

    // Check if the canvas is not the same size and possibly adjust.
    if (canvasEl.width !== displayWidth || canvasEl.height !== displayHeight) {
      canvasEl.width = displayWidth
      canvasEl.height = displayHeight
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
    if (state.debugBoxVisible) {
      ci.ctx.setTransform(1, 0, 0, 1, 0, 0)
      drawDebugBox(ci, state.loop)
    }
  }

  let animationHandle: number
  function doLoop() {
    drawCanvas(ci)
    if (state.loop) {
      animationHandle = requestAnimationFrame(() => doLoop())
    }
  }

  function startLoop() {
    if (state.loop) {
      console.warn('Attempt to start the loop, but the loop is already running.')
    } else {
      state.loop = true
      doLoop()
    }
  }

  function stopLoop() {
    if (!state.loop) {
      console.warn('Attempt to stop the loop, but no loop is not running.')
    }
    if (animationHandle == null) {
      console.warn('Attempt to stop the loop, with undefined animationHandle.')
    } else {
      cancelAnimationFrame(animationHandle)
    }
    state.loop = false
  }

  function changeZoomLevel(delta: number) {
    ci.zoomLevel += delta / 1000
    ci.zoomLevel = Math.min(4, Math.max(1 / 5, ci.zoomLevel))
    if (!state.loop) {
      ci.redraw()
    }
  }

  let ci: CanvasInfo = {
    canvas: canvasEl,
    ctx,
    width: 0,
    height: 0,
    zoomLevel: 1,
    redraw: () => drawCanvas(ci),
    startLoop,
    stopLoop,
    destroy: () => {},

    changeZoomLevel,

    showDebugBox: () => {
      state.debugBoxVisible = true
    },
    hideDebugBox: () => {
      state.debugBoxVisible = false
    },
  }

  ci = adjustCanvas(ci)

  // set up resizing observer
  const resizeObserver = new ResizeObserver((_entries) => {
    ci = adjustCanvas(ci)
    drawCanvas(ci)
  })
  resizeObserver.observe(canvasContainer)

  // setup mouse wheel listener
  const wheelListener = (event: WheelEvent) => {
    ci.changeZoomLevel(event.deltaY)
    event.preventDefault()
  }
  canvasEl.addEventListener('wheel', wheelListener)

  // clean up
  ci.destroy = () => {
    resizeObserver.unobserve(canvasContainer)
    canvasEl.removeEventListener('wheel', wheelListener)
  }

  return ci
}

export { initializeCanvas }
