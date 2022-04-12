import { FC, useContext, useMemo, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  ToggleButton,
} from 'react-bootstrap'
import * as DropdownMenu from 'react-bootstrap/lib/DropdownMenu'
import ListOfColumns from '../../../shared/components/ListOfColumns'
import { pxToRem } from '../../../shared/tokens/spacing'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { StarOptionsKeys, Value } from '../../types'
import { configTitleClass } from '../styles'

let colorsList = ['orange', 'red', 'blue', 'green', 'purple', 'yellow']

const StarOptionsForm: FC<{ starIndex: number }> = ({ starIndex = 0 }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)
  console.log(chartOptions)
  const [toggleActive, setToggleActive] = useState(true)

  const column = chartOptions.stars[starIndex]?.column
  const active = chartOptions.stars[starIndex]?.use

  const value = useMemo<Value>(
    () => chartOptions.stars[starIndex]?.value,
    [chartOptions, starIndex]
  )

  const possibleValues = useMemo<Set<Value>>(
    () => workersData?.listValues(column) || new Set(),
    [column, workersData]
  )

  const starColor = useMemo<string>(
    () => chartOptions.stars[starIndex]?.color,
    [chartOptions, starIndex]
  )

  return (
    <div>
      <h3 className={configTitleClass}>Star options</h3>
      {starColor}
      <Form>
        <Form.Group>
          <Form.Check
            id={`use-star-${starIndex + 1}`}
            type="switch"
            label={`Use Star ${starIndex + 1}`}
            onChange={() => {
              setToggleActive((state) => !state)
              dispatch({
                type: FormatAction.SET_STAR_OPTION,
                optionType: StarOptionsKeys.USE,
                value: toggleActive,
                starIndex,
              })
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="star-options-label">
            Label for legend
            <Form.Control name="star-options-label" disabled={!active} />
          </Form.Label>
        </Form.Group>
        <ListOfColumns
          onSelect={(eventKey) => {
            dispatch({
              type: FormatAction.SET_STAR_OPTION,
              optionType: StarOptionsKeys.COLUMN,
              value: `${eventKey}`,
              starIndex,
            })
          }}
          toggleText={column || '------'}
          columnList={workersData?.columns || []}
          disabled={!active}
        />

        {column && (
          <Form.Group key={`${value}`}>
            <Form.Label htmlFor="star-options-column">
              Add column value
              <Dropdown
                role="select"
                onSelect={(eventKey) => {
                  dispatch({
                    type: FormatAction.SET_STAR_OPTION,
                    optionType: StarOptionsKeys.VALUE,
                    value: eventKey,
                    starIndex,
                  })
                }}
              >
                <Dropdown.Toggle
                  variant="outline-primary"
                  id="dropdown-basic"
                  value={'Name'}
                  disabled={!active}
                >
                  {value || '------'}
                </Dropdown.Toggle>
                <Dropdown.Menu role="select">
                  {[...possibleValues].map((v) => (
                    <Dropdown.Item key={`${v}`} eventKey={`${v}`}>
                      {v}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Label>
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>Color</Form.Label>
          <ButtonGroup>
            {colorsList.map((color) => {
              return (
                <ToggleButton
                  key={color}
                  disabled={!active}
                  size={'sm'}
                  style={{
                    backgroundColor: color,
                    border: 'none',
                    marginRight: pxToRem(4),
                  }}
                  checked={color === starColor}
                  value={color}
                  onClick={() => {
                    dispatch({
                      type: FormatAction.SET_STAR_OPTION,
                      optionType: StarOptionsKeys.COLOR,
                      value: color,
                      starIndex,
                    })
                  }}
                >
                  {color}
                </ToggleButton>
              )
            })}
          </ButtonGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default StarOptionsForm
