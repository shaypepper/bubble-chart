import { FC } from 'react'
import { FormatColorFill } from '@mui/icons-material'
import Pencil from '../../shared/icons/Pencil'
import { deepGrey } from '../../shared/tokens/colors'
import { interFont } from '../../shared/tokens/fonts'
import { BubbleShape, ShapeOptions } from '../data/types'
import Hex from '../shapes/Hex'
import { shapePaths, shapeTransform } from '../shapes/Shape'
import { ConfigPanel } from '../VizConfig/VizConfig'
import { BubbleProps } from './types'

const placeHolderGrey = '#c0c0c0'

export const EditBubble: FC<
  BubbleProps & {
    configPanels?: ConfigPanel[]
    shapeOptions: ShapeOptions[]
    setBubbleShape: (b: BubbleShape) => void
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
  setBubbleShape = (s: BubbleShape) => s && null,
  bubbleShape = BubbleShape.CIRCLE,
}) => {
  const R = 50
  return (
    <svg
      width={width}
      height={width}
      viewBox="-5 -5 110 110"
      xmlns="http://www.w3.org/2000/svg"
    >
      {bubbleShape === BubbleShape.CIRCLE ? (
        <circle cx={R} cy={R} r={R} fill={bubbleFillColor} />
      ) : (
        <path
          d={Hex.pathCommands}
          fill={bubbleFillColor}
          transform={`scale(1.1) translate(-5 -5)`}
        />
      )}

      <g
        transform="translate(85 0) scale(0.1)"
        onClick={generateOnClick({
          name: 'Fill color',
          index: 0,
          type: 'fill',
          translate: { x: 5, y: -5 },
        })}
      >
        <rect height="100" width="100" fill="transparent" />
        <FormatColorFill style={{ height: 20 }} />
      </g>

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
              d={`M 0,${R * (1.2 + 0.14 * index)} H100`}
            />
            <text fill={innerTextColor}>
              <textPath
                textAnchor="middle"
                startOffset={'50%'}
                href={`#textLine${index}Path`}
                style={{
                  fontFamily: interFont,
                  fontSize: '5px',
                  fontWeight: 300,
                  letterSpacing: -0.03,
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
      <g transform="translate(50 42.5) scale(1.75)">
        {shapeOptions.map((shapeOption, shapeOptionIndex) => (
          <path
            key={`shape${shapeOptionIndex} - ${shapeOption.value}`}
            d={shapePaths[shapeOption.shape]?.pathCommands}
            transform={shapeTransform.SVG[shapeOptionIndex](R / 2)}
            fill={shapeOption.use ? shapeOption.color : placeHolderGrey}
          />
        ))}
      </g>
      {configPanels.map((panel) => {
        const {
          name: panelName,
          translate: { x, y },
        } = panel
        return (
          <Pencil
            key={panelName}
            size={7}
            transform={`translate(${x} ${y - 5})`}
            onClick={generateOnClick(panel)}
          />
        )
      })}

      {bubbleShape === BubbleShape.CIRCLE ? (
        <path
          d={Hex.pathCommands}
          transform="scale(0.1)"
          onClick={() => setBubbleShape(BubbleShape.HEX)}
        />
      ) : (
        <circle
          r={5}
          transform="translate(5 5)"
          onClick={() => setBubbleShape(BubbleShape.CIRCLE)}
        />
      )}
    </svg>
  )
}
