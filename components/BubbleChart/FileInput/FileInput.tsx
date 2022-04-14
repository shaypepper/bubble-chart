import * as React from 'react'
import { useContext } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, Form, ToggleButton } from 'react-bootstrap'
import { FormatAction, Steps } from '../data/dataFormattingReducer'
import BubbleChart from '..'
import LoadCSV from './LoadCSV'

const FileInput: React.FC = () => {
  const { dispatch, stratifiedData, currentStep } =
    useContext(WorkerDataContext)

  const goToStep = (step: Steps) => () => {
    dispatch({ type: FormatAction.GO_TO_STEP, step })
  }

  return (
    <>
      <Form>
        {currentStep === Steps.LOAD_WORKERS && (
          <LoadCSV
            label={'Choose a CSV file with your worker data!'}
            csvType={'worker'}
          />
        )}

        {currentStep === Steps.LOAD_GROUPINGS && (
          <LoadCSV label={'Load groupings data'} csvType={'grouping'} />
        )}
      </Form>
    </>
  )
}

export default FileInput
