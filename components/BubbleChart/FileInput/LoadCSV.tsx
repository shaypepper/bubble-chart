import * as React from 'react'
import { useContext, useRef } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Form } from 'react-bootstrap'
import { FormatAction } from '../data/dataFormattingReducer'
import DropdownWithFilter from '../../shared/components/DropdownWithFilter'

const columnMapLabels: { [s: string]: string } = {
  uniqueIdentifier: 'Unique identifier',
  displayName: 'Display name',
  grouping: 'Grouping',
}

const LoadCSV: React.FC<{
  label: string
  csvType: 'worker' | 'grouping'
}> = ({ label = 'Load your outreach data', csvType }) => {
  const { convertCsv, dispatch, workersData, groupingsData } =
    useContext(WorkerDataContext)
  const action =
    csvType == 'worker'
      ? FormatAction.LOAD_WORKERS_CSV
      : FormatAction.LOAD_GROUPINGS_CSV
  const convertedCsv = csvType == 'worker' ? workersData : groupingsData

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={`${csvType}-data"`}>
          {label}
          <Form.Control
            size="sm"
            className={'form-control'}
            ref={inputRef}
            type="file"
            name={`${csvType}-data"`}
            accept=".csv"
            onChange={() => {
              if (!inputRef.current) return
              const files = inputRef.current.files
              if (files) {
                convertCsv(action, files)
              }
            }}
          />
        </Form.Label>
      </Form.Group>
      {convertedCsv &&
        Object.entries(convertedCsv.columnMap).map(([key, columnLabel]) => (
          <DropdownWithFilter
            id={`${key}-dropdown-for-csv`}
            list={convertedCsv.columns || []}
            label={columnMapLabels[`${key}`]}
            key={key}
            toggleText={columnLabel || 'Select column...'}
            onSelect={(eventKey) => {
              dispatch({
                type: FormatAction.SET_COLUMN_MAP,
                columnMap: {
                  [key]: eventKey,
                },
                listFromCsv: convertedCsv,
              })
            }}
          />
        ))}
    </>
  )
}

export default LoadCSV
