import { CanvasInfo, initializeCanvas } from 'Canvas/index'

import { animationDemo, scalingDemo, staticDemo } from './scene'

enum Scene {
  StaticDemo,
  AnimationDemo,
  ScaleDemo,
}

let scene: Scene = Scene.StaticDemo // default scene

function drawScene(ci: CanvasInfo): void {
  switch (scene) {
    case Scene.StaticDemo:
      staticDemo(ci)
      break
    case Scene.AnimationDemo:
      animationDemo(ci)
      break
    case Scene.ScaleDemo:
      scalingDemo(ci)
      break
    default:
      console.error('Unknown demo')
  }
}

function demo() {
  const ci = initializeCanvas('canvas', drawScene)
  ci.showDebugBox()

  function onSceneElementClick(elemendId: string, newScene: Scene, callback: () => void) {
    document.getElementById(elemendId)?.addEventListener('click', () => {
      if (scene !== newScene) {
        scene = newScene
        callback()
      }
    })
  }

  onSceneElementClick('static-demo', Scene.StaticDemo, () => {
    ci.stopLoop()
    ci.redraw()
  })

  onSceneElementClick('animation-demo', Scene.AnimationDemo, () => {
    ci.startLoop()
  })

  onSceneElementClick('scale-demo', Scene.ScaleDemo, () => {
    ci.stopLoop()
    ci.redraw()
  })
}

export { demo }
