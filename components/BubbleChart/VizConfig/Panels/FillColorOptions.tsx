import { cp } from 'fs'
import { css } from 'pretty-lights'
import { FC, useContext, useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap'
import DropdownWithFilter from '../../../shared/components/DropdownWithFilter'
import ListOfColumns from '../../../shared/components/ListOfColumns'
import { deepGrey, red, white } from '../../../shared/tokens/colors'
import { bangersFont } from '../../../shared/tokens/fonts'
import { pxToRem } from '../../../shared/tokens/spacing'
import { MiniBubbleSVG } from '../../Bubble'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { Value } from '../../types'
import ColorGrid from './ColorGrid'

const valueListClass = css`
  overflow: scroll;
  height: 300px;
`

const colorPickerClass = css`
  display: inline-block;
  margin-right: ${pxToRem(6)};
`

const valueKeyAndColor = css``
const FillColorOptions: FC<{}> = ({}) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)
  const columnList = workersData?.columns || []
  const colorColumn = chartOptions.colors.currentColumn

  const [valueListFilter, setValueListFilter] = useState<string>('')
  const valueList =
    workersData &&
    chartOptions.colors?.currentColumn &&
    [...workersData?.listValues(chartOptions.colors.currentColumn)].filter(
      (val: Value) =>
        !valueListFilter ||
        `${val}`.toLowerCase().startsWith(valueListFilter.toLowerCase())
    )
  valueList && valueList.sort()
  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor="star-options-label">
          Label for legend
          <Form.Control name="star-options-label" />
        </Form.Label>
      </Form.Group>
      <DropdownWithFilter
        toggleText={colorColumn || 'Choose column here...'}
        label="Column"
        list={columnList}
        onSelect={(eventKey) => {
          dispatch({
            type: FormatAction.SET_COLOR_COLUMN,
            column: eventKey,
          })
        }}
      />

      {valueList && (
        <div className={valueListClass}>
          <ListGroup>
            <ListGroup.Item>
              <FormControl
                autoFocus
                placeholder="Type to filter..."
                onChange={(e) => setValueListFilter(e.target.value)}
                value={valueListFilter}
              />
            </ListGroup.Item>
            {valueList.map((val) => {
              const v = `${val}`
              const { fillColor: rowFillColor, textColor: rowTextColor } =
                chartOptions.colors.colorMap[colorColumn][`${v}`] || {
                  fillColor: deepGrey,
                  textColor: white,
                }

              return (
                <ListGroup.Item key={`${v}`}>
                  <OverlayTrigger
                    trigger="click"
                    rootClose={true}
                    key={v}
                    placement={'left'}
                    overlay={
                      <Popover>
                        <Popover.Header as="h3">{`Fill color for ${v}`}</Popover.Header>
                        <Popover.Body>
                          <ColorGrid
                            generateOnClick={(color, textColor) => () => {
                              dispatch({
                                type: FormatAction.SET_COLOR_MAP,
                                colorMap: {
                                  [v]: {
                                    fillColor: color,
                                    textColor: textColor,
                                  },
                                },
                              })
                            }}
                          />
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <div className={colorPickerClass}>
                      <MiniBubbleSVG
                        fillColor={rowFillColor}
                        textColor={rowTextColor}
                      />
                    </div>
                  </OverlayTrigger>
                  {v || '(No value)'}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      )}
    </div>
  )
}

export default FillColorOptions
