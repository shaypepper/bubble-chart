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
}

const textClass = css`
  font-family: ${latoFont};
  font-size: 4px;
  font-weight: 300;
`

export const BubbleSVG: FC<BubbleProps> = ({
  displayName = 'Angelique',
  fullName = 'Shay Culpepper',
  radius = 50,
  bubbleBorderColor = purple,
  showBubbleBorder = true,
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
      <mask id="circleMask">
        <circle cx="50" cy="50" r="50" fill="white" />
      </mask>

      <circle
        cx={R}
        cy={R}
        r={R}
        fill={bubbleFillColor}
        stroke={showBubbleBorder ? bubbleBorderColor : 'none'}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray="1 14"
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
        <path
          d="M49.505 12L46.4356 19.5648L40 20.8083L45.6436 25.7824L44.5545 32L49.505 29.2021L55.8416 32L53.5644 24.8497L60 19.5648H52.3762L49.505 12Z"
          fill={starColors[0]}
        />
      )}
      {showStars[1] && (
        <path
          d="M77.923 22.9915L71.306 18.2101L71.6298 11.6635L65.4556 15.9611L59.6758 13.4236L61.2152 18.8977L56.9896 24.3864L64.4764 23.8763L68.0779 31.3848L69.8923 23.98L77.923 22.9915Z"
          fill={starColors[1]}
        />
      )}
      {showStars[2] && (
        <path
          d="M25.3067 13.7123L27.7855 21.4906L23.6336 26.5626L31.1533 26.7769L34.2927 32.2531L36.3088 26.936L42.9694 25.0341L36.6457 20.994L38.2128 12.8152L32.3522 17.6912L25.3067 13.7123Z"
          fill={starColors[2]}
        />
      )}

      <path
        id="fullNamePath"
        fill="none"
        stroke="none"
        d={`M 0,${r} a ${r},${r} 0 1,1 0,${-2 * r} a ${r},${r} 0 1,1 0,${
          2 * r
        }`}
        transform={`translate(${R} ${R})`}
      />
      <text fill="white">
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
  showStars = [true, true, true],
  starColors = [orange, green, yellow],
  textLines = [
    'Steward: Sarah Duncan',
    'Assessment: 1. Doing Outreach',
    'G2K: Prefers text message',
  ],
  onClick = () => {},
}) => {
  const R = radius * height
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

      {showStars[0] && <Star1 size={R * 3} color={starColors[0]} />}
      {showStars[1] && <Star2 size={R * 3} color={starColors[1]} />}
      {showStars[2] && <Star3 size={R * 3} color={starColors[2]} />}
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
    console.log({ delayedRefresh })
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

const den = 110
const fOffset = 0.46
const gOffset = 0.37

export const Star2 = ({ size = 50, color = red }) => {
  const f = (n: number): number => (n * size) / den - size * fOffset
  const g = (n: number): number => (n * size) / den - size * gOffset
  const pathCommands = [
    `M${f(49.505)}   ${g(12)}`,
    `L${f(46.4356)}  ${g(19.5648)}`,
    `L${f(40)}       ${g(20.8083)}`,
    `L${f(45.636)}   ${g(25.7824)}`,
    `L${f(44.5545)}  ${g(32)}`,
    `L${f(49.55)}    ${g(29.2021)}`,
    `L${f(55.8416)}  ${g(32)}`,
    `L${f(53.644)}   ${g(24.8497)}`,
    `L${f(60)}       ${g(19.5648)}`,
    `H${f(52.362)}`,
    `L${f(49.505)}   ${g(12)}Z`,
  ].join('')
  return <Path data={pathCommands} fill={color} />
}

export const Star3 = ({ size = 50, color = red }) => {
  const f = (n: number): number => (n * size) / den - size * fOffset
  const g = (n: number): number => (n * size) / den - size * gOffset
  const pathCommands = [
    `M${f(77.923)}  ${g(22.991)}`,
    `L${f(71.306)}  ${g(18.21)}`,
    `L${f(71.6298)} ${g(11.663)}`,
    `L${f(65.4556)} ${g(15.961)}`,
    `L${f(59.6758)} ${g(13.423)}`,
    `L${f(61.2152)} ${g(18.897)}`,
    `L${f(56.9896)} ${g(24.386)}`,
    `L${f(64.4764)} ${g(23.876)}`,
    `L${f(68.0779)} ${g(31.384)}`,
    `L${f(69.8923)} ${g(23.9)}`,
    `L${f(77.923)}  ${g(22.9915)}Z`,
  ].join('')
  return <Path data={pathCommands} fill={color} />
}

export const Star1 = ({ size = 50, color = red }) => {
  const f = (n: number): number => (n * size) / den - size * fOffset
  const g = (n: number): number => (n * size) / den - size * gOffset
  const pathCommands = [
    `M${f(25.3067)} ${g(13.7123)}`,
    `L${f(27.7855)} ${g(21.4906)}`,
    `L${f(23.6336)} ${g(26.5626)}`,
    `L${f(31.1533)} ${g(26.7769)}`,
    `L${f(34.2927)} ${g(32.2531)}`,
    `L${f(36.3088)} ${g(26.936)}`,
    `L${f(42.9694)} ${g(25.0341)}`,
    `L${f(36.6457)} ${g(20.994)}`,
    `L${f(38.2128)} ${g(12.8152)}`,
    `L${f(32.3522)} ${g(17.6912)}`,
    `L${f(25.3067)} ${g(13.7123)}Z`,
  ].join('')
  return <Path data={pathCommands} fill={color} />
}

export default BubbleSVG
