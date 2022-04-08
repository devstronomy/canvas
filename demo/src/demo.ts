import { CanvasInfo, fillCanvas, initializeCanvas } from 'Canvas/index'

import { ellipseDemo } from './ellipseDemo'
import { lineDemo } from './lineDemo'

function drawScene(c: CanvasInfo): void {
  fillCanvas(c, 'black);')
  lineDemo(c)
  ellipseDemo(c)
}

function demo() {
  initializeCanvas('canvas', drawScene)
}

export { demo }
