import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Button, Dropdown, Form } from 'react-bootstrap'
import {
  ColumnMap,
  FormatAction,
} from '../ChartCreater/data/dataFormattingReducer'

const MapColumns: React.FC = () => {
  const { columns, workersData, dispatch, unmappedGroupings } =
    useContext(WorkerDataContext)

  const [tempColumnMap, setTempColumnMap] = useState<ColumnMap>({
    name: undefined,
    grouping: undefined,
    colorBasis: undefined,
  })

  return (
    <React.Fragment>
      {Object.entries(tempColumnMap).map(([key, label]) => (
        <Form.Group key={key}>
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
        </Form.Group>
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
    </React.Fragment>
  )
}

export default MapColumns
