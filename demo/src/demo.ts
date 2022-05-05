import { CanvasInfo, initializeCanvas } from 'Canvas/index'

import { animationDemo, gridDemo, scalingDemo, staticDemo } from './scene'

enum Scene {
  Static,
  Animation,
  Scaling,
  Grid,
}

type ElementId = Readonly<'static-demo' | 'animation-demo' | 'scaling-demo' | 'grid-demo'>

type SceneInfo = Readonly<{
  scene: Scene
  callback: (ci: CanvasInfo) => void
  isAnimation: boolean
}>

const sceneInfoMap: Record<ElementId, SceneInfo> = {
  'static-demo': { scene: Scene.Static, callback: staticDemo, isAnimation: false },
  'animation-demo': { scene: Scene.Animation, callback: animationDemo, isAnimation: true },
  'scaling-demo': { scene: Scene.Scaling, callback: scalingDemo, isAnimation: false },
  'grid-demo': { scene: Scene.Grid, callback: gridDemo, isAnimation: false },
}

let currentScene: SceneInfo = sceneInfoMap['static-demo'] // default/initial scene

function drawScene(ci: CanvasInfo): void {
  currentScene.callback(ci)
}

function demo() {
  const ci = initializeCanvas('canvas', drawScene)
  ci.showDebugBox()

  Object.entries(sceneInfoMap).forEach(([elementId, newScene]) => {
    document.getElementById(elementId)?.addEventListener('click', () => {
      if (currentScene.scene !== newScene.scene) {
        currentScene = newScene
        if (currentScene.isAnimation) {
          ci.startLoop()
        } else {
          ci.stopLoop()
          ci.redraw()
        }
      }
    })
  })
}

export { demo }
