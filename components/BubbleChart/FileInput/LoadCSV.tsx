import * as React from 'react'
import { useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { FormatAction } from '../data/dataFormattingReducer'
import DropdownWithFilter from '../../shared/components/DropdownWithFilter'
import { pxToRem } from '../../shared/tokens/spacing'

const columnMapLabels: { [s: string]: string } = {
  uniqueIdentifier: 'Unique identifier',
  displayName: 'Display name',
  primaryGrouping: '1st Grouping',
  secondaryGrouping: '2nd Grouping (optional)',
}

const LoadCSV: React.FC<{
  csvType: 'worker' | 'grouping'
}> = ({ children = 'Load your outreach data', csvType }) => {
  const { convertCsv, dispatch, workersData } = useContext(WorkerDataContext)
  const action = FormatAction.LOAD_WORKERS_CSV

  const convertedCsv = workersData

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div>
        {children}

        <Form.Group>
          <Form.Label htmlFor={`${csvType}-data"`}>
            <Form.Control
              size="sm"
              className={'form-control'}
              ref={inputRef}
              type="file"
              name={`${csvType}-data"`}
              accept=".csv"
              placeholder={'Choose a CSV file with your worker data'}
              onChange={() => {
                if (!inputRef.current) return
                const files = inputRef.current.files
                if (files) {
                  convertCsv(action, files)
                }
              }}
            />
          </Form.Label>
          <Form.Label>
            <Button
              variant={'secondary'}
              size="sm"
              style={{ marginBottom: pxToRem(4), marginLeft: pxToRem(6) }}
              onClick={() => {
                dispatch({ type: FormatAction.LOAD_EXAMPLE_DATA })
              }}
            >
              ...or load example data
            </Button>
          </Form.Label>
        </Form.Group>

        {convertedCsv && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'max-content max-content max-content max-content',
              gridGap: pxToRem(20),
            }}
          >
            {Object.entries(convertedCsv.columnMap).map(
              ([key, columnLabel]) => (
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
              )
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default LoadCSV
