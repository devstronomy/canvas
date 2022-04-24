import { line } from 'Canvas/line'
import { CanvasInfo } from 'Canvas/types'

import boundaryBox from './boundaryBox'

const boundary = 10

function lineDemo(ci: CanvasInfo) {
  boundaryBox(ci, boundary)

  // draw lines
  line(ci.ctx, {
    x1: boundary,
    y1: boundary,
    x2: ci.width - boundary,
    y2: ci.height - boundary,
    color: 'red',
  })
  line(ci.ctx, {
    x1: boundary,
    y1: ci.height - boundary,
    x2: ci.width - boundary,
    y2: boundary,
    color: 'green',
    dashed: true,
    width: 3,
  })
}

export { lineDemo }
