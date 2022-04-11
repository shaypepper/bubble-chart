import * as React from 'react'
import { useContext } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, ButtonGroup, Form, ToggleButton } from 'react-bootstrap'
import { FormatAction, Steps } from '../data/dataFormattingReducer'
import WorkersInput from './WorkersInput'
import GroupingsInput from './GroupingsInput'
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
        {/* {currentStep === Steps.UPLOAD_WORKERS && <WorkersInput />} */}
        {currentStep === Steps.UPLOAD_WORKERS && (
          <UploadCSV label={'Upload workers data'} csvType={'worker'} />
        )}

        {currentStep === Steps.CHOOSE_COLUMNS && <></>}

        {currentStep === Steps.UPLOAD_GROUPINGS && (
          <UploadCSV label={'Upload groupings data'} csvType={'grouping'} />
        )}

        {currentStep === Steps.DRAW && (
          <Button
            onClick={() => {
              dispatch({ type: FormatAction.STRATIFY_DATA })
            }}
          >
            Draw!
          </Button>
        )}

        {false && stratifiedData && <BubbleChart />}
      </Form>
      <div>
        <ButtonGroup defaultValue={Steps.UPLOAD_WORKERS}>
          <ToggleButton
            size={'sm'}
            onClick={goToStep(Steps.UPLOAD_WORKERS)}
            value={Steps.UPLOAD_WORKERS}
          >
            Upload Workers
          </ToggleButton>
          <ToggleButton
            size={'sm'}
            onClick={goToStep(Steps.UPLOAD_GROUPINGS)}
            value={Steps.UPLOAD_GROUPINGS}
          >
            Upload Groupings
          </ToggleButton>
        </ButtonGroup>
      </div>
    </>
  )
}

export default FileInput
