import { FC, useContext, useMemo } from 'react'
import { Form } from 'react-bootstrap'
import DropdownWithFilter from '../../../shared/components/DropdownWithFilter'

import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { ShapeOptionsKeys, Value } from '../../data/types'
import ColorGrid from './ColorGrid'

const ShapeOptionsForm: FC<{ shapeIndex: number }> = ({ shapeIndex = 0 }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)

  const column = chartOptions.shapes[shapeIndex]?.column
  const active = chartOptions.shapes[shapeIndex]?.use

  const value = useMemo<Value>(
    () => chartOptions.shapes[shapeIndex]?.value,
    [chartOptions, shapeIndex]
  )

  const possibleValues = useMemo<Set<Value>>(
    () => workersData?.listValues(column) || new Set(),
    [column, workersData]
  )

  const shapeColor = useMemo<string>(
    () => chartOptions.shapes[shapeIndex]?.color,
    [chartOptions, shapeIndex]
  )

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Check
            id={`use-shape-${shapeIndex + 1}`}
            type="switch"
            label={`Use Shape ${shapeIndex + 1}`}
            checked={active}
            onChange={() => {
              dispatch({
                type: FormatAction.SET_STAR_OPTION,
                optionType: ShapeOptionsKeys.USE,
                value: !active,
                shapeIndex,
              })
            }}
          />
        </Form.Group>

        {active && (
          <>
            <DropdownWithFilter
              id="shape-options-column-dropdown"
              onSelect={(eventKey) => {
                dispatch({
                  type: FormatAction.SET_STAR_OPTION,
                  optionType: ShapeOptionsKeys.COLUMN,
                  value: `${eventKey}`,
                  shapeIndex,
                })
              }}
              toggleText={column || '------'}
              list={workersData?.columns || []}
              disabled={!active}
              label={'Column'}
            />

            {column && (
              <DropdownWithFilter
                id="shape-options-value-dropdown"
                list={[...possibleValues].map((v) => `${v}`)}
                onSelect={(eventKey) => {
                  dispatch({
                    type: FormatAction.SET_STAR_OPTION,
                    optionType: ShapeOptionsKeys.VALUE,
                    value: eventKey,
                    shapeIndex,
                  })
                }}
                label={'Value'}
                toggleText={`${chartOptions.shapes[shapeIndex].value}` || ''}
              />
            )}

            {column && value && (
              <Form.Group>
                <Form.Label style={{ width: '80%' }}>
                  Color
                  <ColorGrid
                    generateOnClick={(color) => () => {
                      dispatch({
                        type: FormatAction.SET_STAR_OPTION,
                        optionType: ShapeOptionsKeys.COLOR,
                        value: color,
                        shapeIndex,
                      })
                    }}
                    noText
                    disabled={!active}
                  />
                </Form.Label>
              </Form.Group>
            )}
          </>
        )}
      </Form>
    </div>
  )
}

export default ShapeOptionsForm
