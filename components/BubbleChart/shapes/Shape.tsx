import * as React from 'react'
import { Path } from 'react-konva'
import { red } from '../../shared/tokens/colors'
import { getShapePath } from '../helpers'
import Cloud from './Cloud'
import Fist1 from './Fist1'
import Fist2 from './Fist2'
import Heart from './Heart'
import Pillow from './Pillow'
import Splat from './Splat'
import Star from './Star'
import TShirt from './TShirt'

export type ShapeComponent = React.FC<{
  height: number
  fillColor: string
  onClick?: React.MouseEventHandler
}> & { pathCommands: string }

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

export const ShapeSVG: React.FC<{
  size: number
  onClick?: React.MouseEventHandler
}> = ({ size, children, onClick = () => {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
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

export enum Shapes {
  HEART = 'heart',
  SPLAT = 'splat',
  FIST_1 = 'fist1',
  FIST_2 = 'fist2',
  PILLOW = 'pillow',
  CLOUD = 'cloud',
  STAR = 'star',
  // AVATAR = 'avatar',
  T_SHIRT = 't-shirt',
}

export const shapePaths = {
  [Shapes.HEART]: Heart,
  [Shapes.SPLAT]: Splat,
  [Shapes.FIST_1]: Fist1,
  [Shapes.FIST_2]: Fist2,
  [Shapes.PILLOW]: Pillow,
  [Shapes.CLOUD]: Cloud,
  [Shapes.STAR]: Star,
  // [Shapes.AVATAR]: Avatar,
  [Shapes.T_SHIRT]: TShirt,
}
