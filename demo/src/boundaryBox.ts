import { rect } from 'Canvas/rect'
import { CanvasInfo } from 'Canvas/types'

function boundaryBox({ ctx, canvas, zoom }: CanvasInfo, boundary: number) {
  rect(ctx, {
    x: boundary - 1,
    y: boundary - 1,
    w: canvas.width - 2 * (boundary - 1),
    h: canvas.height - 2 * (boundary - 1),
    color: 'rgb(24, 188, 254)',
    dashed: true,
    dashGap: 15,
    lineWidth: 1 * (1 / zoom.level), // ignore zoom level for the box
  })
}

export default boundaryBox
