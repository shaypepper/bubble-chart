import * as React from 'react'
import { ShapeComponent, ShapeSVG } from './Shape'

const pathCommands = `M53.3769 0
  L37.7778 31.25
  L0 26.5625
  L26.5591 53.125
  V100
  L53.3769 75
  L87.7037 100
  L71.9916 53.125
  L100 26.5625
  L64.4445 31.25
  L53.3769 0Z`

const Star: ShapeComponent = ({ height, fillColor, onClick }) => (
  <ShapeSVG size={height} onClick={onClick}>
    <path d={pathCommands} fill={fillColor} />
  </ShapeSVG>
)

Star.pathCommands = pathCommands

export default Star
