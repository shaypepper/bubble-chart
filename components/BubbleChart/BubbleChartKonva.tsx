import React, { useContext, useState, useRef, useEffect } from 'react'
import { width, height, margin } from './tokens'
import { pack, zoom, select } from 'd3'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import { getBubbleFillColor, getTextcolor } from './utils'
import { Person } from '../ChartCreater/data/dataFormattingReducer'
import {
  Group,
  Circle,
  Layer,
  Stage,
  Rect,
  TextPath,
  KonvaNodeComponent,
  StageProps,
} from 'react-konva'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType, LayerConfig } from 'konva/types/Layer'
import { Spring, animated } from '@react-spring/konva'

const defaultViewBox = `-${margin} -${margin} ${height + margin * 2} ${
  width + margin * 2
}`

const BubbleChartKonva: React.FC = () => {
  const [viewBox, setViewBox] = useState<string>(defaultViewBox)
  const [newRender, setNewRender] = useState<number>()
  const rerender = () => {
    setNewRender(Math.random())
  }
  const [position, setPosition] = useState<{ [z: string]: number }>({
    x: 0,
    y: 0,
  })
  let textArcPaths: RadiusMap = {}
  const bubbleChartSVG = useRef<SVGSVGElement>(null)
  const stageRef: React.RefObject<StageType> = useRef(null)
  const layerRef: React.RefObject<LayerType> = useRef(null)
  const [scale, setScale] = useState(1)
  const { stratifiedData, colorMap } = useContext(WorkerDataContext)

  const bubbleData: d3.HierarchyCircularNode<Person>[] =
    stratifiedData && stratifiedData
      ? pack<Person>()
          .padding((d) => {
            return d.height == 1 ? 0.0 : 0.002
          })(stratifiedData)
          .descendants()
      : []

  type RadiusMap = {
    [n: number]: {
      grouping: string
      worker: string
    }
  }

  useEffect(() => {
    layerRef.current?.to({
      ...position,
      duration: 0.3,
    })
  }, [position])

  useEffect(() => {
    layerRef.current?.to({
      scaleX: scale,
      scaleY: scale,
      duration: 0.2,
    })
  }, [scale])

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
      <p>
        {layerRef.current?.position().x} {layerRef.current?.position().y}
      </p>
      <p>
        {position.x} {position.y}
      </p>
      <button
        onClick={(e) => {
          e.preventDefault()
          const newPosition = {
            x: 0,
            y: 0,
          }
          setPosition(newPosition)
          setScale(1)
        }}
      >
        Reset frame
      </button>
      <Stage width={1000} height={1000}>
        {/* <Spring
          from={{ x: 0, y: 0 }}
          to={{
            x: position.x,
            y: position.y,
          }}
        >
          {(props) => (
            <animated.Layer ref={layerRef} {...props}> */}
        <Layer ref={layerRef} draggable={true}>
          <Rect
            height={height + margin * 2}
            width={width + margin * 2}
            fill="gainsboro"
            stroke="fuschia"
          />

          {bubbleData?.map((d: d3.HierarchyCircularNode<Person>, idx) => {
            const isWorker = !d.children
            const translation = {
              x: (idx ? d.x : 0.5) * width,
              y: (idx ? d.y : 0.5) * height,
            }
            const r = d.r * height * (isWorker ? 0.8 : 1)
            const circleR = d.r * height

            return (
              <Group
                key={d.id}
                className={'leaf'}
                x={translation.x}
                y={translation.y}
                // onClick={() => {
                //   setViewBox(
                //     `${translation.x - r - 10} ${translation.y - r - 10} ${
                //       r * 2 + 20
                //     } ${r * 2 + 20}`
                //   )
                // }}
              >
                <Circle
                  radius={circleR}
                  fill={isWorker ? 'green' : 'grey'}
                  strokeWidth={0}
                  stroke={'darkgray'}
                  opacity={isWorker ? 0.2 : 0.4}
                  onClick={function (evt) {
                    if (isWorker) {
                      // evt.target.attrs.fill = 'green'
                      evt.target.to({
                        opacity: evt.target.opacity() == 0.8 ? 0.2 : 0.8,
                        duration: 1,
                      })
                      // evt.target.to({
                      //   opacity: 0.5,
                      //   duration: 50,
                      //   onFinish: () => {
                      //     // console.log('okay?')
                      // evt.target.parent?.draw()
                      //   },
                      // })
                    } else {
                      const newScale = width / circleR
                      const newPosition = {
                        x: (circleR - translation.x) * newScale,
                        y: (circleR - translation.y) * newScale,
                      }
                      console.log(newPosition)

                      setPosition(newPosition)
                      setScale(newScale)
                    }
                  }}
                />
                <TextPath
                  data={`M 0,${r} a ${r},${r} 0 1,1 0,${
                    -2 * r
                  } a ${r},${r} 0 1,1 0,${2 * r} `}
                  fill={'black'}
                  fontSize={width / bubbleData.length}
                  listening={false}
                  fontFamily={'Monaco'}
                  rotationDeg={90}
                  opacity={circleR > width / (30 * scale) ? 1 : 0}
                  // fill={getTextcolor(
                  //   isWorker,
                  //   d.data.Assessment
                  //   // colorMap || {}
                  // )}
                  // offsetX={50}
                  // fontSize={
                  //   isWorker
                  //     ? d.r * height * 0.333
                  //     : (d.r * height) / (15 - d.depth * 1.5)
                  // }
                  text={d.data.Name || d.data.name || '*******'}
                ></TextPath>
              </Group>
            )
          })}
        </Layer>
        {/* </animated.Layer>
          )}
        </Spring> */}
      </Stage>
    </div>
  )
  const SVG = (
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

      {/* TODO: Add legend **/}
    </svg>
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

export default BubbleChartKonva
