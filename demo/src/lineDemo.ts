import { line } from 'Canvas/line'
import { CanvasInfo } from 'Canvas/types'

function lineDemo({ ctx, canvas }: CanvasInfo) {
  line(ctx, {
    x1: 10,
    y1: 10,
    x2: canvas.width - 10,
    y2: canvas.height - 10,
    color: 'red',
  })
  line(ctx, {
    x1: 10,
    y1: canvas.height - 10,
    x2: canvas.width - 10,
    y2: 10,
    color: 'green',
    dashed: true,
    width: 3,
  })
}

export { lineDemo }
