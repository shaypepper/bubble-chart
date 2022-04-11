import { FC, useContext, useMemo, useState } from 'react'
import { Dropdown, Form, FormGroup, InputGroup } from 'react-bootstrap'
import * as DropdownMenu from 'react-bootstrap/lib/DropdownMenu'
import { FormatAction } from '../data/dataFormattingReducer'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { StarOptionsKeys, Value } from '../types'
import { configTitleClass } from './styles'

const StarOptionsForm: FC<{ starIndex: number }> = ({ starIndex = 0 }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)
  console.log(chartOptions)

  const column = chartOptions.stars[starIndex]?.column

  const values = useMemo<Set<Value>>(
    () => chartOptions.stars[starIndex]?.values || new Set(),
    [chartOptions, starIndex]
  )

  const possibleValues = useMemo<Set<Value>>(
    () => workersData?.listValues(column) || new Set(),
    [column, workersData]
  )

  return (
    <div>
      <h3 className={configTitleClass}>Star options</h3>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="star-options-label">
            Label for legend
            <Form.Control name="star-options-label" />
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="star-options-column">
            Column
            <Dropdown
              role="select"
              onSelect={(eventKey) => {
                dispatch({
                  type: FormatAction.SET_STAR_OPTION,
                  optionType: StarOptionsKeys.COLUMN,
                  value: `${eventKey}`,
                  starIndex,
                })
              }}
            >
              <Dropdown.Toggle
                variant="outline-primary"
                id="dropdown-basic"
                value={'Name'}
              >
                {column || '------'}
              </Dropdown.Toggle>
              <Dropdown.Menu role="select">
                {(workersData?.columns || []).map((col) => (
                  <Dropdown.Item key={col} eventKey={col}>
                    {col}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Label>
        </Form.Group>

        {column &&
          [...values, '------'].map((value, i) => {
            return (
              <Form.Group key={value}>
                <Form.Label htmlFor="star-options-column">
                  Add column value
                  <Dropdown
                    role="select"
                    onSelect={(eventKey) => {
                      dispatch({
                        type: FormatAction.SET_STAR_OPTION,
                        optionType: StarOptionsKeys.VALUES,
                        value: new Set([...values, eventKey]),
                        starIndex,
                      })
                    }}
                  >
                    <Dropdown.Toggle
                      variant="outline-primary"
                      id="dropdown-basic"
                      value={'Name'}
                    >
                      {value || '------'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu role="select">
                      {[...possibleValues].map((v) => (
                        <Dropdown.Item key={v} eventKey={v}>
                          {v}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Label>
              </Form.Group>
            )
          })}
      </Form>
    </div>
  )
}

export default StarOptionsForm
