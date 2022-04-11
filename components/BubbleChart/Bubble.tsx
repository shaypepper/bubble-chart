import { KonvaEventObject } from 'konva/types/Node'
import { TextPath as TextPathType } from 'konva/types/shapes/TextPath'
import { css } from 'pretty-lights'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Circle, TextPath, Text, Path } from 'react-konva'
import { height } from './tokens'
import {
  blue,
  deepGrey,
  green,
  orange,
  purple,
  red,
  white,
  yellow,
} from '../shared/tokens/colors'
import { bungeeFont, latoFont } from '../shared/tokens/fonts'
import { getStarPath } from './helpers'
import Pencil from '../shared/icons/Pencil'

type BubbleProps = {
  displayName: string
  fullName?: string
  radius?: number
  bubbleBorderColor?: string
  showBubbleBorder?: boolean
  bubbleFillColor?: string
  innerTextColor?: string
  showStars?: [boolean, boolean, boolean]
  starColors?: [string, string, string]
  translation?: {
    x: number
    y: number
  }
  textLines?: [string, string | void, string | void]
  mode?: 'display' | 'edit'
  width?: number | string
}

const textClass = css`
  font-family: ${latoFont};
  font-size: 4px;
  font-weight: 300;
`

const BubbleSVG: FC<BubbleProps> = ({
  mode = 'display',
  displayName = 'Angelique',
  fullName = 'Shay Culpepper',
  width = 200,
  bubbleFillColor = deepGrey,
  innerTextColor = white,
  showStars = [true, true, true],
  starColors = [blue, red, yellow],
  textLines = [
    'Steward: Sarah Duncan',
    'Assessment: 1. Doing Outreach',
    'G2K: Prefers text message',
  ],
}) => {
  const R = 50
  const r = R * 0.875
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={R}
        cy={R}
        r={R}
        fill={bubbleFillColor}
        mask="url(#circleMask)"
      />

      <path id="namePath" fill="none" stroke="none" d={`M 0,${R} H100`} />
      <text fill={innerTextColor}>
        <textPath
          textAnchor="middle"
          startOffset={'50%'}
          href="#namePath"
          style={{ fontFamily: 'Bangers', fontSize: R * 0.4 }}
        >
          {displayName}
        </textPath>
      </text>

      {textLines[0] && (
        <>
          <path
            id="textLine0Path"
            fill="none"
            stroke="none"
            d={`M 0,${R * 1.2} H100`}
          />
          <text fill={innerTextColor}>
            <textPath
              textAnchor="middle"
              startOffset={'50%'}
              href="#textLine0Path"
              className={textClass}
            >
              {textLines[0]}
            </textPath>
          </text>
        </>
      )}
      {textLines[1] && (
        <>
          <path
            id="textLine1Path"
            fill="none"
            stroke="none"
            d={`M 0,${R * 1.32} H100`}
          />
          <text fill={innerTextColor}>
            <textPath
              textAnchor="middle"
              startOffset={'50%'}
              href="#textLine1Path"
              className={textClass}
            >
              {textLines[1]}
            </textPath>
          </text>
        </>
      )}
      {textLines[2] && (
        <>
          <path
            id="textLine2Path"
            fill="none"
            stroke="none"
            d={`M 0,${R * 1.44} H100`}
          />
          <text fill={innerTextColor}>
            <textPath
              textAnchor="middle"
              startOffset={'50%'}
              href="#textLine2Path"
              className={textClass}
            >
              {textLines[2]}
            </textPath>
          </text>
        </>
      )}

      {showStars[0] && (
        <path d={getStarPath({ whichStar: 1 })} fill={starColors[0]} />
      )}
      {showStars[1] && (
        <path d={getStarPath({ whichStar: 2 })} fill={starColors[1]} />
      )}
      {showStars[2] && (
        <path d={getStarPath({ whichStar: 3 })} fill={starColors[2]} />
      )}

      {mode == 'edit' && (
        <>
          <Pencil
            value="Fill colors"
            size={10}
            transform="translate(5 -5)"
            fill={innerTextColor}
          />
          <Pencil
            value="Display name"
            size={6}
            transform="translate(80 -7)"
            fill={innerTextColor}
          />
          <Pencil
            value="Text line 1"
            size={3}
            transform="translate(80 8)"
            fill={innerTextColor}
          />
          <Pencil
            value="Text line 2"
            size={3}
            transform="translate(80 14)"
            fill={innerTextColor}
          />
          <Pencil
            value="Text line 3"
            size={3}
            transform="translate(80 20)"
            fill={innerTextColor}
          />
          <Pencil
            value="Star 1"
            size={3}
            transform="translate(31 -40)"
            fill={innerTextColor}
          />
          <Pencil
            value="Star 2"
            size={3}
            transform="translate(48 -42)"
            fill={innerTextColor}
          />
          <Pencil
            value="Star 3"
            size={3}
            transform="translate(64 -40)"
            fill={innerTextColor}
          />
        </>
      )}
    </svg>
  )
}

export const GroupingBubbleSVG: FC<BubbleProps> = ({
  fullName = 'Shay Culpepper',
  radius = 50,
  bubbleFillColor = deepGrey,
  innerTextColor = white,
}) => {
  const R = radius
  const r = R * 0.875
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={R}
        cy={R}
        r={R}
        fill={bubbleFillColor}
        mask="url(#circleMask)"
      />

      <path
        id="fullNamePath"
        fill="none"
        stroke="none"
        d={`M 0,${r} a ${r},${r} 0 1,1 0,${-2 * r} a ${r},${r} 0 1,1 0,${
          2 * r
        }`}
        transform={`translate(${R} ${R})`}
      />
      <text fill={innerTextColor}>
        <textPath
          textAnchor="middle"
          startOffset={'50%'}
          href="#fullNamePath"
          style={{ fontFamily: 'Bungee', fontSize: 6 }}
        >
          {fullName}
        </textPath>
      </text>
    </svg>
  )
}

export const BubbleKonva: FC<
  BubbleProps & { onClick: (evt: KonvaEventObject<MouseEvent>) => void }
> = ({
  displayName = 'Angelique',
  fullName = 'Shay Culpepper',
  radius = 50,
  translation = { x: 0, y: 0 },
  bubbleBorderColor = purple,
  showBubbleBorder = true,
  bubbleFillColor = deepGrey,
  innerTextColor = white,
  // showStars = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5],
  showStars = [true, true, true],
  starColors = [orange, red, yellow],
  textLines = [
    'Steward: Sarah Duncan',
    'Assessment: 1. Doing Outreach',
    'G2K: Prefers text message',
  ],
  onClick = () => {},
}) => {
  const R = radius * height

  const showStarsRandom = useMemo(() => {
    return [
      Math.random() < 0.33333,
      Math.random() > 0.33333,
      Math.random() < 0.5,
    ]
  }, [])

  return (
    <Group className={'leaf'} x={translation.x} y={translation.y}>
      <Circle
        radius={R}
        fill={deepGrey}
        strokeLinecap="round"
        strokeDashArray={[10, 10]}
        mask="url(#circleMask)"
        onClick={onClick}
      />

      <Text
        text={displayName}
        x={-R}
        y={-R / 4.6}
        fontFamily={bungeeFont}
        fontSize={
          displayName.length > 13
            ? R / 9
            : displayName.length > 8
            ? R / 4
            : R / 3
        }
        fill={white}
        align={'center'}
        width={R * 2}
      />

      {showStarsRandom[0] && (
        <Star size={R * 3} color={starColors[0]} whichStar={1} />
      )}
      {showStarsRandom[1] && (
        <Star size={R * 3} color={starColors[1]} whichStar={2} />
      )}
      {showStarsRandom[2] && (
        <Star size={R * 3} color={starColors[2]} whichStar={3} />
      )}
    </Group>
  )
}

export const GroupingBubble = ({
  displayName = 'Shay Culpepper',
  radius = 50,
  translation = { x: 0, y: 0 },
  onClick = () => {},
}) => {
  const [delayedRefresh, setDelayedRefresh] = useState(false)
  const R = radius * height
  const textR = R
  const textRef = useRef<TextPathType>(null)

  const offset = useMemo(() => {
    return (
      180 *
      (1 -
        ((textRef?.current?.getTextWidth() || 0) + displayName.length * 0.1) /
          (Math.PI * 2 * textR))
    )
  }, [delayedRefresh, textR, displayName.length])

  useEffect(() => {
    const delay = setTimeout(() => {
      setDelayedRefresh(true)
    }, 2000)
    return () => clearTimeout(delay)
  }, [])

  return (
    <Group className={'leaf'} x={translation.x} y={translation.y}>
      <Circle
        radius={R}
        fill={'#00000015'}
        strokeLinecap="round"
        strokeDashArray={[10, 10]}
        mask="url(#circleMask)"
        onClick={onClick}
      />

      <TextPath
        ref={textRef}
        data={`M 0,${textR} a ${textR},${textR} 0 1,1 0,${
          -2 * textR
        } a ${textR},${textR} 0 1,1 0,${2 * textR} `}
        fill={delayedRefresh ? white : 'transparent'}
        fontSize={R / 10}
        fontFamily={latoFont}
        rotation={offset}
        text={displayName}
        textBaseline={'alphabetic'}
        kerningFunc={() => 0.01}
      />
    </Group>
  )
}

const getF = (r: number) => (n: number) => (n * r) / 110 - r * 0.46
const getG = (r: number) => (n: number) => (n * r) / 110 - r * 0.37

const Star = ({
  size = 50,
  color = red,
  whichStar,
}: {
  size: number
  whichStar: 1 | 2 | 3
  color: string
}) => {
  const pathCommands = getStarPath({
    f: getF(size),
    g: getG(size),
    whichStar,
  })
  return <Path data={pathCommands} fill={color} />
}

export default BubbleSVG
