import { minIndex } from 'd3-array'
import { FC, useContext } from 'react'
import ListOfColumns from '../../../shared/components/ListOfColumns'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'

const TextLineOptions: FC<{ index: number }> = ({ index }) => {
  const { workersData, dispatch } = useContext(WorkerDataContext)
  return (
    <div>
      <h3>Text line {minIndex}</h3>
      <ListOfColumns
        columnList={workersData?.columns || []}
        onSelect={(eventKey) => {
          dispatch({
            type: FormatAction.SET_TEXT_LINE,
            column: Column,
            index,
          })
        }}
        toggleText={'  '}
        label={'   '}
      />
    </div>
  )
}

export default TextLineOptions
