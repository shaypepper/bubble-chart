import { useEffect, useMemo, useRef, useState } from 'react'
import { TextPath as TextPathType } from 'konva/types/shapes/TextPath'
import { Group, Circle, TextPath } from 'react-konva'
import { height } from '../tokens'
import { softGrey } from '../../shared/tokens/colors'
import { interFont } from '../../shared/tokens/fonts'

export const KonvaGroupingBubble = ({
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
        fontFamily={interFont}
        rotation={offset}
        text={displayName === 'g: allGroups' ? '' : displayName}
        textBaseline={'alphabetic'}
        kerningFunc={() => 0.01}
      />
    </Group>
  )
}
