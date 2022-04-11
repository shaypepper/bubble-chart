import * as React from 'react'
import { useContext } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, Form } from 'react-bootstrap'
import { FormatAction, Steps } from '../data/dataFormattingReducer'
import WorkersInput from './WorkersInput'
import GroupingsInput from './GroupingsInput'
import BubbleChart from '..'

const BaseForm: React.FC = ({ children }) => {
  const { dispatch, stratifiedData, currentStep } =
    useContext(WorkerDataContext)

  return <Form>{children}</Form>
}

export default BaseForm
