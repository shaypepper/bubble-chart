import { FC, useContext } from 'react'
import { css } from 'pretty-lights'
import { pxToRem } from '../shared/tokens/spacing'
import { MiniBubbleSVG } from './Bubble'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { blankValue, ColorMap, Column, ShapeOptions } from './data/types'
import { shapePaths } from './shapes/Shape'

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
  left: 20px;
  top: 20px;
  bottom: 0;
  z-index: 1;
  background: none;
  overflow-y: scroll;
  max-height: 75vh;
`

const Legend: FC = () => {
  const {
    chartOptions: { colors, shapes },
  } = useContext(WorkerDataContext)
  const currentColumnColorMap: ColorMap =
    colors.colorMap[colors.currentColumn] || {}

  const fillColorList = Object.entries(currentColumnColorMap)

  const reducedShapes = shapes.reduce<
    { column: Column; values: ShapeOptions[] }[]
  >((memo, currentShape: ShapeOptions, index) => {
    if (!currentShape.use) return memo

    let columnFound = false
    memo.forEach((s, memoIndex) => {
      if (currentShape.column === s.column) {
        memo[memoIndex] = {
          column: s.column,
          values: [...s.values, currentShape],
        }
        columnFound = true
      }
    })

    if (!columnFound) {
      memo.push({
        column: currentShape.column,
        values: [currentShape],
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
              {fillColorList
                .sort(([value], [prevValue]) => (value > prevValue ? 1 : -1))
                .map(([value, { fillColor, textColor }], i) => {
                  return (
                    <li key={`${value} - i`}>
                      <MiniBubbleSVG
                        fillColor={fillColor}
                        textColor={textColor}
                        height={15}
                      />
                      {value || blankValue}
                    </li>
                  )
                })}
            </ul>
          </li>
        )}

        {reducedShapes.map(({ column, values }, index) => (
          <li key={`${column}`}>
            {column}
            <ul className={legendList}>
              {values.map((s) => {
                const ShapeComponent = shapePaths[s.shape]
                return (
                  <li key={`${s.value}`}>
                    <ShapeComponent height={14} fillColor={s.color} />
                    {s.value}
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Legend
