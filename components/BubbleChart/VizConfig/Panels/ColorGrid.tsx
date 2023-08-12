import { FC } from 'react'
import { css } from '@emotion/css'
import { colors, deepGrey } from '../../../shared/tokens/colors'
import { pxToRem } from '../../../shared/tokens/spacing'
import { MiniBubbleSVG } from '../../Bubble/MiniBubble'

const gridContainerClass = css`
  display: flex;
  max-height: ${pxToRem(130)};
  flex-direction: column;
  flex-wrap: wrap;
  grid-gap: ${pxToRem(2)};
  align-content: center;
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
              height={20}
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
