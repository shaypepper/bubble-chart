import { FC } from 'react'
import { deepGrey } from '../../shared/tokens/colors'
import { latoFont } from '../../shared/tokens/fonts'
import { BubbleShape } from '../data/types'
import Hex from '../shapes/Hex'
import { shapePaths, shapeTransform } from '../shapes/Shape'
import { BubbleProps } from './types'

export const SVGBubble: FC<BubbleProps> = ({
  displayName = 'Angelique',
  bubbleFillColor = 'gainsboro',
  innerTextColor = deepGrey,
  textLines = ['----', '----', '----'],
  shapes = [],
  radius = 1,
  bubbleShape = BubbleShape.CIRCLE,
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
      {bubbleShape === BubbleShape.CIRCLE ? (
        <circle r={R} fill={bubbleFillColor} />
      ) : (
        <path
          d={Hex.pathCommands}
          transform={`scale(${R / 45}) translate(-50 -50)`}
          fill={bubbleFillColor || 'red'}
        />
      )}

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
              d={shapePaths[shape.shape].pathCommands}
              fill={shape.fillColor}
            />
          )
      )}
    </g>
  )
}
