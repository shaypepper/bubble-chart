import { FC } from 'react'
import { ChartOptions, ColorMap } from './data/types'
import { MiniBubbleG } from './Bubble'
import { shapePaths } from './shapes/Shape'

const LegendSVG: FC<{ textSize: number; chartOptions: ChartOptions }> = ({
  textSize,
  chartOptions,
}) => {
  const { colors, shapes } = chartOptions
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
        {fillColorList.length || shapes.find((s) => s.use) ? (
          <text style={{ fontSize: textSize * 1.5, fontWeight: 'bold' }}>
            Legend
          </text>
        ) : null}
        <g
          style={{
            transform: `translateY(${textSize * 1.4}px)`,
          }}
        >
          {shapes.map(
            (shape, index) =>
              shape.use &&
              shape.column && (
                <g
                  style={{
                    transform: `translateY(${index * textSize * 1.7}px)`,
                  }}
                  key={`${shape.value}`}
                >
                  <path
                    d={shapePaths[shape.shape].pathCommands}
                    transform={`scale(0.0001)`}
                    fill={shape.color}
                  />
                  <text
                    alignmentBaseline="hanging"
                    style={{
                      transform: `translate(${textSize * 2}px, ${
                        textSize * 0.3
                      }px)`,
                      fontSize: textSize,
                      fontWeight: 400,
                    }}
                  >
                    {shape.column}: {shape.value}
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
