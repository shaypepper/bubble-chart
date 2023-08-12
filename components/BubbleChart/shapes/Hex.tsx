import * as React from 'react'
import { ShapeComponent, ShapeSVG } from './Shape'

const pathCommands = `M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z`
// const pathCommands = `M0 44L25 0.69873H75L100 44L75 87.3013H25L0 44Z`

const Hex: ShapeComponent = ({ height, fillColor, onClick }) => (
  <ShapeSVG size={height} onClick={onClick}>
    <path d={pathCommands} fill={fillColor} />
  </ShapeSVG>
)

Hex.pathCommands = pathCommands

export default Hex
