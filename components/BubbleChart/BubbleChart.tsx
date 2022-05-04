import {
  useContext,
  useState,
  useRef,
  useEffect,
  FC,
  RefObject,
  useMemo,
} from 'react'
import { renderToString } from 'react-dom/server'
import { pack } from 'd3'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType } from 'konva/types/Layer'
import { css } from 'pretty-lights'
import { Layer, Stage } from 'react-konva'
import { downloadURI } from './utils'
import { Worker, Grouping, isWorker } from './data/types'
import Legend from './Legend'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { height, width } from './tokens'
import Signs from './Signs'
import BubbleChartSVG from './BubbleChartSVG'
import { BubbleKonva, GroupingBubble } from './Bubble'

const stageClass = css`
  width: 100vmin;
  height: 100vmin;
  display: flex;
  // justify-content: center;
  // margin: 0 auto;

  canvas {
    width: 100%;
  }
`

const BubbleChart: FC = () => {
  const [position, setPosition] = useState<{ [z: string]: number }>({
    x: 0,
    y: 0,
  })
  const layerRef: RefObject<LayerType> = useRef(null)
  const stageRef: RefObject<StageType> = useRef(null)
  const [scale, setScale] = useState(1)
  const [bubbleData, setBubbleData] = useState<
    d3.HierarchyCircularNode<Worker | Grouping>[]
  >([])
  const { stratifiedData } = useContext(WorkerDataContext)

  const currentStageKey = useMemo(() => {
    return Math.round(Math.random() * 10000000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stratifiedData])

  useEffect(() => {
    if (stratifiedData) {
      setBubbleData(
        pack<Worker | Grouping>()
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
    <div
      style={{
        position: 'fixed',
        overflow: 'hidden',
        width: '100vw',
      }}
    >
      {stratifiedData && (
        <Stage
          width={width * 2}
          height={height * 2}
          ref={stageRef}
          className={stageClass}
          key={currentStageKey}
        >
          <Layer ref={layerRef} draggable={true}>
            {bubbleData?.map(
              (d: d3.HierarchyCircularNode<Worker | Grouping>, idx) => {
                const colors = isWorker(d.data) ? d.data.bubbleColors : null
                const translation = {
                  x: (idx ? d.x : 0.5) * width,
                  y: (idx ? d.y : 0.5) * height,
                }
                function refocus() {
                  const newScale = width / (circleR * 2)
                  setPosition({
                    x: (circleR - translation.x) * newScale + width / 20,
                    y: (circleR - translation.y) * newScale + width / 20,
                  })
                  setScale(newScale)
                }
                const circleR = d.r * height
                return !isWorker(d.data) ? (
                  <GroupingBubble
                    key={d.id}
                    radius={d.r}
                    translation={translation}
                    onClick={refocus}
                    displayName={`${d.data?.displayName} - ${d.value}`}
                  />
                ) : (
                  <BubbleKonva
                    key={d.id}
                    radius={d.r}
                    bubbleFillColor={colors?.fillColor}
                    innerTextColor={colors?.textColor}
                    textLines={d.data.textLines}
                    translation={translation}
                    stars={d.data.stars}
                    onClick={refocus}
                    displayName={
                      d.data?.displayName?.split(' ')[0] || '*******'
                    }
                  />
                )
              }
            )}
          </Layer>
        </Stage>
      )}

      <Legend />
      <Signs
        onReset={() => {
          const newPosition = {
            x: width / 20,
            y: width / 20,
          }
          setPosition(newPosition)
          setScale(1)
        }}
        onSaveImage={() => {
          if (!stageRef.current) return
          const dataUrl = stageRef.current.toDataURL({
            pixelRatio: 10, // or other value you need
          })
          const today = new Date()
          downloadURI(
            dataUrl,
            `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(
              2,
              '0'
            )}-${`${today.getDate() + 1}`.padStart(2, '0')} BubbleChart.png`
          )
        }}
        onSaveAsSVG={() => {
          const as_text = renderToString(
            <BubbleChartSVG bubbleData={bubbleData} />
          )
          // store in a blob
          const blob = new Blob([as_text], { type: 'image/svg+xml' })
          // create an URI pointing to that blob
          const url = URL.createObjectURL(blob)
          const win = open(url)
          // so the Garbage Collector can collect the blob
          if (win) {
            win.onload = () => URL.revokeObjectURL(url)
            win?.print()
          }
        }}
      />
    </div>
  )
}

export default BubbleChart
