import * as React from 'react'
import { ShapeComponent, ShapeSVG } from './Shape'

const pathCommands = `M37.6428 0
  C37.6428 0 8.14038e-05 16.6667 0 37.037
  C-8.14036e-05 57.4074 70.2665 100 70.2665 100
  C70.2665 100 109.412 68.0601 97.8712 44.4445
  C88.4677 25.2024 37.6428 0 37.6428 0Z`

const Pillow: ShapeComponent = ({ height, fillColor, onClick }) => (
  <ShapeSVG size={height} onClick={onClick}>
    <path d={pathCommands} fill={fillColor} />
  </ShapeSVG>
)

Pillow.pathCommands = pathCommands

export default Pillow
