import * as React from 'react'
import { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { FormatAction } from '../data/dataFormattingReducer'
import DropdownWithFilter from '../../shared/components/DropdownWithFilter'

const UploadCSV: React.FC<{
  label: string
  csvType: 'worker' | 'grouping'
}> = ({ label = 'Upload your outreach data', csvType }) => {
  const { convertCsv, columns, dispatch, workersData, groupingsData } =
    useContext(WorkerDataContext)
  const action =
    csvType == 'worker'
      ? FormatAction.UPLOAD_WORKERS_CSV
      : FormatAction.UPLOAD_GROUPINGS_CSV
  const convertedCsv = csvType == 'worker' ? workersData : groupingsData

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={`${csvType}-data"`}>
          {label}
          <Form.Control
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
        Object.entries(convertedCsv.columnMap).map(
          ([key, columnLabel]) =>
            (
              <DropdownWithFilter
                list={convertedCsv.columns || []}
                label={key}
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
            ) || (
              <Form.Group key={key}>
                <Form.Label>
                  Which column should be used for the {csvType}s&apos; {key}?
                  <Dropdown
                    role="select"
                    onSelect={(eventKey) => {
                      dispatch({
                        type: FormatAction.SET_COLUMN_MAP,
                        columnMap: {
                          [key]: eventKey,
                        },
                        listFromCsv: convertedCsv,
                      })
                    }}
                  >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {columnLabel}
                    </Dropdown.Toggle>

                    <Dropdown.Menu role="select">
                      {(convertedCsv.columns || []).map((col) => (
                        <Dropdown.Item key={col} eventKey={col} as={Button}>
                          {col}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Label>
              </Form.Group>
            )
        )}
    </>
  )
}

export default UploadCSV
