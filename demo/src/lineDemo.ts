import { line } from 'Canvas/line'
import { CanvasInfo } from 'Canvas/types'

function lineDemo({ ctx, canvas: { width, height } }: CanvasInfo) {
  line(ctx, {
    x1: 10,
    y1: 10,
    x2: width - 10,
    y2: height - 10,
    color: 'red',
  })
  line(ctx, {
    x1: 10,
    y1: height - 10,
    x2: width - 10,
    y2: 10,
    color: 'green',
    dashed: true,
    width: 3,
  })
}

export { lineDemo }
