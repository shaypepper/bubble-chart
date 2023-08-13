import { FC, ReactEventHandler } from 'react'
import { deepGrey, white } from '../../shared/tokens/colors'
import { bangersFont } from '../../shared/tokens/fonts'

export const MiniBubbleG: FC<{
  fillColor?: string
  textColor?: string
  fontSize?: number
  r?: number
  highlight?: boolean
}> = ({
  fillColor = deepGrey,
  textColor = white,
  fontSize = 3,
  r = 5,
  highlight = false,
}) => {
  return (
    <g>
      <circle
        fill={fillColor}
        r={highlight ? r - 0.5 : r}
        transform={`translate(${r} ${r})`}
        stroke={highlight ? 'black' : ''}
        strokeWidth={1}
      />
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
  highlight?: boolean
}> = ({
  fillColor = deepGrey,
  textColor = white,
  onClick = () => {},
  height = 20,
  className = '',
  highlight = false,
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
      <MiniBubbleG
        fillColor={fillColor}
        textColor={textColor}
        fontSize={3}
        highlight={highlight}
      />
    </svg>
  )
}
