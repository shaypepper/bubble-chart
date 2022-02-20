import { useContext, useState, useRef, useEffect, FC, RefObject } from 'react'
import { width, height } from './tokens'
import { pack } from 'd3'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import { Person } from '../ChartCreater/data/dataFormattingReducer'
import { Layer, Stage, Rect, TextPath } from 'react-konva'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType } from 'konva/types/Layer'
import Bubble from './Bubble'
import { downloadURI } from './utils'
import { useBubbleChartContext } from './BubbleChartContext'
import { timesGuildTheme } from './themes'
import { dummySVG, otherDummySVG } from './helpers'

const BubbleChart: FC = () => {
  const [position, setPosition] = useState<{ [z: string]: number }>({
    x: 0,
    y: 0,
  })
  const layerRef: RefObject<LayerType> = useRef(null)
  const stageRef: RefObject<StageType> = useRef(null)
  const [scale, setScale] = useState(1)
  const [bubbleData, setBubbleData] = useState<
    d3.HierarchyCircularNode<Person>[]
  >([])
  const { stratifiedData, colorMap } = useContext(WorkerDataContext)
  const things = useBubbleChartContext()
  console.log(things)

  useEffect(() => {
    if (stratifiedData) {
      setBubbleData(
        pack<Person>()
          .padding((d) => (d.height == 1 ? 0.0 : d.depth == 1 ? 0.008 : 0.002))(
            stratifiedData
          )
          .descendants()
      )
    }
  }, [stratifiedData])

  useEffect(() => {
    layerRef.current?.to({
      ...position,
      scaleX: scale,
      scaleY: scale,
      duration: 0.3,
    })
  }, [position, scale])

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
      <button
        onClick={(e) => {
          e.preventDefault()
          if (!stageRef.current) return
          console.log('printing')
          const dataUrl = stageRef.current.toDataURL({
            pixelRatio: 20, // or other value you need
          })
          downloadURI(dataUrl, 'stage.png')
        }}
      >
        Save image
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          otherDummySVG()
        }}
      >
        Export to SVG
      </button>
      <Stage width={width * 2} height={height * 2} ref={stageRef}>
        <Layer ref={layerRef} draggable={true}>
          <Rect height={height} width={width} fill={'white'} strokeWidth={0} />
          {bubbleData?.map((d: d3.HierarchyCircularNode<Person>, idx) => {
            const isWorker = !d.children
            const translation = {
              x: (idx ? d.x : 0.5) * width,
              y: (idx ? d.y : 0.5) * height,
            }
            const r = d.r * height * (isWorker ? 0.8 : 1.05)
            const circleR = d.r * height
            return (
              <Bubble
                key={d.id}
                radius={d.r}
                d={d}
                fillColor={isWorker ? 'hsl(226, 100%, 69%)' : 'grey'}
                textColor={isWorker ? 'white' : 'black'}
                translation={translation}
                onClick={function () {
                  const newScale = width / circleR
                  setPosition({
                    x: (circleR - translation.x) * newScale,
                    y: (circleR - translation.y) * newScale,
                  })
                  setScale(newScale)
                }}
                isLeaf={isWorker}
                listLength={bubbleData.length}
                scale={scale}
                name={d.data.Name || d.data.name || '*******'}
                theme={timesGuildTheme}
                height={height}
                width={width}
              />
            )
          })}
        </Layer>
      </Stage>
    </div>
  )
}

export default BubbleChart

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
