import { CanvasInfo, fillCanvas, initializeCanvas } from 'Canvas/index'

import { animationDemo } from './animationDemo'
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
      lineDemo(c)
      ellipseDemo(c)
      break
    case Scene.AnimationDemo:
      animationDemo(c)
      break
    default:
      console.error('Unknown demo')
  }
}

function demo() {
  const canvas = initializeCanvas('canvas', drawScene)

  document.getElementById('static-demo')?.addEventListener('click', () => {
    scene = Scene.StaticDemo
    canvas.stopLoop()
    canvas.redraw()
  })

  document.getElementById('animation-demo')?.addEventListener('click', () => {
    scene = Scene.AnimationDemo
    canvas.startLoop()
  })
}

export { demo }
