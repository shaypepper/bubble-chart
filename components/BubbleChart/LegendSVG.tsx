import { FC } from 'react'
import { ChartOptions, ColorMap } from './data/types'
import { MiniBubbleG } from './Bubble'
import { getStarPath } from './helpers'

const LegendSVG: FC<{ textSize: number; chartOptions: ChartOptions }> = ({
  textSize,
  chartOptions,
}) => {
  const { colors, stars } = chartOptions
  const currentColumnColorMap: ColorMap =
    colors.colorMap[colors.currentColumn] || {}
  const fillColorList = Object.entries(currentColumnColorMap)

  return (
    <>
      <g
        style={{
          transform: 'translate(0.01px, 0.02px)',
          fontFamily: 'Lato',
          fontSize: textSize,
        }}
      >
        {fillColorList.length || stars.find((s) => s.use) ? (
          <text style={{ fontSize: textSize * 1.5, fontWeight: 'bold' }}>
            Legend
          </text>
        ) : null}
        <g
          style={{
            transform: `translateY(${textSize * 1.4}px)`,
          }}
        >
          {stars.map(
            (star, index) =>
              star.use &&
              star.column && (
                <g
                  style={{
                    transform: `translateY(${index * textSize * 1.7}px)`,
                  }}
                  key={`${star.value}`}
                >
                  <path
                    d={getStarPath({
                      whichStar: index + 1,
                      f: (n) =>
                        n * textSize * 0.08 -
                        textSize * 1.3 * (index + 1) -
                        textSize * 0.6,
                      g: (n) => n * textSize * 0.08 - textSize * 1.25,
                    })}
                    fill={star.color}
                  />
                  <text
                    alignmentBaseline="hanging"
                    style={{
                      transform: `translate(${textSize * 2}px, ${
                        textSize * 0.2
                      }px)`,
                      fontSize: textSize,
                      fontWeight: 400,
                    }}
                  >
                    {star.column}: {star.value}
                  </text>
                </g>
              )
          )}
        </g>
        {fillColorList.length > 0 && (
          <g
            style={{
              transform: `translateY(${textSize * 1.25 + 0.045}px)`,
            }}
          >
            <text style={{ textTransform: 'uppercase' }}>
              {colors.currentColumn}
            </text>
            {fillColorList
              .sort(([value], [prevValue]) => (value > prevValue ? 1 : -1))
              .map(([value, { fillColor, textColor }], i) => {
                return (
                  <g
                    key={value}
                    style={{
                      transform: `translateY(${i * textSize * 1.7 + 0.005}px)`,
                    }}
                  >
                    <MiniBubbleG
                      fillColor={fillColor}
                      textColor={textColor}
                      fontSize={textSize * 0.5}
                      r={textSize * 0.8}
                    />
                    <text
                      alignmentBaseline="hanging"
                      style={{
                        transform: `translate(${textSize * 2}px, ${
                          textSize * 0.4
                        }px)`,
                        fontSize: textSize,
                        fontWeight: 400,
                      }}
                    >
                      {' '}
                      {value}
                    </text>
                  </g>
                )
              })}
          </g>
        )}
      </g>
    </>
  )
}

export default LegendSVG
