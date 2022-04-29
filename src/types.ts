type CanvasContext = CanvasRenderingContext2D

type CanvasInfo = {
  ctx: CanvasContext

  width: number
  height: number

  mouseX?: number
  mouseY?: number

  zoom: {
    level: number
    min: number
    max: number
  }
  scale: (n: number) => number

  redraw: () => void
  startLoop: () => void
  stopLoop: () => void
  destroy: () => void

  changeZoomLevel: (delta: number) => void

  showDebugBox: () => void
  hideDebugBox: () => void
}

type DrawFunction = (ci: CanvasInfo) => void

type Color = Readonly<{
  r: string
  g: string
  b: string
}>

export type { CanvasContext, CanvasInfo, Color, DrawFunction }
