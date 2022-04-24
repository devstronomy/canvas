import { ellipse } from 'Canvas/index'
import { CanvasInfo } from 'Canvas/types'

function ellipseDemo(ci: CanvasInfo) {
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

export { ellipseDemo }
