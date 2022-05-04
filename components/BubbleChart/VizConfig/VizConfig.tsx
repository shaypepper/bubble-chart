import * as React from 'react'
import { useContext } from 'react'
import { css } from 'pretty-lights'
import { pxToRem } from '../../shared/tokens/spacing'
import { BubbleEditSVG } from '../Bubble'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import FillColorOptions from './Panels/FillColorOptions'
import StarOptions from './Panels/StarOptions'
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
  { name: 'Fill colors', index: 0, type: 'fill', translate: { x: 5, y: -5 } },
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
  { name: 'Star 1', index: 0, type: 'star', translate: { x: 29, y: -28 } },
  { name: 'Star 2', index: 1, type: 'star', translate: { x: 46, y: -27 } },
  { name: 'Star 3', index: 2, type: 'star', translate: { x: 63, y: -30 } },
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
          starOptions={chartOptions.stars}
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
        {currentConfigPanel?.type === 'star' && (
          <StarOptions
            starIndex={currentConfigPanel.index}
            key={`star${currentConfigPanel.index}`}
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
