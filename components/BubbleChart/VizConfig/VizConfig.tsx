import { css } from 'pretty-lights'
import * as React from 'react'
import { useContext } from 'react'
import SignModal from '../../shared/components/SignModal'
import { pxToRem } from '../../shared/tokens/spacing'
import BubbleSVG from '../Bubble'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import StarOptions from './StarOptions'

const containerClass = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${pxToRem(36)};
`

const VizConfig: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  const { workersData, chartOptions, groupingsData } =
    useContext(WorkerDataContext)

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
          />
        </div>
        <div>
          <StarOptions starIndex={0} />
        </div>
      </div>
    </SignModal>
  )
}

export default VizConfig
