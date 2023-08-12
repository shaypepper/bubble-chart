import { FC } from 'react'
import { css } from '@emotion/css'
import { pxToRem } from '../../../shared/tokens/spacing'
import { shapePaths } from '../../shapes/Shape'

const gridContainerClass = css`
  display: flex;
  max-height: ${pxToRem(130)};
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: ${pxToRem(2)};
  align-content: center;
`

const ShapeGrid: FC<{
  generateOnClick: (shape: string) => () => void
  fillColor: string
}> = ({ generateOnClick, fillColor }) => {
  return (
    <div className={gridContainerClass}>
      {Object.entries(shapePaths).map(([shape, ShapeComponent]) => (
        <ShapeComponent
          key={`${shape}`}
          fillColor={fillColor || 'black'}
          onClick={generateOnClick(shape)}
          height={20}
        />
      ))}
    </div>
  )
}

export default ShapeGrid
