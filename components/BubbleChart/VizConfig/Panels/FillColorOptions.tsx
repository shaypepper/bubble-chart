import { BaseSyntheticEvent, FC, useContext, useState } from 'react'
import { css } from '@emotion/css'
import {
  FormControl,
  ListGroup,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap'
import { Autocomplete, TextField } from '@mui/material'
import { deepGrey, white } from '../../../shared/tokens/colors'
import { pxToRem } from '../../../shared/tokens/spacing'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { Value } from '../../data/types'
import { MiniBubbleSVG } from '../../Bubble/MiniBubble'
import ColorGrid from './ColorGrid'

const valueListClass = css`
  overflow: scroll;
  height: 300px;
`

const colorPickerClass = css`
  display: inline-block;
  margin-right: ${pxToRem(6)};
`

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
    <div
      className={css`
        grid-gap: 16px;
        display: grid;
        grid-template-coumns: 1fr;
      `}
    >
      <Autocomplete
        id="fill-color-dropdown"
        options={columnList}
        size="small"
        onChange={(e: BaseSyntheticEvent) => {
          dispatch({
            type: FormatAction.SET_COLOR_COLUMN,
            column: e.target.textContent,
          })
        }}
        renderInput={(params) => <TextField {...params} label={`Column`} />}
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
                size="sm"
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
                        <Popover.Body style={{ minWidth: '200px' }}>
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
