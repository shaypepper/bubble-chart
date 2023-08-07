import * as React from 'react'
import { ShapeComponent, ShapeSVG } from './Shape'

const pathCommands = `M0.0640005 45.8687
   C2.76645 28.9527 23.7853 28.5782 40 37.9863
   C34.5951 25.195 47.7858 -1.84027 70.5062 0.0990342
   C129.96 5.17384 81.1409 100 81.1409 100
   C81.1409 100 -2.63844 88.1587 0.0640005 45.8687Z`

const Heart: ShapeComponent = ({ height, fillColor, onClick }) => (
  <ShapeSVG size={height} onClick={onClick}>
    <path d={pathCommands} fill={fillColor} />
  </ShapeSVG>
)

Heart.pathCommands = pathCommands

export default Heart
