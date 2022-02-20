import { Selection, select } from 'd3'
import React from 'react'
import SillyBillyComponent from './SillyBilly'
import { renderToString } from 'react-dom/server'

// export function generateSVG() {
//   // const squareSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
//   const width = 2000
//   const height = 2000
//   const squareSize = 2000

//   let svg: Selection<>
//   let state = {
//     allManagers: new Set(),
//     data: null,
//   }

//   let dataFromPython = []
//   let colors = {}

//   dataFromPython.forEach(({ Parents }) => {
//     Parents.forEach((parent) => {
//       state.allManagers.add(parent)
//     })
//   })

//   state.data = dataFromPython
//     .filter(({ Name }) => !state.allManagers.has(Name))
//     .sort((a, b) => +a.notes?.Assessment - +b.notes?.Assessment)

//   console.log(state.data)

//   const rollUpMethods = [
//     (d) => d.Parents[0],
//     (d) => d.Parents[1] || '',
//     (d) => d.Parents[2] || '',
//     (d) => d.Parents[3] || '',
//     (d) => d.Parents[4] || '',
//     (d) => d.Name,
//   ]
//   const individualDepth = rollUpMethods.length
//   const getFillColor = (d) => d.data[1].bubbleColor || 'rgba(0, 0, 0, 0.1)'
//   const getTextColor = (d) => d.data[1].textColor
//   const isIC = (d) => d.depth === individualDepth

//   init()

//   function init() {
//     select('#output-area')
//       .append('button')
//       .attr('id', 'btn')
//       .html('Print SVG')

//     const divElement = document.createElement('svg')

//     svg = d3
//       .select(divElement)
//       .append('svg')
//       .attr('font-family', 'sans-serif')
//       .attr('viewBox', `-10 -10 ${height + 20} ${width + 20}`)

//     svg
//       .append('rect')
//       .attr('height', height + 20)
//       .attr('width', width + 20)
//       .attr('fill', 'white')
//       .attr('x', -10)
//       .attr('y', -10)

//     const legendSize = height * 0.001
//     const legend = svg
//       .selectAll('g.legendRow')
//       .data(Object.keys(colors))
//       .join('g')
//       .attr('class', 'legendRow')
//       .attr(
//         'transform',
//         (d, idx) => `translate(${legendSize},${idx * legendSize * 12})`
//       )
//     legend
//       .append('circle')
//       .attr('r', legendSize * 5)
//       .attr('fill', (d) => colors[d])
//       .attr('stroke', (d) => (colors[d] == 'white' ? 'black' : 'none'))
//     legend
//       .append('text')
//       .attr('font-size', legendSize * 10)
//       .attr('x', legendSize * 10)
//       .attr('y', (d, idx) => legendSize * 3)
//       .html((d) => d)

//     const rolledUpTypes = d3.rollup(
//       state.data,
//       (v) => ({
//         name: v[0].Name,
//         count: v.length,
//         notes: v[0].Notes,
//         bubbleColor: v[0].Color,
//         textColor: v[0].TextColor,
//       }), // reduce function
//       ...rollUpMethods
//     )

//     const root = d3
//       .hierarchy([null, rolledUpTypes], ([_, values]) => values)
//       .sum(([key, values]) => values.count)
//       .sort((a, b) => b.value - a.value)

//     const rootPack = d3.pack(root).padding(0.002)

//     // + CALL LAYOUT FUNCTION ON YOUR ROOT DATA
//     const leaf = svg
//       .selectAll(`g.leaf`)
//       .data(rootPack(root).descendants())
//       .join('g')
//       .attr('class', 'leaf')
//       .attr('transform', (d) => `translate(${d.x * width},${d.y * height})`)

//     // + CREATE GRAPHICAL ELEMENTS
//     const circle = leaf
//       .append('circle')
//       .attr('r', (d) => d.r * height)
//       .attr('fill', getFillColor)
//       .attr('stroke-width', (d) => (6 - d.depth) * 0.2)
//       .attr('stroke', (d) =>
//         d.data[1].notes?.Assessment == '1' ? 'white' : null
//       )

//     // Create path that text can follow (this is what makes the names round)
//     leaf
//       .append('path')
//       .attr('id', (d) => `arcpath-${d.data[0]}`)
//       .attr('d', (d) => {
//         const relativeSize = isIC(d) ? 0.7 : 1
//         const R = relativeSize * d.r * height
//         return `M 0,${R} a ${R},${R} 0 1,1 0,${-2 * R} a ${R},${R} 0 1,1 0,${
//           2 * R
//         } `
//       })
//       .attr('fill', 'transparent')

//     // Write name to arc path
//     leaf
//       .append('text')
//       .append('textPath')
//       .attr('href', (d) => `#arcpath-${d.data[0]}`)
//       .attr('font-size', (d) =>
//         isIC(d) ? d.r * height * 0.333 : (d.r * height) / (15 - d.depth * 1.5)
//       )
//       .html((d) => d.data[0])
//       .attr('fill', getTextColor)
//       .attr('text-anchor', 'middle')
//       .attr('startOffset', '50%')

//     // Write assessment #
//     leaf
//       .append('text')
//       .html((d) => {
//         const assessment = +d.data[1].notes?.Assessment || '?'
//         return isIC(d) ? assessment : ''
//       })
//       .attr('font-size', (d) => d.r * height * 0.41)
//       .attr(
//         'transform',
//         (d) => `translate(${-0.5 * d.r * height} ${-0.2 * d.r * height})`
//       )
//       .attr('fill', getTextColor)

//     // Write point person
//     leaf
//       .append('text')
//       .html((d) => {
//         if (!isIC(d)) return ''
//         if (d.data[1].notes?.Assessment == 1) return 'Organizer'

//         const PP = d.data[1].notes?.['Point Person'].split(' ')[0] || '🤷🏻‍♀️'
//         return `PP: ${PP}`
//       })
//       .attr('font-size', (d) => d.r * height * 0.2)
//       .attr(
//         'transform',
//         (d) => `translate(${-0.85 * d.r * height} ${0.2 * d.r * height})`
//       )
//       .attr('fill', getTextColor)

//     console.log('SVG', svg)
//   }

//   // we need to handle a user gesture to use 'open'
//   document.getElementById('btn').onclick = (evt) => {
//     // const svg = document.querySelector("svg");
//     // convert to a valid XML source
//     const as_text = new XMLSerializer().serializeToString(svg.node())
//     // store in a Blob
//     const blob = new Blob([as_text], { type: 'image/svg+xml' })
//     //const blob = new Blob([svg], { type: "image/svg+xml" });
//     // create an URI pointing to that blob
//     const url = URL.createObjectURL(blob)
//     const win = open(url)
//     // so the Garbage Collector can collect the blob
//     win.onload = (evt) => URL.revokeObjectURL(url)
//     win.print()
//   }
// }

export function dummySVG() {
  const svgDomElement = document.createElement('svg')
  const svg = select(svgDomElement)
    .append('svg')
    .attr('font-family', 'sans-serif')
    .attr('viewBox', `-10 -10 ${120} ${120}`)

  svg
    .append('rect')
    .attr('height', 120)
    .attr('width', 120)
    .attr('fill', 'green')
    .attr('x', -10)
    .attr('y', -10)

  const as_text = new XMLSerializer().serializeToString(svg.node())
  // store in a Blob
  const blob = new Blob([as_text], { type: 'image/svg+xml' })
  //const blob = new Blob([svg], { type: "image/svg+xml" });
  // create an URI pointing to that blob
  const url = URL.createObjectURL(blob)
  const win = open(url)
  // so the Garbage Collector can collect the blob
  win.onload = (evt) => URL.revokeObjectURL(url)
  win.print()
}

export function otherDummySVG() {
  const as_text = renderToString(<SillyBillyComponent shayIsCool />)

  const blob = new Blob([as_text], { type: 'image/svg+xml' })
  //const blob = new Blob([svg], { type: "image/svg+xml" });
  // create an URI pointing to that blob
  const url = URL.createObjectURL(blob)
  const win = open(url)
  // so the Garbage Collector can collect the blob
  win.onload = (evt) => URL.revokeObjectURL(url)
  win.print()
}
