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
import { getShapePath } from './helpers'
import { ConfigPanel } from './VizConfig/VizConfig'
import { height } from './tokens'
import { getSplatPathCommands } from './shapes/Splat'
import { shapeTransform } from './shapes/Shape'

const placeHolderGrey = '#c0c0c0'

type BubbleProps = {
  displayName: string
  radius?: number
  bubbleFillColor?: string
  innerTextColor?: string
  translation?: {
    x: number
    y: number
  }
  textLines?: string[]
  editMode?: boolean
  width?: number | string
  generateOnClick?: (s: ConfigPanel) => () => void
  onClick?: () => void
  shapes?: { fillColor: string; show: boolean }[]
  id?: string
}

export const MiniBubbleG: FC<{
  fillColor?: string
  textColor?: string
  fontSize?: number
  r?: number
}> = ({ fillColor = deepGrey, textColor = white, fontSize = 3, r = 5 }) => {
  return (
    <g>
      <circle fill={fillColor} r={r} transform={`translate(${r} ${r})`} />
      <text
        fontFamily={bangersFont}
        fill={textColor}
        fontSize={fontSize}
        transform={`translate(${0.56 * r} ${1.24 * r})`}
      >
        text
      </text>
    </g>
  )
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
      x="0"
      viewBox="0 0 10 10"
      height={height}
      role="button"
      className={className}
      onClick={onClick}
    >
      <MiniBubbleG fillColor={fillColor} textColor={textColor} fontSize={3} />
    </svg>
  )
}

export const BubbleEditSVG: FC<
  BubbleProps & {
    configPanels?: ConfigPanel[]
    shapeOptions: { use: boolean; color: string }[]
  }
> = ({
  displayName = 'Angelique',
  width = 200,
  bubbleFillColor = 'gainsboro',
  innerTextColor = deepGrey,
  textLines = ['----', '----', '----'],
  generateOnClick = () => () => null,
  shapeOptions = [],
  configPanels = [],
}) => {
  const R = 50
  console.log(shapeOptions)
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

      {shapeOptions.map((shape, shapeIndex) => (
        <path
          key={`shape${shapeIndex}`}
          d={getShapePath({ whichShape: shapeIndex + 1 })}
          fill={shape.use ? shape.color : placeHolderGrey}
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
  shapes = [],
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

      {shapes.map(
        (shape, shapeIndex: number) =>
          shape.show && (
            <path
              transform={shapeTransform.SVG[shapeIndex]?.(R)}
              d={getSplatPathCommands({})}
              fill={shape.fillColor}
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
            fontWeight: 300,
            fontSize: radius / 8,
          }}
          fill={'#333'}
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
  shapes,
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

      {shapes?.map(
        (shape, shapeIndex: number) =>
          shape.show && (
            <Path
              data={getSplatPathCommands({})}
              fill={shape.fillColor}
              position={shapeTransform.Konva.position[shapeIndex](R)}
              scale={shapeTransform.Konva.scale(R)}
            />
          )
      )}

      {textLines?.map((t, i) => {
        const x = (-R * (1.6 - i * 0.15)) / 2
        const y = R * 0.15 * (2.5 + i)
        const fontSize = R * 0.09
        const rectangleWidth = R * (1.6 - i * 0.15)
        return (
          <>
            <Rect
              x={x}
              width={rectangleWidth}
              y={y}
              height={fontSize}
              fill={bubbleFillColor}
            />
            <Text
              key={t}
              x={-R}
              y={y}
              align={'center'}
              width={R * 2}
              fontFamily={latoFont}
              fontSize={fontSize}
              text={t}
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
}) => {
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
    <Group className={'leaf'} x={translation.x} y={translation.y}>
      <Circle
        radius={R}
        fill={'#0000000B'}
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

const Shape = ({
  size = 50,
  color = red,
  whichShape,
}: {
  size: number
  whichShape: number
  color: string
}) => {
  const pathCommands = getShapePath({
    f: getF(size),
    g: getG(size),
    whichShape,
  })
  return <Path data={pathCommands} fill={color} />
}

export default BubbleSVG
