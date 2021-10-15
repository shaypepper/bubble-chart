import React from 'react'
import { width, height, squareSize } from './tokens'
import orgChart from './org-chart.json'
import d3 from 'd3'

type EmployeeNode = {
  [x: string]: EmployeeNode | null
}

type FlattenedNode = {
  parents: string[]
  name: string
  children: EmployeeNode | null
  backgroundColor: string
  textColor: string
}

function flatten(
  parents: string[],
  children: EmployeeNode | null,
  name: string,
  managers: Set<string>,
  isParentNode = false
): [FlattenedNode[], Set<string>] {
  const result = []

  const node: FlattenedNode = {
    parents,
    name,
    children,
    backgroundColor: 'rgba(150,150,150,0.5)',
    textColor: 'white',
  }

  result.push(node)
  if (children) {
    managers.add(name)
    Object.entries(children).forEach(([childName, grandchildren]) => {
      result.push(
        ...flatten([...parents, name], grandchildren, childName, managers)[0]
      )
    })
  }
  return [result, managers]
}

const rollUpMethods = [
  (d: FlattenedNode): string => d.parents[0],
  (d: FlattenedNode): string => d.parents[1] || '',
  (d: FlattenedNode): string => d.parents[2] || '',
  (d: FlattenedNode): string => d.parents[3] || '',
  (d: FlattenedNode): string => d.parents[4] || '',
  (d: FlattenedNode): string => d.name,
]
const individualDepth = rollUpMethods.length
const getFillColor = (d) => d.data[1].bubbleColor || 'rgba(0, 0, 0, 0.1)'
const getTextColor = (d) => d.data[1].textColor
const isIC = (d) => d.depth === individualDepth
const legendSize = height * 0.001

const BubbleChart: React.FC = () => {
  const [flattenedData, managers] = flatten(
    [],
    orgChart,
    'Org',
    new Set(),
    true
  )

  let workers = flattenedData.filter(({ name }) => !managers.has(name))
  console.log(workers)

  const rolledUpTypes = d3.rollup(
    workers,
    (v: [FlattenedNode]) => ({
      name: v[0].name,
      count: v.length,
      // notes: v[0].Notes,
      bubbleColor: v[0].backgroundColor,
      textColor: v[0].textColor,
    }), // reduce function
    ...rollUpMethods
  )

  const root = d3
    .hierarchy([null, rolledUpTypes], ([_, values]) => values)
    .sum(([key, values]) => values.count)
    .sort((a, b) => b.value - a.value)
  return (
    <div>
      <svg viewBox={`-10 -10 ${height + 20} ${width + 20}`}>
        <rect
          height={height + 20}
          width={width + 20}
          fill="white"
          x="-10"
          y="-10"
        ></rect>

        {/* TODO: Add legend **/}
      </svg>
      <button>Print SVG</button>
    </div>
  )
}

//   const rootPack = d3.pack(root).padding(0.002)

//   // + CALL LAYOUT FUNCTION ON YOUR ROOT DATA
//   const leaf = svg
//       .selectAll(`g.leaf`)
//       .data(rootPack(root).descendants())
//       .join("g")
//       .attr('class', 'leaf')
//       .attr("transform", d => `translate(${d.x * width},${d.y * height})`);

//   // + CREATE GRAPHICAL ELEMENTS
//   const circle = leaf
//       .append("circle")
//       .attr("r", d => d.r * height)
//       .attr('fill', getFillColor)
//       .attr("stroke-width", d => (6 - d.depth) * 0.2)
//       .attr("stroke", d => d.data[1].notes?.Assessment == "1" ? "white" : null)

//   // Create path that text can follow (this is what makes the names round)
//   leaf.append("path")
//       .attr('id', d => `arcpath-${d.data[0]}`)
//       .attr('d', d => {
//         const relativeSize = isIC(d) ? 0.7 : 1;
//         const R = (relativeSize * d.r * height);
//         return `M 0,${R} a ${R},${R} 0 1,1 0,${-2 * R} a ${R},${R} 0 1,1 0,${2 * R} `
//       })
//       .attr('fill', 'transparent')

//   // Write name to arc path
//   leaf.append("text")
//       .append("textPath")
//       .attr('href', d => `#arcpath-${d.data[0]}`)
//       .attr("font-size", d => isIC(d) ?
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
//         return isIC(d) ? assessment : "";
//       })
//       .attr("font-size", d => (d.r * height) * 0.41)
//       .attr("transform", d => `translate(${-0.5 * d.r * height} ${-0.2 * d.r * height})`)
//       .attr("fill", getTextColor)

//   // Write point person
//   leaf.append("text")
//       .html(d => {
//         if (!isIC(d)) return "";
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

const WorkerBubble: React.FC = () => {
  return <circle></circle>
}

const BossBubble: React.FC = () => {
  return <circle></circle>
}

export default BubbleChart
