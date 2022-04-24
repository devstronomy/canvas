import { fillCanvas } from './canvas'
import drawDebugBox from './debugBox'
import { checkDefined } from './preconditions'
import type { CanvasInfo, DrawFunction } from './types'

type InternalState = {
  loop: boolean
  debugBoxVisible: boolean
}

type Options = Readonly<{
  zoomMin?: number
  zoomMax?: number
}>

function initializeCanvas(
  canvasElementOrId: string | HTMLCanvasElement,
  drawFunction: DrawFunction,
  options?: Options
): CanvasInfo {
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
    // prepare canvas
    fillCanvas(ci, 'black')
    ci.ctx.setTransform(1, 0, 0, 1, 1, 1)
    ci.ctx.fillRect(0, 0, ci.width, ci.height)
    ci.ctx.translate(ci.width / 2, ci.height / 2)
    ci.ctx.scale(ci.zoom.level, ci.zoom.level)
    ci.ctx.translate(-ci.width / 2, -ci.height / 2)

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

  function ensureRedraw() {
    if (!state.loop) {
      ci.redraw()
    }
  }

  function changeZoomLevel(delta: number) {
    ci.zoom.level += delta / 1000
    ci.zoom.level = Math.min(ci.zoom.max, Math.max(ci.zoom.min, ci.zoom.level))
    ensureRedraw()
  }

  let ci: CanvasInfo = {
    ctx,
    width: 0,
    height: 0,

    zoom: {
      level: 1,
      min: options?.zoomMin ?? 0.2,
      max: options?.zoomMax ?? 4,
    },
    changeZoomLevel,

    redraw: () => drawCanvas(ci),
    startLoop,
    stopLoop,
    destroy: () => {},

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

  // setup mouse listener
  const mouseMoveListener = (event: MouseEvent) => {
    ci.mouseX = event.offsetX
    ci.mouseY = event.offsetY
    ensureRedraw()
  }
  canvasEl.addEventListener('mousemove', mouseMoveListener)

  // clean up
  ci.destroy = () => {
    resizeObserver.unobserve(canvasContainer)
    canvasEl.removeEventListener('wheel', wheelListener)
    canvasEl.removeEventListener('mousemove', mouseMoveListener)
  }

  return ci
}

export { initializeCanvas }
