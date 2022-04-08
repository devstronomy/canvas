import { CanvasInfo, fillCanvas, initializeCanvas } from 'Canvas/index'

import { ellipseDemo } from './ellipseDemo'
import { lineDemo } from './lineDemo'

enum Scene {
  StaticDemo,
  AnimationDemo,
}

let scene: Scene = Scene.StaticDemo

function drawScene(c: CanvasInfo): void {
  fillCanvas(c, 'black);')
  switch (scene) {
    case Scene.StaticDemo:
      // TODO: MK: replace with animation sample
      lineDemo(c)
      break
    case Scene.AnimationDemo:
      lineDemo(c)
      ellipseDemo(c)
      break
    default:
      console.error('Unknown demo')
  }
}

function demo() {
  const canvas = initializeCanvas('canvas', drawScene)

  document.getElementById('static-demo')?.addEventListener('click', () => {
    scene = Scene.StaticDemo
    canvas.redraw()
  })

  document.getElementById('animation-demo')?.addEventListener('click', () => {
    scene = Scene.AnimationDemo
    canvas.redraw()
  })
}

export { demo }
