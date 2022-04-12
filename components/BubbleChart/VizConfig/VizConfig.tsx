import { css } from 'pretty-lights'
import * as React from 'react'
import { useContext } from 'react'
import SignModal from '../../shared/components/SignModal'
import { pxToRem } from '../../shared/tokens/spacing'
import BubbleSVG from '../Bubble'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import StarOptions from './Panels/StarOptions'
import TextLineOptions from './Panels/TextLineOptions'

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
export const configPanels: ConfigPanel[] = [
  { name: 'Fill colors', index: 0, type: 'fill', translate: { x: 5, y: -5 } },
  { name: 'Display name', index: 0, type: 'name', translate: { x: 80, y: -7 } },
  {
    name: 'Text line 1',
    index: 0,
    type: 'textLine',
    translate: { x: 80, y: 8 },
  },
  {
    name: 'Text line 2',
    index: 0,
    type: 'textLine',
    translate: { x: 80, y: 14 },
  },
  {
    name: 'Text line 3',
    index: 0,
    type: 'textLine',
    translate: { x: 80, y: 20 },
  },
  { name: 'Star 1', index: 0, type: 'star', translate: { x: 31, y: -40 } },
  { name: 'Star 2', index: 0, type: 'star', translate: { x: 48, y: -42 } },
  { name: 'Star 3', index: 0, type: 'star', translate: { x: 64, y: -40 } },
]

const VizConfig: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  const { workersData, chartOptions, groupingsData } =
    useContext(WorkerDataContext)
  const [currentConfigPanel, setCurrentConfigPanel] =
    React.useState<ConfigPanel>()

  return (
    <SignModal onDismiss={onDismiss}>
      <div className={containerClass}>
        <div>
          <BubbleSVG
            displayName={'Shay'}
            mode={'edit'}
            textLines={[
              'Something: Something else',
              'Mousaka is very pretty',
              'Singing is the best',
            ]}
            width={'50vmin'}
            showStars={chartOptions.stars.map((s) => s.use)}
            starColors={chartOptions.stars.map((s) => s.color)}
            generateOnClick={(panel: ConfigPanel) => () => {
              console.log('click!')
              setCurrentConfigPanel(panel)
            }}
            configPanels={configPanels}
          />
        </div>
        <div>
          <div>{currentConfigPanel?.name}</div>
          {currentConfigPanel?.type === 'star' && (
            <StarOptions starIndex={currentConfigPanel.index} />
          )}

          {currentConfigPanel?.type === 'textLine' && (
            <TextLineOptions index={currentConfigPanel.index} />
          )}
        </div>
      </div>
    </SignModal>
  )
}

export default VizConfig
