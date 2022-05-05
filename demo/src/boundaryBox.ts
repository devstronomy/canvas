import { rect } from 'Canvas/rect'
import { CanvasInfo } from 'Canvas/types'

import { hsl } from './tools'

function boundaryBox(ci: CanvasInfo, boundary: number) {
  rect(ci.ctx, {
    x: boundary - 1,
    y: boundary - 1,
    w: ci.width - 2 * (boundary - 1),
    h: ci.height - 2 * (boundary - 1),
    color: hsl(210),
    dashed: true,
    dashGap: 15,
    lineWidth: 1 / ci.zoom.level, // ignore zoom level for the box
  })
}

export default boundaryBox
