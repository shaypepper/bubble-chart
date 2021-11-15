import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { ColumnMap, FormatAction } from '../ChartCreater/dataFormattingReducer'
import BubbleChart from '../BubbleChart'
import WorkersInput from './WorkersInput'
import GroupingsInput from './GroupingsInput'
import ColorInput from './ColorPicker'

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
      <ColorInput />
      {!workersData && <WorkersInput />}
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

      {!!unmappedGroupings?.size && <GroupingsInput />}

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
