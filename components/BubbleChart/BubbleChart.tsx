import React, { useContext, useState, useRef, useEffect } from 'react'
import { width, height, margin } from './tokens'
import { pack, select } from 'd3'
// import { pack, zoom, select } from 'd3'
import { WorkerDataContext } from './WorkerDataProvider'
import { getBubbleFillColor, getTextcolor } from './utils'
import { Person } from '../ChartCreater/data/dataFormattingReducer'

// const legendSize = height * 0.001

// const strat = stratify<Worker>()
//   .id((d) => d?.[state.nameColumn || ''])
//   .parentId((d) => d?.[state.groupingColumn || ''])

// const myZoom = zoom().scaleExtent([1, 100])

const defaultViewBox = `-${margin} -${margin} ${height + margin * 2} ${
  width + margin * 2
}`

const BubbleChart: React.FC = () => {
  const [viewBox, setViewBox] = useState<string>(defaultViewBox)
  let textArcPaths: RadiusMap = {}
  const bubbleChartSVG = useRef<SVGElement>(null)

  // useEffect(() => {
  //   if (bubbleChartSVG?.current) {
  //     select(bubbleChartSVG.current).call(myZoom)
  //   }
  // }, [])

  const { stratifiedData, colorMap } = useContext(WorkerDataContext)

  const bubbleData: d3.HierarchyCircularNode<Person>[] =
    stratifiedData && stratifiedData
      ? pack<Person>().padding(0.005)(stratifiedData).descendants()
      : []

  type RadiusMap = {
    [n: number]: {
      grouping: string
      worker: string
    }
  }

  textArcPaths =
    bubbleData?.reduce<RadiusMap>((memo: RadiusMap, d) => {
      if (memo[d.r]) return memo

      const r = d.r * height
      const groupingR = r
      const workerR = r * 0.7
      let getTextPath = (R: number) =>
        `M 0,${R} a ${R},${R} 0 1,1 0,${-2 * R} a ${R},${R} 0 1,1 0,${2 * R} `

      memo[d.r] = {
        grouping: getTextPath(groupingR),
        worker: getTextPath(workerR),
      }
      return memo
    }, {}) || []

  return (
    <div>
      <button
        onClick={(e) => {
          setViewBox(defaultViewBox)
          e.preventDefault()
        }}
      >
        Reset zoom
      </button>
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        height={'100%'}
        width={'100%'}
        ref={bubbleChartSVG}
      >
        <rect
          height={height + margin * 2}
          width={width + margin * 2}
          fill="gainsboro"
          x={-margin}
          y={-margin}
        />
        {Object.entries(textArcPaths).map(([r, paths]) => {
          return (
            <>
              <path
                id={`worker-text-arc-${r}`}
                d={paths.worker}
                fill={'transparent'}
              />
              <path
                id={`grouping-text-arc-${r}`}
                d={paths.grouping}
                fill={'transparent'}
              />
            </>
          )
        })}

        {bubbleData?.map((d: d3.HierarchyCircularNode<Person>, idx) => {
          const isWorker = !d.children
          const translation = {
            x: (idx ? d.x : 0.5) * width,
            y: (idx ? d.y : 0.5) * height,
          }
          const r = d.r * height

          return (
            <g
              key={d.id}
              className={'leaf'}
              transform={`translate(${translation.x},${translation.y})`}
              onClick={() => {
                setViewBox(
                  `${translation.x - r - 10} ${translation.y - r - 10} ${
                    r * 2 + 20
                  } ${r * 2 + 20}`
                )
              }}
            >
              <circle
                r={r}
                fill={getBubbleFillColor(
                  isWorker,
                  d.data.Assessment,
                  colorMap || {}
                )}
                strokeWidth={isWorker ? 0 : 2}
                stroke={'darkgray'}
              />

              <text>
                <textPath
                  href={`#${isWorker ? 'worker' : 'grouping'}-text-arc-${d.r}`}
                  fill={getTextcolor(
                    isWorker,
                    d.data.Assessment,
                    colorMap || {}
                  )}
                  textAnchor={'middle'}
                  startOffset={'50%'}
                  fontSize={
                    isWorker
                      ? d.r * height * 0.333
                      : (d.r * height) / (15 - d.depth * 1.5)
                  }
                >
                  {d.data.Name}
                </textPath>
              </text>
            </g>
          )
        })}
        {/* TODO: Add legend **/}
      </svg>
    </div>
  )
}

//   // + CREATE GRAPHICAL ELEMENTS
//   const circle = leaf
//       .append("circle")
//       .attr("r", d => d.r * height)
//       .attr('fill', getFillColor)
//       .attr("stroke-width", d => (6 - d.depth) * 0.2)
//       .attr("stroke", d => d.data[1].notes?.Assessment == "1" ? "white" : null)

//   // Write name to arc path
//   leaf.append("text")
//       .append("textPath")
//       .attr('href', d => `#arcpath-${d.data[0]}`)
//       .attr("font-size", d => isWorker(d) ?
//         d.r * height * 0.333 :
//         d.r * height / (15 - (d.depth * 1.5)))
//       .html((d) => d.data[0])
//       .attr("fill", getTextColor)
//       .attr('text-anchor', 'middle')
//       .attr('startOffset', '50%')

//   // Write assessment #
//   leaf.append("text")
//       .html(d => {
//         const assessment = +d.data[1].notes?.Assessment || '?';
//         return isWorker(d) ? assessment : "";
//       })
//       .attr("font-size", d => (d.r * height) * 0.41)
//       .attr("transform", d => `translate(${-0.5 * d.r * height} ${-0.2 * d.r * height})`)
//       .attr("fill", getTextColor)

//   // Write point person
//   leaf.append("text")
//       .html(d => {
//         if (!isWorker(d)) return "";
//         if (d.data[1].notes?.Assessment == 1) return 'Organizer';

//         const PP = d.data[1].notes?.['Point Person'].split(" ")[0] || "🤷🏻‍♀️";
//         return `PP: ${PP}`
//       })
//       .attr("font-size", d => (d.r * height) *0.2)
//       .attr("transform", d => `translate(${-0.85 * d.r * height} ${0.2 * d.r * height})`)
//       .attr("fill", getTextColor)

//   console.log("SVG", svg)
// }

// // we need to handle a user gesture to use 'open'
// document.getElementById("btn").onclick = (evt) => {
//   // const svg = document.querySelector("svg");
//   // convert to a valid XML source
//   const as_text = new XMLSerializer().serializeToString(svg.node());
//   // store in a Blob
//   const blob = new Blob([as_text], { type: "image/svg+xml" });
//   //const blob = new Blob([svg], { type: "image/svg+xml" });
//   // create an URI pointing to that blob
//   const url = URL.createObjectURL(blob);
//   const win = open(url);
//   // so the Garbage Collector can collect the blob
//   win.onload = (evt) => URL.revokeObjectURL(url);
//   win.print();
// };

//   const legend = svg.selectAll('g.legendRow')
//     .data(Object.keys(colors))
//     .join('g')
//     .attr('class', 'legendRow')
//     .attr("transform", (d, idx) => `translate(${legendSize},${idx * legendSize * 12})`)
//     legend.append('circle')
//       .attr('r', legendSize * 5)
//       .attr('fill', d => colors[d])
//       .attr('stroke', d => colors[d] == "white" ? "black" : "none")
//     legend.append('text')
//       .attr('font-size', legendSize * 10)
//       .attr('x', legendSize * 10)
//       .attr('y', (d, idx) => legendSize * 3)
//       .html(d => d)

export default BubbleChart
