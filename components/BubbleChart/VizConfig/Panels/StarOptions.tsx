import { FC, useContext, useMemo } from 'react'
import { Form } from 'react-bootstrap'
import DropdownWithFilter from '../../../shared/components/DropdownWithFilter'

import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { StarOptionsKeys, Value } from '../../data/types'
import ColorGrid from './ColorGrid'

const StarOptionsForm: FC<{ starIndex: number }> = ({ starIndex = 0 }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)

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
      <Form>
        <Form.Group>
          <Form.Check
            id={`use-star-${starIndex + 1}`}
            type="switch"
            label={`Use Star ${starIndex + 1}`}
            checked={active}
            onChange={() => {
              dispatch({
                type: FormatAction.SET_STAR_OPTION,
                optionType: StarOptionsKeys.USE,
                value: !active,
                starIndex,
              })
            }}
          />
        </Form.Group>

        {active && (
          <>
            <DropdownWithFilter
              id="star-options-column-dropdown"
              onSelect={(eventKey) => {
                dispatch({
                  type: FormatAction.SET_STAR_OPTION,
                  optionType: StarOptionsKeys.COLUMN,
                  value: `${eventKey}`,
                  starIndex,
                })
              }}
              toggleText={column || '------'}
              list={workersData?.columns || []}
              disabled={!active}
              label={'Column'}
            />

            {column && (
              <DropdownWithFilter
                id="star-options-value-dropdown"
                list={[...possibleValues].map((v) => `${v}`)}
                onSelect={(eventKey) => {
                  dispatch({
                    type: FormatAction.SET_STAR_OPTION,
                    optionType: StarOptionsKeys.VALUE,
                    value: eventKey,
                    starIndex,
                  })
                }}
                label={'Value'}
                toggleText={`${chartOptions.stars[starIndex].value}` || ''}
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
                        optionType: StarOptionsKeys.COLOR,
                        value: color,
                        starIndex,
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

export default StarOptionsForm
