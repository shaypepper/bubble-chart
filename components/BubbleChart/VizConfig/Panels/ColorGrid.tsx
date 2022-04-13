import { dispatch } from 'd3'
import { css } from 'pretty-lights'
import { FC, ReactEventHandler } from 'react'
import {
  blue,
  green,
  white,
  colors,
  deepGrey,
} from '../../../shared/tokens/colors'
import { pxToRem } from '../../../shared/tokens/spacing'
import { MiniBubbleSVG } from '../../Bubble'
import { FormatAction } from '../../data/dataFormattingReducer'

const gridContainerClass = css`
  display: grid;
  grid-template-columns: repeat(6, max-content);
  grid-gap: ${pxToRem(2)};
`

const disabledState = css`
  opacity: 0.4;
`

const colorGridOptions = [
  Object.values(colors)
    .map((d) => d.default)
    .slice(1, 7),
  ...Object.values(colors).map((d) => d.gradient),
]

const ColorGrid: FC<{
  generateOnClick: (color: string, textColor: string) => () => void
  noText?: boolean
  disabled?: boolean
}> = ({ generateOnClick, noText = false, disabled = false }) => {
  return (
    <div className={gridContainerClass}>
      {colorGridOptions.map((colorList) => {
        return colorList.map((color, index) => {
          const textColor = index < 3 ? deepGrey : 'white'
          return (
            <MiniBubbleSVG
              key={color}
              fillColor={color}
              height={38}
              textColor={noText ? 'transparent' : textColor}
              onClick={disabled ? () => {} : generateOnClick(color, textColor)}
              className={disabled ? disabledState : ''}
            />
          )
        })
      })}
    </div>
  )
}

export default ColorGrid
