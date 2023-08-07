import * as React from 'react'
import { Path } from 'react-konva'
import { red } from '../../shared/tokens/colors'
import { getShapePath } from '../helpers'

export type ShapeComponent = React.FC<{
  height: number
  fillColor: string
}>

const getF = (r: number) => (n: number) => (n * r) / 110 - r * 0.46
const getG = (r: number) => (n: number) => (n * r) / 110 - r * 0.37

export const Shape: React.FC<{
  size: number
  whichShape: number
  color: string
}> = ({ size = 50, color = red, whichShape }) => {
  const pathCommands = getShapePath({
    f: getF(size),
    g: getG(size),
    whichShape,
  })
  return <Path data={pathCommands} fill={color} />
}

export const ShapeSVG: React.FC<{ size: number }> = ({ size, children }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

const shapeScale = 0.004
const multipliers = [
  { x: -0.95, y: -0.55 },
  { x: -0.65, y: -0.875 },
  { x: -0.2, y: -1 },
  { x: 0.225, y: -0.875 },
  { x: 0.55, y: -0.55 },
]
const svgTransformFn = (n: number) => (R: number) =>
  `translate(${R * multipliers[n].x} ${R * multipliers[n].y}) scale(${
    R * shapeScale
  })`

const konvaTransformFn = (n: number) => (R: number) => ({
  x: R * multipliers[n].x,
  y: R * multipliers[n].y,
})

export const shapeTransform: {
  SVG: { [i: number]: (R: number) => string }
  Konva: {
    scale: (R: number) => { x: number; y: number }
    position: { [i: number]: (R: number) => { x: number; y: number } }
  }
} = {
  SVG: {
    0: svgTransformFn(0),
    1: svgTransformFn(1),
    2: svgTransformFn(2),
    3: svgTransformFn(3),
    4: svgTransformFn(4),
  },
  Konva: {
    scale: (R: number) => ({ x: R * shapeScale, y: R * shapeScale }),
    position: {
      0: konvaTransformFn(0),
      1: konvaTransformFn(1),
      2: konvaTransformFn(2),
      3: konvaTransformFn(3),
      4: konvaTransformFn(4),
    },
  },
}
