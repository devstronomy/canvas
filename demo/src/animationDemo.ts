import { line } from 'Canvas/line'
import { CanvasInfo } from 'Canvas/types'

import boundaryBox from './boundaryBox'

const speed = 2
const boundary = 10

let x1 = boundary
let x1Delta = speed

let y1 = boundary
let y1Delta = speed

function animationDemo(ci: CanvasInfo) {
  const { ctx, canvas } = ci
  if (x1 <= boundary) {
    x1Delta = speed
  }
  if (x1 >= canvas.width - boundary) {
    x1Delta = -speed
  }
  x1 += x1Delta

  if (y1 <= boundary) {
    y1Delta = speed
  }
  if (y1 >= canvas.height - boundary) {
    y1Delta = -speed
  }
  y1 += y1Delta

  boundaryBox(ci, boundary)

  // draw lines
  line(ctx, {
    x1,
    y1,
    x2: canvas.width - x1,
    y2: canvas.height - y1,
    color: 'red',
    width: 2,
  })
  line(ctx, {
    x1,
    y1: canvas.height - y1,
    x2: canvas.width - x1,
    y2: boundary,
    color: 'green',
    width: 3,
    dashed: true,
    dashGap: 10,
  })
}

export { animationDemo }
