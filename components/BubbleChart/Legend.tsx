import { FC, useContext } from 'react'
import { css } from 'pretty-lights'
import { pxToRem } from '../shared/tokens/spacing'
import { MiniBubbleSVG } from './Bubble'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { getStarPath, getStarViewbox } from './helpers'
import { ColorMap, Column, StarOptions } from './data/types'

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

  const reducedStars = stars.reduce<
    { column: Column; values: StarOptions[] }[]
  >((memo, currentStar: StarOptions, index) => {
    if (!currentStar.use) return memo

    let columnFound = false
    memo.forEach((s, memoIndex) => {
      if (currentStar.column === s.column) {
        memo[memoIndex] = {
          column: s.column,
          values: [...s.values, currentStar],
        }
        columnFound = true
      }
    })

    if (!columnFound) {
      memo.push({
        column: currentStar.column,
        values: [currentStar],
      })
    }
    return memo
  }, [])

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

        {reducedStars.map(({ column, values }, index) => (
          <li key={`${column}`}>
            {column}
            <ul className={legendList}>
              {values.map((s) => (
                <li key={`${s.value}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={getStarViewbox({ whichStar: index + 1 })}
                    height={14}
                  >
                    <path
                      d={getStarPath({ whichStar: index + 1 })}
                      fill={s.color}
                    />
                  </svg>
                  {s.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Legend
