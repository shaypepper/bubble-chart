import * as React from 'react'
import { useContext, useState, useRef, useEffect, FC, RefObject } from 'react'
import { width, height, margin } from './tokens'
import { pack, HierarchyCircularNode } from 'd3'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import { Person } from '../ChartCreater/data/dataFormattingReducer'
import {
  Group,
  Layer,
  Stage,
  Rect,
  TextPath,
  Circle,
  KonvaNodeEvents,
} from 'react-konva'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType } from 'konva/types/Layer'
import { Circle as CircleType } from 'konva/types/shapes/Circle'
import { ChartTheme, wirecutterTheme as theme } from './themes'
import { TextPath as TextPathType } from 'konva/types/shapes/TextPath'

type TranslationObject = {
  x: number
  y: number
}

type BubbleProps = {
  radius: number
  idx: number
  d: HierarchyCircularNode<Person>
  onClick: KonvaNodeEvents['onClick']
  fillColor: string
  textColor: string
  translation: TranslationObject
  isLeaf: boolean
  listLength: number
  scale: number
  name: string
  //   theme: Theme
}

const Bubble: React.FC<BubbleProps> = ({
  radius,
  translation,
  onClick,
  isLeaf,
  listLength,
  scale,
  name,
  //   theme,
}) => {
  const circleRef = useRef<CircleType>(null)
  const textRef = useRef<TextPathType>(null)
  const r = radius * height
  const circleR = radius * height

  // centers the text
  let offset = 120
  if (textRef.current !== null) {
    offset = 180 * (1 - textRef.current?.getTextWidth() / (Math.PI * 2 * r))
  }

  return (
    <Group className={'leaf'} x={translation.x} y={translation.y}>
      <Circle
        radius={circleR}
        fill={isLeaf ? theme.leaf.fillColor : theme.group.fillColor}
        onClick={onClick}
        ref={circleRef}
      />

      <TextPath
        ref={textRef}
        data={`M 0,${r} a ${r},${r} 0 1,1 0,${-2 * r} a ${r},${r} 0 1,1 0,${
          2 * r
        } `}
        fill={isLeaf ? theme.leaf.textColor : theme.group.textColor}
        fontSize={isLeaf ? width / listLength : Math.floor(Math.sqrt(r) / 2)}
        listening={false}
        fontFamily={theme.font}
        rotation={offset}
        text={name}
        opacity={circleR > width / (30 * scale) ? 1 : 0}
        textBaseline={isLeaf ? 'top' : 'bottom'}
      />
    </Group>
  )
}

export default Bubble

//   // Write assessment #
//   leaf.append("text")
//       .html(d => {
//         const assessment = +d.data[1].notes?.Assessment || '?';
//         return isWorker(d) ? assessment : "";
//       })
//       .attr("font-size", d => (d.r * height) * 0.41)
//       .attr("transform", d => `translate(${-0.5 * d.r * height} ${-0.2 * d.r * height})`)
//       .attr("fill", getTextColor)

//   // Write point person
//   leaf.append("text")
//       .html(d => {
//         if (!isWorker(d)) return "";
//         if (d.data[1].notes?.Assessment == 1) return 'Organizer';

//         const PP = d.data[1].notes?.['Point Person'].split(" ")[0] || "🤷🏻‍♀️";
//         return `PP: ${PP}`
//       })
//       .attr("font-size", d => (d.r * height) *0.2)
//       .attr("transform", d => `translate(${-0.85 * d.r * height} ${0.2 * d.r * height})`)
//       .attr("fill", getTextColor)
// }
