import * as React from 'react'
import { useContext, useState, useRef, useEffect, FC, RefObject } from 'react'
// import { width, height, margin } from './tokens'
import { pack, HierarchyCircularNode } from 'd3'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import { Person } from '../ChartCreater/data/dataFormattingReducer'
import {
  Group,
  Layer,
  Stage,
  Rect,
  TextPath,
  Text,
  Circle,
  KonvaNodeEvents,
} from 'react-konva'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType } from 'konva/types/Layer'
import { Circle as CircleType } from 'konva/types/shapes/Circle'
import { ChartTheme, timesStatusMap } from './themes'
import { TextPath as TextPathType } from 'konva/types/shapes/TextPath'

type TranslationObject = {
  x: number
  y: number
}

type BubbleProps = {
  radius: number
  onClick: KonvaNodeEvents['onClick']
  translation: TranslationObject
  isLeaf: boolean
  listLength: number
  scale: number
  name: string
  theme: ChartTheme
  height: number
  width: number
  fillColor: string
  textColor: string
  d: d3.HierarchyCircularNode<Person>
}

const Bubble: React.FC<BubbleProps> = ({
  radius,
  translation,
  onClick,
  isLeaf,
  listLength,
  scale,
  name,
  theme,
  height,
  width,
  fillColor,
  textColor,
  d,
}) => {
  const circleRef = useRef<CircleType>(null)
  const textRef = useRef<TextPathType>(null)
  const textR = isLeaf ? radius * height * 0.95 : radius * height
  const ppTextR = radius * height * 0.8
  const circleR = radius * height

  // centers the text
  let offset = 120
  if (textRef.current !== null) {
    offset =
      180 * (1 - textRef.current?.getTextWidth() / (Math.PI * 2 * circleR))
  }

  return (
    <Group className={'leaf'} x={translation.x} y={translation.y}>
      <Circle
        radius={circleR}
        // fill={isLeaf ? fillColor : theme.group.fillColor}
        fill={isLeaf ? timesStatusMap[d?.data?.Status]?.fillColor : 'grey'}
        opacity={isLeaf ? 1 : 0.2}
        onClick={onClick}
        ref={circleRef}
      />

      <TextPath
        ref={textRef}
        data={`M 0,${textR} a ${textR},${textR} 0 1,1 0,${
          -2 * textR
        } a ${textR},${textR} 0 1,1 0,${2 * textR} `}
        // fill={isLeaf ? textColor : theme.group.textColor}
        fill={
          isLeaf
            ? timesStatusMap[d?.data?.Status]?.textColor
            : theme.group.textColor
        }
        fontSize={isLeaf ? textR / 4.5 : Math.floor(Math.sqrt(textR) / 2)}
        listening={false}
        fontFamily={theme.font}
        rotation={offset}
        text={name}
        // opacity={circleR > width / (30 * scale) ? 1 : 0}
        textBaseline={isLeaf ? 'top' : 'bottom'}
      />

      <Text
        fill={
          isLeaf
            ? timesStatusMap[d?.data?.Status]?.textColor
            : theme.group.textColor
        } // fill={isLeaf ? timesStatusMap[d.data.Status] : theme.group.textColor}
        fontSize={isLeaf ? textR / 1.5 : Math.floor(Math.sqrt(textR) / 2)}
        // fontSize={100}
        listening={false}
        fontFamily={theme.font}
        textBaseline={isLeaf ? 'top' : 'bottom'}
        text={d?.data?.Assessment}
        // text={'Shay'}
        zIndex={1}
        x={isLeaf ? -textR / 4 : Math.floor(Math.sqrt(textR) / 2)}
        y={isLeaf ? -textR / 2 : Math.floor(Math.sqrt(textR) / 2)}
      />

      <Text
        fill={
          isLeaf
            ? timesStatusMap[d?.data?.Status]?.textColor
            : theme.group.textColor
        } // fill={isLeaf ? timesStatusMap[d.data.Status] : theme.group.textColor}
        fontSize={isLeaf ? textR / 7 : Math.floor(Math.sqrt(textR) / 2)}
        // fontSize={100}
        listening={false}
        fontFamily={theme.font}
        textBaseline={isLeaf ? 'top' : 'bottom'}
        text={isLeaf ? d?.data?.Status?.slice(0, 21) + '...' : ''}
        // text={'Shay'}
        zIndex={1}
        x={isLeaf ? -textR : Math.floor(Math.sqrt(textR) / 2)}
        y={isLeaf ? textR / 10 : Math.floor(Math.sqrt(textR) / 2)}
      />

      <Text
        fill={
          isLeaf
            ? timesStatusMap[d?.data?.Status]?.textColor
            : theme.group.textColor
        } // fill={isLeaf ? timesStatusMap[d.data.Status] : theme.group.textColor}
        fontSize={isLeaf ? textR / 7 : Math.floor(Math.sqrt(textR) / 2)}
        // fontSize={100}
        listening={false}
        fontFamily={theme.font}
        textBaseline={isLeaf ? 'top' : 'bottom'}
        text={isLeaf ? 'PP: ' + d?.data?.['Point Person'] : ''}
        // text={'Shay'}
        zIndex={1}
        x={isLeaf ? -textR / 1.1 : Math.floor(Math.sqrt(textR) / 2)}
        y={isLeaf ? textR / 3.5 : Math.floor(Math.sqrt(textR) / 2)}
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
