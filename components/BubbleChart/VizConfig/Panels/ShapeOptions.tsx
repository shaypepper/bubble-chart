import { BaseSyntheticEvent, FC, useContext, useMemo, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FormGroup from '@mui/material/FormGroup'

import { css } from '@emotion/css'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { ShapeOptionsKeys, Value } from '../../data/types'
import { Flag } from '../../shapes/Shape'
import { MiniBubbleSVG } from '../../Bubble/MiniBubble'
import ColorGrid from './ColorGrid'
import ShapeGrid from './ShapeGrid'

const ShapeOptionsForm: FC<{ shapeIndex: number }> = ({ shapeIndex = 0 }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)
  const current = chartOptions.shapes[shapeIndex]
  const column = current?.column
  const active = current?.use
  const [formats, setFormats] = useState<string[]>(active ? ['use'] : [])

  const possibleValues = useMemo<Set<Value>>(
    () => workersData?.listValues(column) || new Set(),
    [column, workersData]
  )
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [popoverType, setPopoverType] = useState<string>('')

  const handlePopoverClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    if (newFormats.includes('use') && !active) {
      dispatch({
        type: FormatAction.SET_SHAPE_OPTION,
        optionType: ShapeOptionsKeys.USE,
        value: true,
        shapeIndex,
      })
    } else if (!newFormats.includes('use') && active) {
      dispatch({
        type: FormatAction.SET_SHAPE_OPTION,
        optionType: ShapeOptionsKeys.USE,
        value: false,
        shapeIndex,
      })
    }
    setFormats(newFormats)
  }

  return (
    <div>
      <FormGroup
        className={css`
          grid-gap: 16px;
        `}
      >
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          size="small"
          className={css`
            grid-column: span 2;
          `}
        >
          <ToggleButton
            value="use"
            selected={active}
            // onClick={(e) => console.log('click!', e)}
          >
            {active ? <Visibility /> : <VisibilityOff />}
          </ToggleButton>
          <ToggleButton
            value="shape"
            selected={false}
            disabled={!active}
            aria-describedby={id}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setPopoverType('shape')
              setAnchorEl(event.currentTarget)
            }}
          >
            <Flag
              shape={current.shape}
              color={active ? 'black' : 'gainsboro'}
              height={20}
            />
            <ArrowDropDown />
          </ToggleButton>
          <ToggleButton
            value="shape"
            selected={false}
            disabled={!active}
            aria-describedby={id}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setPopoverType('color')
              setAnchorEl(event.currentTarget)
            }}
          >
            <MiniBubbleSVG
              fillColor={active ? current.color : 'gainsboro'}
              textColor={'transparent'}
            />
            <ArrowDropDown />
          </ToggleButton>
        </ToggleButtonGroup>

        <div>
          <Autocomplete
            id="shape-options-column-dropdown"
            onChange={(e: BaseSyntheticEvent) => {
              dispatch({
                type: FormatAction.SET_SHAPE_OPTION,
                optionType: ShapeOptionsKeys.COLUMN,
                value: `${e.target.textContent}`,
                shapeIndex,
              })
            }}
            options={workersData?.columns || []}
            disabled={!active}
            renderInput={(params) => (
              <TextField {...params} label={`Column`} size="small" />
            )}
            value={current.column}
          />
        </div>
        <div>
          {column && (
            <Autocomplete
              id="shape-options-value-dropdown"
              options={[...possibleValues].map((v) => `${v}`)}
              onChange={(e: BaseSyntheticEvent, values) => {
                dispatch({
                  type: FormatAction.SET_SHAPE_VALUES,
                  values: values as Value[],
                  shapeIndex,
                })
              }}
              disabled={!active}
              renderInput={(params) => (
                <TextField {...params} label={`Value`} size="small" />
              )}
              multiple
              value={current?.values?.map((v) => new String(v))}
            />
          )}
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div
            className={css`
              padding: 10px;
              min-width: fit-content;
            `}
          >
            {popoverType === 'shape' ? (
              <ShapeGrid
                generateOnClick={(shape) => () => {
                  dispatch({
                    type: FormatAction.SET_SHAPE_OPTION,
                    optionType: ShapeOptionsKeys.SHAPE,
                    value: shape,
                    shapeIndex,
                  })
                }}
                fillColor="black"
              />
            ) : (
              <ColorGrid
                generateOnClick={(color) => () => {
                  dispatch({
                    type: FormatAction.SET_SHAPE_OPTION,
                    optionType: ShapeOptionsKeys.COLOR,
                    value: color,
                    shapeIndex,
                  })
                }}
                noText
                selectedColor={current.color}
              />
            )}
          </div>
        </Popover>
      </FormGroup>
    </div>
  )
}

export default ShapeOptionsForm
