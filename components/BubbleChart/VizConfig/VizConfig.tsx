import * as React from 'react'
import { useContext } from 'react'
import { css } from '@emotion/css'
import { pxToRem } from '../../shared/tokens/spacing'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { FormatAction } from '../data/dataFormattingReducer'
import { BubbleShape } from '../data/types'
import { EditBubble } from '../Bubble/EditBubble'
import FillColorOptions from './Panels/FillColorOptions'
import ShapeOptions from './Panels/ShapeOptions'
import TextLineOptions from './Panels/TextLineOptions'
import { configTitleClass } from './styles'

const containerClass = css`
  display: grid;
  grid-template-columns: max-content min(30vw);
  grid-column-gap: ${pxToRem(36)};
`

export type ConfigPanel = {
  name: string
  index: number
  type: string
  translate: { x: number; y: number }
}
const configPanels: ConfigPanel[] = [
  {
    name: 'Text line 1',
    index: 0,
    type: 'textLine',
    translate: { x: 80, y: 8 },
  },
  {
    name: 'Text line 2',
    index: 1,
    type: 'textLine',
    translate: { x: 80, y: 14 },
  },
  {
    name: 'Text line 3',
    index: 2,
    type: 'textLine',
    translate: { x: 80, y: 20 },
  },
  { name: 'Shape 1', index: 0, type: 'shape', translate: { x: 15, y: -20 } },
  { name: 'Shape 2', index: 1, type: 'shape', translate: { x: 28, y: -34 } },
  { name: 'Shape 3', index: 2, type: 'shape', translate: { x: 37, y: -22 } },
  { name: 'Shape 4', index: 3, type: 'shape', translate: { x: 47, y: -38 } },
  { name: 'Shape 5', index: 4, type: 'shape', translate: { x: 54, y: -22 } },
  { name: 'Shape 6', index: 5, type: 'shape', translate: { x: 62, y: -34 } },
  { name: 'Shape 7', index: 6, type: 'shape', translate: { x: 76, y: -20 } },
]

const VizConfig: React.FC = () => {
  const { workersData, chartOptions, dispatch } = useContext(WorkerDataContext)
  const [currentConfigPanel, setCurrentConfigPanel] =
    React.useState<ConfigPanel>()

  const textLines = chartOptions.textLineColumns.map((c) =>
    c
      ? `${c}: ${workersData?.list[3].rawData[c]}`
      : 'Give us a column to visualize here'
  )

  if (!workersData) {
    return (
      <div className={containerClass}>
        You can&apos;t get very far without uploading some data!
      </div>
    )
  }
  return (
    <div className={containerClass}>
      <div>
        <EditBubble
          displayName={workersData?.list[3].displayName.split(' ')[0] || ''}
          textLines={textLines}
          width={'40vmin'}
          shapeOptions={chartOptions.shapes}
          generateOnClick={(panel: ConfigPanel) => () => {
            setCurrentConfigPanel(panel)
          }}
          configPanels={configPanels}
          setBubbleShape={(shape: BubbleShape) => {
            dispatch({
              type: FormatAction.SET_BUBBLE_SHAPE,
              bubbleShape: shape,
            })
          }}
          bubbleShape={chartOptions.bubbleShape}
        />
      </div>
      <div>
        <h3 className={configTitleClass}>
          {currentConfigPanel?.name
            ? `${currentConfigPanel?.name} options`
            : ''}{' '}
        </h3>
        {currentConfigPanel?.type === 'shape' && (
          <ShapeOptions
            shapeIndex={currentConfigPanel.index}
            key={`shape${currentConfigPanel.index}`}
          />
        )}

        {currentConfigPanel?.type === 'textLine' && (
          <TextLineOptions
            index={currentConfigPanel.index}
            key={`textLine${currentConfigPanel.index}`}
          />
        )}

        {currentConfigPanel?.type === 'fill' && <FillColorOptions />}
      </div>
    </div>
  )
}

export default VizConfig
