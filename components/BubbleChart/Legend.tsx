import { FC, useContext } from 'react'
import { css } from 'pretty-lights'
import { pxToRem } from '../shared/tokens/spacing'
import { MiniBubbleSVG } from './Bubble'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { getStarPath, getStarViewbox } from './helpers'
import { ColorMap } from './data/types'

const legendList = css`
  list-style-type: none;
  font-size: ${pxToRem(12)};
  padding: 0;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.85);
  * {
    background: none;
    overflow-y: none;
  }
  > li {
    svg {
      margin-right: ${pxToRem(4)};
      width: 10px;
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
  right: 10px;
  top: 10px;
  z-index: 1;
  background: none;
  overflow-y: scroll;
  max-height: 75vh;

  > ul {
    padding: 10px;
  }
`

const Legend: FC = () => {
  const {
    chartOptions: { colors, stars },
  } = useContext(WorkerDataContext)
  const currentColumnColorMap: ColorMap =
    colors.colorMap[colors.currentColumn] || {}
  const fillColorList = Object.entries(currentColumnColorMap)

  const mappedColumnList: { [a: string]: any[] } = {}

  fillColorList.forEach(([value, { fillColor, textColor }]) => {
    if (colors.currentColumn in mappedColumnList) {
      mappedColumnList[colors.currentColumn].push({
        fillColor,
        textColor,
        shape: 'bubble',
        value,
      })
    } else {
      mappedColumnList[colors.currentColumn] = [
        { fillColor, textColor, shape: 'bubble', value },
      ]
    }
  })

  stars.forEach((star, index) => {
    if (star.use && star.column) {
      if (star.column in mappedColumnList) {
        mappedColumnList[star.column].push(star)
      } else {
        mappedColumnList[star.column] = [star]
      }
    }
  })

  console.log(mappedColumnList)

  return (
    <div className={containerClass}>
      <ul className={legendList}>
        {Object.entries(mappedColumnList).map(([legendKey, valueList]) => (
          <li key={legendKey}>
            {legendKey || ''}
            <ul className={legendList}>
              {valueList.map((v, index) => {
                console.log(v)
                if (v?.shape === 'bubble') {
                  return (
                    <li key={v.value}>
                      <MiniBubbleSVG
                        fillColor={v.fillColor}
                        textColor={v.textColor}
                        height={15}
                      />
                      {v.value}
                    </li>
                  )
                } else {
                  return (
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={getStarViewbox({ whichStar: index + 1 })}
                        height={14}
                      >
                        <path
                          d={getStarPath({ whichStar: index + 1 })}
                          fill={v.color}
                        />
                      </svg>
                      {v.value}
                    </li>
                  )
                }
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Legend
