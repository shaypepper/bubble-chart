import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Button, Form } from 'react-bootstrap'
import { FormatAction, Steps } from '../ChartCreater/data/dataFormattingReducer'
import BubbleChart from '../BubbleChart'
import WorkersInput from './WorkersInput'
import GroupingsInput from './GroupingsInput'
import ColorPicker from './ColorPicker'
import MapColumns from './MapColumns'

const FileInput: React.FC = () => {
  const { dispatch, unmappedGroupings, stratifiedData, currentStep } =
    useContext(WorkerDataContext)

  return (
    <Form>
      {currentStep === Steps.UPLOAD_WORKERS && <WorkersInput />}

      {currentStep === Steps.CHOOSE_COLUMNS && <MapColumns />}

      {currentStep === Steps.UPLOAD_GROUPINGS && <GroupingsInput />}

      {currentStep === Steps.CHOOSE_COLOR_SCHEME && <ColorPicker />}

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

      {Array.from(unmappedGroupings || [])?.map((m) => (
        <p key={m}>{m}</p>
      ))}
    </Form>
  )
}

export default FileInput
