import { BaseSyntheticEvent, FC, useContext, useState } from 'react'
import { css } from '@emotion/css'
import {
  Autocomplete,
  List,
  TextField,
  ListItem,
  Popover,
  ListSubheader,
} from '@mui/material'
import { deepGrey, white } from '../../../shared/tokens/colors'
import { pxToRem } from '../../../shared/tokens/spacing'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { Value } from '../../data/types'
import { MiniBubbleSVG } from '../../Bubble/MiniBubble'
import ColorGrid from './ColorGrid'

const valueListClass = css`
  overflow: scroll;
  max-height: 300px;
`

const colorPickerClass = css`
  display: inline-block;
  margin-right: ${pxToRem(6)};
`

const FillColorOptions: FC<{}> = ({}) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverKey, setPopoverKey] = useState<string>('')
  const open = Boolean(anchorEl)

  const handlePopoverClose = () => setAnchorEl(null)

  const columnList = workersData?.columns || []
  const colorColumn = chartOptions.colors.currentColumn

  const [valueListFilter, setValueListFilter] = useState<string>('')
  const valueList =
    workersData &&
    chartOptions.colors?.currentColumn &&
    [...workersData?.listValues(chartOptions.colors.currentColumn)].filter(
      (val: Value) =>
        !valueListFilter ||
        `${val}`.toLowerCase().includes(valueListFilter.toLowerCase())
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
          <List>
            <ListSubheader disableGutters>
              <TextField
                autoFocus
                placeholder="Type to filter..."
                onChange={(e) => setValueListFilter(e.target.value)}
                value={valueListFilter}
                size="small"
              />
            </ListSubheader>
            {valueList.map((val) => {
              const v = `${val}`
              const { fillColor: rowFillColor, textColor: rowTextColor } =
                chartOptions.colors.colorMap[colorColumn][`${v}`] || {
                  fillColor: deepGrey,
                  textColor: white,
                }

              return (
                <ListItem
                  key={`${v}`}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget)
                    setPopoverKey(v)
                  }}
                  disableGutters
                >
                  <div className={colorPickerClass}>
                    <MiniBubbleSVG
                      fillColor={rowFillColor}
                      textColor={rowTextColor}
                    />
                  </div>
                  {v || '(No value)'}
                </ListItem>
              )
            })}
          </List>
          <Popover
            id={`popover`}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            style={{ padding: '10px' }}
          >
            <div style={{ padding: '10px' }}>
              <ColorGrid
                generateOnClick={(color, textColor) => () => {
                  dispatch({
                    type: FormatAction.SET_COLOR_MAP,
                    colorMap: {
                      [popoverKey]: {
                        fillColor: color,
                        textColor: textColor,
                      },
                    },
                  })
                }}
              />
            </div>
          </Popover>
        </div>
      )}
    </div>
  )
}

export default FillColorOptions
