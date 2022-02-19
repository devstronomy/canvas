import { ellipse } from 'Canvas/index'
import { CanvasInfo } from 'Canvas/types'

function ellipseDemo({ ctx, canvas: { width, height } }: CanvasInfo) {
  for (let r = 1; r < 5; r++) {
    ellipse(ctx, {
      x: width / 2,
      y: height / 2,
      rx: (width / 2 / 5) * r,
      ry: (height / 2 / 7) * r,
      color: 'orange',
    })
  }
}

export { ellipseDemo }
