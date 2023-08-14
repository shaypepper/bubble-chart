import { FC } from 'react'
import { white } from '../../shared/tokens/colors'
import { BubbleProps } from './types'

// eslint-disable-next-line import/no-unused-modules
export const SVGGroupingBubble: FC<
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
