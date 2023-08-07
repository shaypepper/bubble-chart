import * as React from 'react'
import { useContext } from 'react'
import { css } from 'pretty-lights'
import { pxToRem } from '../../shared/tokens/spacing'
import { BubbleEditSVG } from '../Bubble'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import FillColorOptions from './Panels/FillColorOptions'
import ShapeOptions from './Panels/ShapeOptions'
import TextLineOptions from './Panels/TextLineOptions'
import { configTitleClass } from './styles'

const containerClass = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${pxToRem(36)};
`

export type ConfigPanel = {
  name: string
  index: number
  type: string
  translate: { x: number; y: number }
}
const configPanels: ConfigPanel[] = [
  { name: 'Fill color', index: 0, type: 'fill', translate: { x: 5, y: -5 } },
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
  { name: 'Shape 2', index: 1, type: 'shape', translate: { x: 30, y: -35 } },
  { name: 'Shape 3', index: 2, type: 'shape', translate: { x: 48.5, y: -40 } },
  { name: 'Shape 4', index: 3, type: 'shape', translate: { x: 68, y: -35 } },
  { name: 'Shape 5', index: 4, type: 'shape', translate: { x: 80, y: -20 } },
]

const VizConfig: React.FC = () => {
  const { workersData, chartOptions } = useContext(WorkerDataContext)
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
        <BubbleEditSVG
          displayName={workersData?.list[3].displayName.split(' ')[0] || ''}
          textLines={textLines}
          width={'40vmin'}
          shapeOptions={chartOptions.shapes}
          generateOnClick={(panel: ConfigPanel) => () => {
            setCurrentConfigPanel(panel)
          }}
          configPanels={configPanels}
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
