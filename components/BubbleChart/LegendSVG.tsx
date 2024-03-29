import { FC } from 'react'
import { MiniBubbleG } from './Bubble/MiniBubble'
import { blankValue, ChartOptions, ColorMap } from './data/types'
import { shapePaths } from './shapes/Shape'

const LegendSVG: FC<{ textSize: number; chartOptions: ChartOptions }> = ({
  textSize,
  chartOptions,
}) => {
  const { colors, shapes } = chartOptions
  const currentColumnColorMap: ColorMap =
    colors.colorMap[colors.currentColumn] || {}
  const fillColorList = Object.entries(currentColumnColorMap)
  const filteredShapes = shapes.filter((s) => s.use && s.column)

  return (
    <>
      <g
        style={{
          transform: 'translate(1px, 2px)',
          fontFamily: 'Lato',
          fontSize: textSize,
          letterSpacing: 0,
        }}
      >
        {fillColorList.length || filteredShapes.length ? (
          <text style={{ fontSize: textSize * 1.5, fontWeight: 'bold' }}>
            Legend
          </text>
        ) : null}
        <g
          style={{
            transform: `translateY(${textSize * 1.4}px)`,
          }}
        >
          {filteredShapes.map((shape, index) => (
            <g
              style={{
                transform: `translateY(${index * textSize * 2}px)`,
              }}
              key={`${shape.shape}: ${shape.values} (${index})`}
            >
              <path
                d={shapePaths[shape.shape].pathCommands}
                transform={`scale(0.01)`}
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
                {shape.column}: {shape.values.join(', ')}
              </text>
            </g>
          ))}
        </g>
        {fillColorList.length > 0 && (
          <g
            style={{
              transform: `translateY(${
                textSize * 2.5 * filteredShapes.length + 0.04
              }px)`,
            }}
          >
            <text
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: 0,
                fontSize: textSize,
              }}
            >
              {colors.currentColumn}
            </text>
            {fillColorList
              .sort(([value], [prevValue]) => (value > prevValue ? 1 : -1))
              .map(([value, { fillColor, textColor }], i) => {
                return (
                  <g
                    key={value}
                    style={{
                      transform: `translateY(${i * textSize * 2 + 0.75}px)`,
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
                      {value || blankValue}
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
