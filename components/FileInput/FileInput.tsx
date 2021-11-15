import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { ColumnMap, FormatAction } from '../ChartCreater/dataFormattingReducer'
import BubbleChart from '../BubbleChart'

const FileInput: React.FC = () => {
  const {
    convertGroupingCsv,
    convertWorkerCsv,
    columns,
    workersData,
    columnMap,
    dispatch,
    unmappedGroupings,
    stratifiedData,
  } = useContext(WorkerDataContext)

  console.log({ unmappedGroupings, workersData })
  const outreachDataInputRef = useRef<HTMLInputElement>(null)
  const groupingListInputRef = useRef<HTMLInputElement>(null)
  const [tempColumnMap, setTempColumnMap] = useState<ColumnMap>({
    name: undefined,
    grouping: undefined,
  })

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Pick a color, any color!
          <Form.Control type="color"></Form.Control>
        </Form.Label>
      </Form.Group>
      {!workersData && (
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
      )}
      {workersData && !columnMap && (
        <Form.Group>
          {Object.entries(tempColumnMap).map(([key, label]) => (
            <React.Fragment key={key}>
              <Form.Label>
                Which column should be used for the workers&apos; {key}?
                <Dropdown
                  role="select"
                  onSelect={(eventKey, event) => {
                    setTempColumnMap((currentTempColumnMap) => ({
                      ...currentTempColumnMap,
                      [key]: eventKey,
                    }))
                  }}
                >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {label}
                  </Dropdown.Toggle>

                  <Dropdown.Menu role="select">
                    {(columns || []).map((col) => (
                      <Dropdown.Item key={col} eventKey={col} as={Button}>
                        {col}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Label>
              <br />
            </React.Fragment>
          ))}

          <Button
            onClick={() => {
              dispatch({
                type: FormatAction.SET_COLUMN_MAP,
                columnMap: tempColumnMap,
              })
            }}
          >
            Apply
          </Button>
        </Form.Group>
      )}

      {!!unmappedGroupings?.size && (
        <Form.Group>
          <Form.Label htmlFor="grouping-data">
            It seems that you are missing some grouping data. There are{' '}
            {Array.from(unmappedGroupings || []).length} workers whose groupings
            haven&apos;t been uploaded (Ex.{' '}
            {Array.from(unmappedGroupings || [])
              .slice(0, 2)
              .join(', ')}
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
      )}

      {!unmappedGroupings?.size && workersData && columnMap && (
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
