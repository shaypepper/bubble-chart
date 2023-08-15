import { FC } from 'react'
import { Worker, Grouping, isWorker, ChartOptions } from './data/types'
import LegendSVG from './LegendSVG'
import { SVGGroupingBubble } from './Bubble/SVGGroupingBubble'
import { SVGBubble } from './Bubble/SVGBubble'

const BubbleChartSVG: FC<{
  bubbleData: d3.HierarchyCircularNode<Worker | Grouping>[]
  chartOptions: ChartOptions
  multiplier?: number
}> = ({ bubbleData, chartOptions, multiplier = 100 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={'100%'}
      viewBox={`0 0 ${multiplier} ${multiplier}`}
      style={{ height: '100vmin' }}
      // viewBox={`0 0 ${width} ${width}`}
    >
      <defs>
        <style type="text/css">
          {`@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lato:ital,wght@0,300;0,900;1,300&display=swap&family=Inter:wght@300;400;500;600;700');`}
        </style>
      </defs>

      {bubbleData?.map(
        (d: d3.HierarchyCircularNode<Worker | Grouping>, idx) => {
          return isWorker(d.data) ? (
            <g
              key={d.id}
              transform={`translate(${d.x * multiplier} ${d.y * multiplier})`}
            >
              <SVGBubble
                radius={d.r * multiplier}
                bubbleFillColor={d.data.bubbleColors?.fillColor}
                innerTextColor={d.data.bubbleColors?.textColor}
                textLines={['shay'] && d.data.textLines}
                shapes={d.data.shapes || []}
                displayName={d.data?.displayName?.split(' ')[0] || '*******'}
                bubbleShape={chartOptions.bubbleShape}
              />
            </g>
          ) : (
            <g
              key={d.id}
              transform={`translate(${d.x * multiplier} ${d.y * multiplier})`}
            >
              <SVGGroupingBubble
                displayName={d.data?.displayName || ''}
                radius={d.r * multiplier}
                id={d.data.id}
                depth={d.depth}
                groupSize={d.value || 0}
              />
            </g>
          )
        }
      )}
      <LegendSVG textSize={0.006 * multiplier} chartOptions={chartOptions} />
    </svg>
  )
}

export default BubbleChartSVG
