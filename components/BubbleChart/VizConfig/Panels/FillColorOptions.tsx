import { css } from 'pretty-lights'
import { FC, useContext } from 'react'
import { Form } from 'react-bootstrap'
import DropdownWithFilter from '../../../shared/components/DropdownWithFilter'
import ListOfColumns from '../../../shared/components/ListOfColumns'
import { red } from '../../../shared/tokens/colors'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'

const FillColorOptions: FC<{}> = ({}) => {
  const { workersData, dispatch } = useContext(WorkerDataContext)
  const columnList = workersData?.columns || []
  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor="star-options-label">
          Label for legend
          <Form.Control name="star-options-label" />
        </Form.Label>
      </Form.Group>
      <DropdownWithFilter
        toggleText={'Column would go here'}
        label="Column"
        list={columnList}
        onSelect={() => {
          dispatch({
            type: FormatAction.SET_COLORS,
            colorMap: {},
          })
        }}
      />
    </div>
  )
}

export default FillColorOptions
