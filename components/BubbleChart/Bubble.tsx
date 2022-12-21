import {
  FC,
  ReactEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { TextPath as TextPathType } from 'konva/types/shapes/TextPath'
import { Group, Circle, TextPath, Text, Path, Rect } from 'react-konva'
import { deepGrey, red, softGrey, white } from '../shared/tokens/colors'
import { bangersFont, latoFont } from '../shared/tokens/fonts'
import Pencil from '../shared/icons/Pencil'
import { getStarPath } from './helpers'
import { ConfigPanel } from './VizConfig/VizConfig'
import { height } from './tokens'

const placeHolderGrey = '#c0c0c0'

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
  onClick?: () => void
  stars?: { fillColor: string; show: boolean }[]
  id?: string
  focused?: boolean
}

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

export const BubbleEditSVG: FC<
  BubbleProps & {
    configPanels?: ConfigPanel[]
    starOptions: { use: boolean; color: string }[]
  }
> = ({
  displayName = 'Angelique',
  width = 200,
  bubbleFillColor = 'gainsboro',
  innerTextColor = deepGrey,
  textLines = ['----', '----', '----'],
  generateOnClick = () => () => null,
  starOptions = [],
  configPanels = [],
}) => {
  const R = 50
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={R} cy={R} r={R} fill={bubbleFillColor} />

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

      {[...textLines, null, null, null].slice(0, 3).map((line, index) =>
        textLines[0] ? (
          <>
            <path
              id={`textLine${index}Path`}
              fill="none"
              stroke="none"
              d={`M 0,${R * (1.2 + 0.12 * index)} H100`}
            />
            <text fill={innerTextColor}>
              <textPath
                textAnchor="middle"
                startOffset={'50%'}
                href={`#textLine${index}Path`}
                style={{
                  fontFamily: latoFont,
                  fontSize: '4px',
                  fontWeight: 300,
                }}
              >
                {line}
              </textPath>
            </text>
          </>
        ) : (
          <rect
            style={{ fill: placeHolderGrey }}
            fill={placeHolderGrey}
            height="3"
            width={55}
            y={57.5 + index * 5.8}
            x={20}
          ></rect>
        )
      )}

      {starOptions.map((star, starIndex) => (
        <path
          key={`star${starIndex}`}
          d={getStarPath({ whichStar: starIndex + 1 })}
          fill={star.use ? star.color : placeHolderGrey}
        />
      ))}

      {configPanels.map((panel) => {
        const {
          name: panelName,
          translate: { x, y },
        } = panel
        return (
          <Pencil
            key={panelName}
            size={7}
            transform={`translate(${x} ${y})`}
            onClick={generateOnClick(panel)}
          />
        )
      })}
    </svg>
  )
}

export const BubbleSVG: FC<BubbleProps> = ({
  displayName = 'Angelique',
  bubbleFillColor = 'gainsboro',
  innerTextColor = deepGrey,
  textLines = ['----', '----', '----'],
  stars = [],
  radius = 1,
}) => {
  const R = radius
  return (
    <g
      style={{
        fontFamily: latoFont,
        fontSize: R / 10,
        fontWeight: 300,
      }}
    >
      <circle r={R} fill={bubbleFillColor} />

      <path
        id="namePath"
        fill="none"
        stroke="none"
        d={`M ${-R}, ${R * 0.1} H${R}`}
      />
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

      {textLines.map((line, lineIndex) => (
        <>
          <path
            id={`textLine${lineIndex}`}
            fill="none"
            stroke="none"
            d={`M ${-R}, ${R * (0.15 * lineIndex + 0.3)} H${R}`}
          />
          <text fill={innerTextColor}>
            <textPath
              textAnchor="middle"
              startOffset={'50%'}
              href={`#textLine${lineIndex}`}
              fill={innerTextColor}
            >
              {line}
            </textPath>
          </text>
        </>
      ))}

      {stars.map(
        (star, starIndex) =>
          star.show && (
            <path
              transform={`translate(${-R * 1.1} ${-R}) scale(${R / 45})`}
              d={getStarPath({ whichStar: starIndex + 1 })}
              fill={star.fillColor}
            />
          )
      )}
    </g>
  )
}

// eslint-disable-next-line import/no-unused-modules
export const GroupingBubbleSVG: FC<
  BubbleProps & { depth: number; groupSize: number }
> = ({
  displayName = 'Shay Culpepper',
  bubbleFillColor = '#6666661d',
  innerTextColor = white,
  radius = 5,
  groupSize = 10,
}) => {
  const id = Math.random()
  return (
    <>
      <circle r={radius} fill={bubbleFillColor} />
      <path
        id={`displayNamePath${id}`}
        fill="none"
        stroke="none"
        d={`M ${0},${radius} a ${radius},${radius} 0 1,1 0,${
          -2 * radius
        } a ${radius},${radius} 0 1,1 0,${2 * radius}`}
      />

      <text fill={innerTextColor}>
        <textPath
          textAnchor="middle"
          startOffset={'50%'}
          href={`#displayNamePath${id}`}
          style={{
            fontFamily: 'Lato',
            fontWeight: 900,
            fontSize: radius / (1.5 * Math.sqrt(groupSize)),
          }}
          fill={'#999'}
        >
          {displayName}
        </textPath>
      </text>
    </>
  )
}

export const BubbleKonva: FC<BubbleProps> = ({
  displayName = 'Angelique',
  radius = 50,
  translation = { x: 0, y: 0 },
  bubbleFillColor = white,
  innerTextColor = deepGrey,
  stars,
  textLines = [
    'Steward: Sarah Duncan',
    'Assessment: 1. Doing Outreach',
    'G2K: Prefers text message',
  ],
  onClick = () => {},
  focused = false,
}) => {
  const R = radius * height
  const [hovered, setHovered] = useState(false)

  return (
    <Group
      className={'leaf'}
      x={translation.x}
      y={translation.y}
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
      opacity={hovered && !focused ? 0.9 : 1}
      onClick={onClick}
      onTap={onClick}
    >
      <Circle
        radius={R}
        fill={bubbleFillColor}
        strokeLinecap="round"
        strokeDashArray={[10, 10]}
        mask="url(#circleMask)"
      />

      <Star
        size={R * 3}
        color={stars?.[0]?.show ? stars[0].fillColor : ''}
        whichStar={1}
      />

      <Star
        size={R * 3}
        color={stars?.[1]?.show ? stars[0].fillColor : ''}
        whichStar={2}
      />

      <Star
        size={R * 3}
        color={stars?.[2]?.show ? stars[0].fillColor : ''}
        whichStar={3}
      />

      <Text
        text={displayName}
        x={-R}
        y={-R / 3.2}
        fontFamily={bangersFont}
        fontSize={
          displayName.length > 13
            ? R / 9
            : displayName.length > 8
            ? R / 3
            : R / 3
        }
        fill={innerTextColor}
        align={'center'}
        width={R * 2}
      />

      {focused &&
        textLines?.slice(0, 1).map((t, i) => {
          const textSpaceWidth = R * (1.6 - i * 0.15)
          const x = -textSpaceWidth / 2
          const y = R * (0.1 + 0.15 * i)
          const fontSize = R * 0.08

          return (
            <>
              <Rect
                x={x}
                width={textSpaceWidth}
                y={y}
                height={fontSize}
                fill={bubbleFillColor}
              />
              <Text
                key={t}
                x={x}
                y={y}
                align={'center'}
                width={textSpaceWidth}
                fontFamily={latoFont}
                fontSize={fontSize}
                text={t + t + t + t + t + t + t}
                fill={innerTextColor}
              />
            </>
          )
        })}
    </Group>
  )
}

export const GroupingBubble = ({
  displayName = 'Shay Culpepper',
  radius = 50,
  translation = { x: 0, y: 0 },
  onClick = () => {},
  focused = false,
}) => {
  const [hovered, setHovered] = useState(false)
  const [delayedRefresh, setDelayedRefresh] = useState(false)
  const R = radius * height
  const textR = R
  const textRef = useRef<TextPathType>(null)

  const offset = useMemo(() => {
    if (delayedRefresh) {
      return (
        180 *
        (1 -
          ((textRef?.current?.getTextWidth() || 0) + displayName.length * 0.1) /
            (Math.PI * 2 * textR))
      )
    }
  }, [delayedRefresh, textR, displayName.length])

  useEffect(() => {
    const delay = setTimeout(() => {
      setDelayedRefresh(true)
    }, 2000)
    return () => clearTimeout(delay)
  }, [])

  return (
    <Group
      className={'leaf'}
      x={translation.x}
      y={translation.y}
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
      opacity={hovered || focused ? 1 : 0.8}
      onClick={onClick}
      onTap={onClick}
    >
      <Circle
        radius={R}
        fill={'#FFFFFF0F'}
        strokeLinecap="round"
        strokeDashArray={[10, 10]}
        mask="url(#circleMask)"
        onClick={onClick}
        onTap={onClick}
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
  return (
    <Path
      data={pathCommands}
      fill={color}
      stroke={color ? '' : 'gainsboro'}
      strokeWidth={0.4}
    />
  )
}

export default BubbleSVG
