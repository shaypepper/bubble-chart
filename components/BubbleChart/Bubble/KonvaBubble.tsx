import { FC } from 'react'
import { Group, Circle, Text, Path, Rect } from 'react-konva'
import { deepGrey, white } from '../../shared/tokens/colors'
import { bangersFont, interFont } from '../../shared/tokens/fonts'
import { BubbleShape } from '../data/types'
import Hex from '../shapes/Hex'
import { shapePaths, shapeTransform } from '../shapes/Shape'
import { height } from '../tokens'
import { BubbleProps } from './types'

export const KonvaBubble: FC<BubbleProps> = ({
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
  bubbleShape = BubbleShape.HEX,
  onClick = () => {},
}) => {
  const R = radius * height
  const fontSize =
    displayName.length > 13 ? R / 7 : displayName.length > 9 ? R / 2.5 : R / 2
  return (
    <Group
      className={'leaf'}
      x={translation.x}
      y={translation.y}
      onClick={onClick}
    >
      {bubbleShape === BubbleShape.HEX ? (
        <Path
          fill={bubbleFillColor}
          data={Hex.pathCommands}
          scale={{ x: R / 45, y: R / 45 }}
          x={-R * 1.11}
          y={-R * 1.11}
        />
      ) : (
        <Circle
          radius={R}
          fill={bubbleFillColor}
          strokeLinecap="round"
          strokeDashArray={[10, 10]}
          mask="url(#circleMask)"
        />
      )}

      <Text
        text={displayName}
        x={-R}
        y={-R / 4.6 + (R / 2 - fontSize) / 2}
        fontFamily={bangersFont}
        fontSize={fontSize}
        fill={innerTextColor}
        align={'center'}
        width={R * 1.9}
        letterSpacing={-0.000005}
      />

      {shapes?.map(
        (shape, shapeIndex: number) =>
          shape.show && (
            <Path
              data={shapePaths[shape.shape].pathCommands}
              fill={shape.fillColor}
              position={shapeTransform.Konva.position[shapeIndex](R)}
              scale={shapeTransform.Konva.scale(R)}
            />
          )
      )}

      {textLines?.map((t, i) => {
        const x = (-R * (1.6 - i * 0.15)) / 2
        const y = R * 0.12 * (2.5 + i)
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
              fontFamily={interFont}
              fontSize={fontSize}
              text={t}
              fill={innerTextColor}
              letterSpacing={-0.04}
            />
          </>
        )
      })}
    </Group>
  )
}
