import { line } from 'Canvas/line'
import { CanvasInfo } from 'Canvas/types'

import boundaryBox from './boundaryBox'

const boundary = 10

function lineDemo(ci: CanvasInfo) {
  const { ctx, canvas } = ci

  boundaryBox(ci, boundary)

  // draw lines
  line(ctx, {
    x1: boundary,
    y1: boundary,
    x2: canvas.width - boundary,
    y2: canvas.height - boundary,
    color: 'red',
  })
  line(ctx, {
    x1: boundary,
    y1: canvas.height - boundary,
    x2: canvas.width - boundary,
    y2: boundary,
    color: 'green',
    dashed: true,
    width: 3,
  })
}

export { lineDemo }
