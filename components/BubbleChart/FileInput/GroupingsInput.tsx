import { useContext, useRef, useState, FC } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Form } from 'react-bootstrap'

const GroupingsInput: FC = () => {
  const { convertGroupingCsv, unmappedGroupings } =
    useContext(WorkerDataContext)

  const groupingListInputRef = useRef<HTMLInputElement>(null)
  const unmappedGroupingsArray = Array.from(unmappedGroupings || [])

  return (
    <Form.Group>
      <Form.Label htmlFor="grouping-data">
        It seems that you are missing some grouping data. There are{' '}
        {unmappedGroupingsArray.length} workers whose groupings haven&apos;t
        been uploaded (Ex. {unmappedGroupingsArray.slice(0, 2).join(', ')}
        ...). Upload your grouping data here:
        <Form.Control
          className={'form-control'}
          ref={groupingListInputRef}
          type="file"
          name="outreach-data"
          accept=".csv"
          onChange={() => {
            if (!groupingListInputRef.current) return
            const files = groupingListInputRef.current.files
            if (files) {
              convertGroupingCsv(files)
            }
          }}
        />
      </Form.Label>
    </Form.Group>
  )
}

export default GroupingsInput
