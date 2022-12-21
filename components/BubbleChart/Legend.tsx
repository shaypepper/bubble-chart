import { FC, useContext } from 'react'
import { css } from 'pretty-lights'
import { pxToRem } from '../shared/tokens/spacing'
import { MiniBubbleSVG } from './Bubble'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { getStarPath, getStarViewbox } from './helpers'
import { ColorMap } from './data/types'

const legendList = css`
  list-style-type: none;
  padding: 0px;
  font-size: ${pxToRem(12)};
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.85);
  * {
    background: none;
    overflow-y: none;
  }
  > li {
    svg {
      margin-right: ${pxToRem(4)};
    }
    font-weight: 900;
  }

  ul {
    margin: 0 0 ${pxToRem(12)} 0;
    li {
      font-weight: 400;
      font-size: ${pxToRem(10)};
      text-transform: none;
    }
  }
`

const containerClass = css`
  position: absolute;
  right: 20px;
  top: 20px;
  bottom: 0;
  z-index: 1;
  background: none;
  overflow-y: scroll;
  max-height: 75vh;
`

const Legend: FC = () => {
  const {
    chartOptions: { colors, stars },
  } = useContext(WorkerDataContext)
  const currentColumnColorMap: ColorMap =
    colors.colorMap[colors.currentColumn] || {}

  const fillColorList = Object.entries(currentColumnColorMap)
  return (
    <div className={containerClass}>
      <ul className={legendList}>
        {fillColorList.length > 0 && (
          <li>
            {colors.currentColumn || ''}
            <ul className={legendList}>
              {fillColorList.map(([value, { fillColor, textColor }]) => {
                return (
                  <li key={value}>
                    <MiniBubbleSVG
                      fillColor={fillColor}
                      textColor={textColor}
                      height={15}
                    />
                    {value}
                  </li>
                )
              })}
            </ul>
          </li>
        )}

        {stars.map(
          (star, index) =>
            star.use &&
            star.column && (
              <li key={`${star.column} - ${index} - ${star.value}`}>
                {star.column}
                <ul className={legendList}>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox={getStarViewbox({ whichStar: index + 1 })}
                      height={14}
                    >
                      <path
                        d={getStarPath({ whichStar: index + 1 })}
                        fill={star.color}
                      />
                    </svg>
                    {star.value}
                  </li>
                </ul>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

export default Legend
