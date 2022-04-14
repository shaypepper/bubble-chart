import { KonvaEventObject } from 'konva/types/Node'
import { TextPath as TextPathType } from 'konva/types/shapes/TextPath'
import { css } from 'pretty-lights'
import {
  FC,
  ReactEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Group, Circle, TextPath, Text, Path, Rect } from 'react-konva'
import { height } from './tokens'
import {
  blue,
  deepGrey,
  green,
  orange,
  purple,
  red,
  softGrey,
  white,
  yellow,
} from '../shared/tokens/colors'
import { bangersFont, bungeeFont, latoFont } from '../shared/tokens/fonts'
import { getStarPath } from './helpers'
import Pencil from '../shared/icons/Pencil'
import { ConfigPanel } from './VizConfig/VizConfig'
import { string } from 'prop-types'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const placeHolderGrey = '#202020'

type BubbleProps = {
  displayName: string
  fullName?: string
  radius?: number
  bubbleBorderColor?: string
  showBubbleBorder?: boolean
  bubbleFillColor?: string
  innerTextColor?: string
  showStars?: boolean[]
  starColors?: string[]
  translation?: {
    x: number
    y: number
  }
  textLines?: string[]
  editMode?: boolean
  width?: number | string
  generateOnClick?: (s: ConfigPanel) => () => void
}

const textClass = css`
  font-family: ${latoFont};
  font-size: 4px;
  font-weight: 300;
`

export const MiniBubbleSVG: FC<{
  fillColor?: string
  textColor?: string
  onClick?: ReactEventHandler
  height?: number
  className?: string
}> = ({
  fillColor = deepGrey,
  textColor = white,
  onClick = () => {},
  height = 20,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 10 10"
      height={height}
      role="button"
      className={className}
      onClick={onClick}
    >
      <circle fill={fillColor} r="5" transform="translate(5 5)" />
      <text
        fontFamily={bangersFont}
        fill={textColor}
        fontSize={3}
        transform="translate(2.8 6.2)"
      >
        text
      </text>
    </svg>
  )
}

const BubbleSVG: FC<BubbleProps & { configPanels?: ConfigPanel[] }> = ({
  editMode = false,
  displayName = 'Angelique',
  fullName = 'Shay Culpepper',
  width = 200,
  bubbleFillColor = deepGrey,
  innerTextColor = white,
  showStars = [false, false, false],
  starColors = [blue, red, yellow],
  textLines = [
    'Steward: Sarah Duncan',
    'Assessment: 1. Doing Outreach',
    'G2K: Prefers text message',
  ],
  generateOnClick = () => () => null,
  configPanels = [],
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

      {textLines[0] ? (
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
      ) : editMode ? (
        <rect
          fill={placeHolderGrey}
          height="3"
          strokeLinecap="round"
          width={55}
          y={57}
          x={20}
        ></rect>
      ) : null}
      {textLines[1] ? (
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
      ) : editMode ? (
        <rect
          fill={placeHolderGrey}
          height="3"
          strokeLinecap="round"
          width={55}
          y={63}
          x={20}
        ></rect>
      ) : null}
      {textLines[2] ? (
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
      ) : editMode ? (
        <rect
          fill={placeHolderGrey}
          height="3"
          strokeLinecap="round"
          width={55}
          y={69}
          x={20}
        ></rect>
      ) : null}

      {editMode && (
        <path d={getStarPath({ whichStar: 1 })} fill={placeHolderGrey} />
      )}
      {showStars[0] && (
        <path d={getStarPath({ whichStar: 1 })} fill={starColors[0]} />
      )}
      {editMode && <path d={getStarPath({ whichStar: 2 })} fill={'#202020'} />}
      {showStars[1] && (
        <path d={getStarPath({ whichStar: 2 })} fill={starColors[1]} />
      )}
      {editMode && <path d={getStarPath({ whichStar: 3 })} fill={'#202020'} />}
      {showStars[2] && (
        <path d={getStarPath({ whichStar: 3 })} fill={starColors[2]} />
      )}

      {editMode && (
        <>
          {' '}
          {configPanels.map((panel) => {
            const {
              name: panelName,
              translate: { x, y },
            } = panel
            return (
              <Pencil
                key={panelName}
                label={panelName}
                size={7}
                transform={`translate(${x} ${y})`}
                fill={innerTextColor}
                onClick={generateOnClick(panel)}
              />
            )
          })}
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
  BubbleProps & {
    onClick: (evt: KonvaEventObject<MouseEvent>) => void
    stars: { fillColor: string; show: boolean }[]
  }
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
  stars,
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
        fill={bubbleFillColor}
        strokeLinecap="round"
        strokeDashArray={[10, 10]}
        mask="url(#circleMask)"
        onClick={onClick}
      />

      <Text
        text={displayName}
        x={-R}
        y={-R / 4.6}
        fontFamily={bangersFont}
        fontSize={
          displayName.length > 13
            ? R / 7
            : displayName.length > 8
            ? R / 3
            : R / 2
        }
        fill={innerTextColor}
        align={'center'}
        width={R * 2}
      />

      {stars?.[0]?.show && (
        <Star size={R * 3} color={starColors[0]} whichStar={1} />
      )}
      {stars?.[1]?.show && (
        <Star size={R * 3} color={starColors[1]} whichStar={2} />
      )}
      {stars?.[2]?.show && (
        <Star size={R * 3} color={starColors[2]} whichStar={3} />
      )}

      {textLines?.map((t, i) => (
        <>
          <Rect
            x={(-R * (1.7 - i * 0.15)) / 2}
            width={R * (1.7 - i * 0.15)}
            y={R * 0.25 + i}
            height={R * 0.11}
            fill={bubbleFillColor}
          />
          <Text
            key={t}
            x={-R}
            y={R * 0.25 + i}
            align={'center'}
            width={R * 2}
            fontFamily={latoFont}
            fontSize={R * 0.11}
            text={t}
            fill={innerTextColor}
          />
        </>
      ))}
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
        fill={delayedRefresh ? softGrey : 'transparent'}
        fontSize={R / 10}
        fontFamily={latoFont}
        rotation={offset}
        text={displayName === 'allGroups' ? '' : displayName}
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
  whichStar: number
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
