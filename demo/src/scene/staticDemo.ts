import { ellipse } from 'Canvas/index'
import { line } from 'Canvas/line'
import { CanvasInfo } from 'Canvas/types'

import boundaryBox from '../boundaryBox'

const boundary = 10

function staticDemo(ci: CanvasInfo): void {
  boundaryBox(ci, boundary)
  lineDemo(ci)
  ellipseDemo(ci)
}

function lineDemo(ci: CanvasInfo): void {
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

function ellipseDemo(ci: CanvasInfo): void {
  for (let r = 1; r < 5; r++) {
    ellipse(ci.ctx, {
      x: ci.width / 2,
      y: ci.height / 2,
      rx: (ci.width / 2 / 5) * r,
      ry: (ci.height / 2 / 7) * r,
      color: 'orange',
    })
  }
}
export { staticDemo }
