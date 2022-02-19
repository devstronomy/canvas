type Canvas = HTMLCanvasElement
type CanvasContext = CanvasRenderingContext2D

type CanvasInfo = Readonly<{
  canvas: Canvas
  ctx: CanvasContext
  width: number
  height: number
}>

type Color = Readonly<{
  r: string
  g: string
  b: string
}>

export type { Canvas, CanvasContext, CanvasInfo, Color }
