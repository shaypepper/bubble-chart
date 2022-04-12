import { indexes, minIndex } from 'd3-array'
import { FC, useContext, useState } from 'react'
import ListOfColumns from '../../../shared/components/ListOfColumns'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { Column, StarOptionsKeys } from '../../types'

const TextLineOptions: FC<{ index: number }> = ({ index }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)
  const [toggleActive, setToggleActive] = useState(true)

  return (
    <div>
      <ListOfColumns
        columnList={workersData?.columns || []}
        onSelect={(eventKey) => {
          console.log('dispatching!')
          dispatch({
            type: FormatAction.SET_TEXT_LINE,
            column: eventKey,
            index,
          })
        }}
        toggleText={chartOptions.textLineColumns[index]}
        label={'   '}
      />
    </div>
  )
}

export default TextLineOptions
