type Canvas = HTMLCanvasElement
type CanvasContext = CanvasRenderingContext2D

type CanvasInfo = {
  canvas: Canvas
  ctx: CanvasContext
  width: number
  height: number

  zoom: {
    level: number
    min: number
    max: number
  }

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

export type { Canvas, CanvasContext, CanvasInfo, Color, DrawFunction }
