import { useContext, useState, useRef, useEffect, FC, RefObject } from 'react'
import { width, height } from './tokens'
import { pack } from 'd3'
import { WorkerDataContext } from './data/WorkerDataProvider'
import { Layer, Stage, Rect, TextPath } from 'react-konva'
import { Stage as StageType } from 'konva/types/Stage'
import { Layer as LayerType } from 'konva/types/Layer'
import { downloadURI } from './utils'
import { BubbleKonva, GroupingBubble } from './Bubble'
import { styled } from 'pretty-lights'
import { Person, Node, isWorker } from './types'

const ButtonBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
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
    d3.HierarchyCircularNode<Node>[]
  >([])
  const { stratifiedData, colorMap } = useContext(WorkerDataContext)

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
    <div>
      <ButtonBar>
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
            const dataUrl = stageRef.current.toDataURL({
              pixelRatio: 20, // or other value you need
            })
            downloadURI(dataUrl, 'stage.png')
          }}
        >
          Save image
        </button>
      </ButtonBar>
      <Stage width={width * 2} height={height * 2} ref={stageRef}>
        <Layer ref={layerRef} draggable={true}>
          <Rect height={height} width={width} fill={'white'} strokeWidth={0} />
          {bubbleData?.map((d: d3.HierarchyCircularNode<Node>, idx) => {
            const colors = isWorker(d.data) ? d.data.bubbleColors : null
            const translation = {
              x: (idx ? d.x : 0.5) * width,
              y: (idx ? d.y : 0.5) * height,
            }

            function refocus() {
              const newScale = width / circleR
              setPosition({
                x: (circleR - translation.x) * newScale,
                y: (circleR - translation.y) * newScale,
              })
              setScale(newScale)
            }
            const r = d.r * height * (isWorker(d.data) ? 0.8 : 1.05)
            const circleR = d.r * height
            return !isWorker(d.data) ? (
              <GroupingBubble
                key={d.id}
                radius={d.r}
                translation={translation}
                onClick={refocus}
                displayName={d.data?.displayName}
              />
            ) : (
              <BubbleKonva
                key={d.id}
                radius={d.r}
                bubbleFillColor={colors?.fillColor || 'yellow'}
                translation={translation}
                showStars={[true, true, true]}
                onClick={refocus}
                displayName={d.data?.displayName?.split(' ')[0] || '*******'}
              />
            )
          })}
        </Layer>
      </Stage>
    </div>
  )
}

export default BubbleChart
