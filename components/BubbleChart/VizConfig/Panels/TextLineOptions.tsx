import { FC, useContext } from 'react'
import DropdownWithFilter from '../../../shared/components/DropdownWithFilter'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'

const TextLineOptions: FC<{ index: number }> = ({ index }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)

  return (
    <div>
      <DropdownWithFilter
        id="text-line-column-dropdown"
        list={workersData?.columns || []}
        onSelect={(eventKey) => {
          dispatch({
            type: FormatAction.SET_TEXT_LINE,
            column: eventKey,
            index,
          })
        }}
        toggleText={chartOptions.textLineColumns[index]}
        label={'Column'}
      />
    </div>
  )
}

export default TextLineOptions
