import * as React from 'react'
import { useContext } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, Form } from 'react-bootstrap'
import { FormatAction, Steps } from '../data/dataFormattingReducer'
import WorkersInput from './WorkersInput'
import GroupingsInput from './GroupingsInput'
import MapColumns from './MapColumns'
import BubbleChart from '..'

const FileInput: React.FC = () => {
  const { dispatch, stratifiedData, currentStep } =
    useContext(WorkerDataContext)

  return (
    <Form>
      {currentStep === Steps.UPLOAD_WORKERS && <WorkersInput />}

      {currentStep === Steps.CHOOSE_COLUMNS && <MapColumns />}

      {currentStep === Steps.UPLOAD_GROUPINGS && <GroupingsInput />}

      {currentStep === Steps.DRAW && (
        <Button
          onClick={() => {
            dispatch({ type: FormatAction.STRATIFY_DATA })
          }}
        >
          Draw!
        </Button>
      )}

      {stratifiedData && <BubbleChart />}
    </Form>
  )
}

export default FileInput
