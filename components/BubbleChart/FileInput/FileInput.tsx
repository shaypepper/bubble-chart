import * as React from 'react'
import { useContext } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, Form, ToggleButton } from 'react-bootstrap'
import { FormatAction, Steps } from '../data/dataFormattingReducer'
import BubbleChart from '..'
import UploadCSV from './UploadCSV'

const FileInput: React.FC = () => {
  const { dispatch, stratifiedData, currentStep } =
    useContext(WorkerDataContext)

  const goToStep = (step: Steps) => () => {
    dispatch({ type: FormatAction.GO_TO_STEP, step })
  }

  return (
    <>
      <Form>
        {currentStep === Steps.UPLOAD_WORKERS && (
          <UploadCSV label={'Upload workers data'} csvType={'worker'} />
        )}

        {currentStep === Steps.UPLOAD_GROUPINGS && (
          <UploadCSV label={'Upload groupings data'} csvType={'grouping'} />
        )}
      </Form>
    </>
  )
}

export default FileInput
