import {
  useContext,
  useState,
  useRef,
  useEffect,
  FC,
  RefObject,
  useMemo,
} from 'react'
import { pack } from 'd3'
import { Layer, Stage } from 'react-konva'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType } from 'konva/types/Layer'
import { css } from 'pretty-lights'
import { downloadURI } from './utils'
import { BubbleKonva, GroupingBubble } from './Bubble'
import { Node, isWorker } from './data/types'
import Legend from './Legend'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { width, height } from './tokens'
import Signs from './Signs'

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

const useScaleAndPosition = () => {
  return { position: { x: 0, y: 0 }, scale: 1 }
}

const BubbleChart: FC = () => {
  const [position, setPosition] = useState<{ [z: string]: number }>({
    x: 0,
    y: 0,
  })
  const layerRef: RefObject<LayerType> = useRef(null)
  const stageRef: RefObject<StageType> = useRef(null)
  const [scale, setScale] = useState(1)
  const [bubbleData, setBubbleData] = useState<
    d3.HierarchyCircularNode<Node>[]
  >([])
  const { stratifiedData } = useContext(WorkerDataContext)

  const currentStageKey = useMemo(() => {
    return Math.round(Math.random() * 10000000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stratifiedData])

  useEffect(() => {
    if (stratifiedData) {
      setBubbleData(
        pack<Node>()
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
      <Stage
        width={width * 2}
        height={height * 2}
        ref={stageRef}
        className={stageClass}
        key={currentStageKey}
      >
        <Layer ref={layerRef} draggable={true}>
          {bubbleData?.map((d: d3.HierarchyCircularNode<Node>, idx) => {
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
            !isWorker(d.data) && console.log(d)

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
                bubbleFillColor={colors?.fillColor || 'yellow'}
                innerTextColor={colors?.textColor || 'yellow'}
                textLines={d.data.textLines}
                translation={translation}
                stars={d.data.stars}
                onClick={refocus}
                displayName={d.data?.displayName?.split(' ')[0] || '*******'}
              />
            )
          })}
        </Layer>
      </Stage>
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
      />
    </div>
  )
}

export default BubbleChart
