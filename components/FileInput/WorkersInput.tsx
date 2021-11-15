import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Form } from 'react-bootstrap'

const WorkersInput: React.FC = () => {
  const { convertWorkerCsv, workersData, unmappedGroupings } =
    useContext(WorkerDataContext)

  const outreachDataInputRef = useRef<HTMLInputElement>(null)

  return workersData ? null : (
    <Form.Group>
      <Form.Label htmlFor="outreach-data">
        Upload your outreach data:
        <Form.Control
          className={'form-control'}
          ref={outreachDataInputRef}
          type="file"
          name="outreach-data"
          accept=".csv"
          onChange={() => {
            if (!outreachDataInputRef.current) return
            const files = outreachDataInputRef.current.files
            if (files) {
              convertWorkerCsv(files)
            }
          }}
        />
      </Form.Label>
    </Form.Group>
  )
}

export default WorkersInput
