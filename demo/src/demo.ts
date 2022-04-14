import { CanvasInfo, fillCanvas, initializeCanvas } from 'Canvas/index'

import { animationDemo } from './animationDemo'
import { ellipseDemo } from './ellipseDemo'
import { lineDemo } from './lineDemo'

enum Scene {
  StaticDemo,
  AnimationDemo,
}

let scene: Scene = Scene.StaticDemo

function drawScene(ci: CanvasInfo): void {
  fillCanvas(ci, 'black);')
  switch (scene) {
    case Scene.StaticDemo:
      lineDemo(ci)
      ellipseDemo(ci)
      break
    case Scene.AnimationDemo:
      animationDemo(ci)
      break
    default:
      console.error('Unknown demo')
  }
}

function demo() {
  const canvas = initializeCanvas('canvas', drawScene)

  document.getElementById('static-demo')?.addEventListener('click', () => {
    if (scene !== Scene.StaticDemo) {
      scene = Scene.StaticDemo
      canvas.stopLoop()
      canvas.redraw()
    }
  })

  document.getElementById('animation-demo')?.addEventListener('click', () => {
    if (scene !== Scene.AnimationDemo) {
      scene = Scene.AnimationDemo
      canvas.startLoop()
    }
  })
}

export { demo }
