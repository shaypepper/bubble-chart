import { FC } from 'react'
import { Worker, Grouping, isWorker } from './data/types'
import BubbleSVG, { GroupingBubbleSVG } from './Bubble'

const BubbleChartSVG: FC<{
  bubbleData: d3.HierarchyCircularNode<Worker | Grouping>[]
}> = ({ bubbleData }) => {
  const radius = 0.5
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width={'100%'}
      viewBox={`0 0 1 1`}
      // viewBox={`0 0 ${width} ${width}`}
    >
      <defs>
        <style type="text/css">
          {`@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Lato:ital,wght@0,300;0,900;1,300&display=swap');`}
        </style>
      </defs>

      {bubbleData?.map(
        (d: d3.HierarchyCircularNode<Worker | Grouping>, idx) => {
          return isWorker(d.data) ? (
            <g key={d.id} transform={`translate(${d.x} ${d.y})`}>
              <BubbleSVG
                radius={d.r}
                bubbleFillColor={d.data.bubbleColors?.fillColor}
                innerTextColor={d.data.bubbleColors?.textColor}
                textLines={['shay'] && d.data.textLines}
                stars={d.data.stars || []}
                displayName={d.data?.displayName?.split(' ')[0] || '*******'}
              />
            </g>
          ) : (
            <g key={d.id} transform={`translate(${d.x} ${d.y})`}>
              <GroupingBubbleSVG
                displayName={d.data?.displayName || ''}
                radius={d.r}
                id={d.data.id}
                depth={d.depth}
                groupSize={d.value || 0}
              />
            </g>
          )
        }
      )}
    </svg>
  )
}

export default BubbleChartSVG
