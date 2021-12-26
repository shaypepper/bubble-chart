import React, { useContext, useState, useRef, useEffect } from 'react'
import { chartDimensions } from './tokens'
import { pack, zoom, select, zoomIdentity, zoomTransform } from 'd3'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import { getBubbleFillColor, getTextcolor } from './utils'
import { Person } from '../ChartCreater/data/dataFormattingReducer'
import { drawBubble } from './draw'

// const legendSize = chartDimensions.height * 0.001

// const strat = stratify<Worker>()
//   .id((d) => d?.[state.nameColumn || ''])
//   .parentId((d) => d?.[state.groupingColumn || ''])

// const myZoom = zoom().scaleExtent([1, 100])

const defaultViewBox = `-${chartDimensions.margin} -${chartDimensions.margin} ${
  chartDimensions.height + chartDimensions.margin * 2
} ${chartDimensions.width + chartDimensions.margin * 2}`

const BubbleChartCanvas: React.FC = () => {
  const [viewBox, setViewBox] = useState<string>(defaultViewBox)
  let textArcPaths: RadiusMap = {}
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

      const r = d.r * chartDimensions.height
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

  useEffect(() => {
    let canvas = canvasRef.current
    let context = canvas?.getContext('2d')
    if (context === null || context === undefined || !canvas) return

    context.canvas.width = chartDimensions.width + chartDimensions.margin * 2
    context.canvas.height = chartDimensions.height + chartDimensions.margin * 2

    context.translate(chartDimensions.margin, chartDimensions.margin)

    context.fillStyle = 'green'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  useEffect(() => {
    let canvas = canvasRef.current
    let context = canvas?.getContext('2d')
    bubbleData?.forEach((d: d3.HierarchyCircularNode<Person>, idx) => {
      if (context === null || context === undefined) return
      drawBubble(d, context, chartDimensions, idx)
    })
  }, [bubbleData])

  return (
    <div>
      <canvas ref={canvasRef} width="100%"></canvas>
    </div>
  )
}

//   // + CREATE GRAPHICAL ELEMENTS
//   const circle = leaf
//       .append("circle")
//       .attr("r", d => d.r * chartDimensions.height)
//       .attr('fill', getFillColor)
//       .attr("stroke-chartDimensions.width", d => (6 - d.depth) * 0.2)
//       .attr("stroke", d => d.data[1].notes?.Assessment == "1" ? "white" : null)

//   // Write name to arc path
//   leaf.append("text")
//       .append("textPath")
//       .attr('href', d => `#arcpath-${d.data[0]}`)
//       .attr("font-size", d => isWorker(d) ?
//         d.r * chartDimensions.height * 0.333 :
//         d.r * chartDimensions.height / (15 - (d.depth * 1.5)))
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
//       .attr("font-size", d => (d.r * chartDimensions.height) * 0.41)
//       .attr("transform", d => `translate(${-0.5 * d.r * chartDimensions.height} ${-0.2 * d.r * chartDimensions.height})`)
//       .attr("fill", getTextColor)

//   // Write point person
//   leaf.append("text")
//       .html(d => {
//         if (!isWorker(d)) return "";
//         if (d.data[1].notes?.Assessment == 1) return 'Organizer';

//         const PP = d.data[1].notes?.['Point Person'].split(" ")[0] || "🤷🏻‍♀️";
//         return `PP: ${PP}`
//       })
//       .attr("font-size", d => (d.r * chartDimensions.height) *0.2)
//       .attr("transform", d => `translate(${-0.85 * d.r * chartDimensions.height} ${0.2 * d.r * chartDimensions.height})`)
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

export default BubbleChartCanvas
