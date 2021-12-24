import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import {
  ColorMap,
  FormatAction,
} from '../ChartCreater/data/dataFormattingReducer'

const ColorPicker: React.FC = () => {
  const { workersData, unmappedGroupings, columns, columnMap, dispatch } =
    useContext(WorkerDataContext)

  const colorMap = useRef<ColorMap>({})

  let nWorkers = workersData?.length

  const uniqueValues = [
    ...new Set(workersData?.map((w, i) => w[columnMap?.colorBasis || ''])),
  ].sort((a, b) => (a < b ? -1 : 1))

  const startingColors = []
  for (let v of uniqueValues) {
    startingColors.push({
      value: v,
      color: 'hsl(318, 73%, 22%)',
    })
  }

  return (
    <React.Fragment>
      <Form.Group>
        How would you like to map your values to colors?
        {startingColors.map(({ value, color }) => (
          <InputGroup key={value}>
            <InputGroup.Text>{value}</InputGroup.Text>
            <FormControl
              type="color"
              value={color}
              onBlur={(e) => {
                console.log('blur', e.target.value)
                colorMap.current[value] = e.target.value
              }}
            ></FormControl>
          </InputGroup>
        ))}
      </Form.Group>
      <Button
        onClick={() => {
          dispatch({
            type: FormatAction.SET_COLORS,
            colorMap: colorMap.current,
          })
        }}
      >
        Apply
      </Button>
    </React.Fragment>
  )
}

export default ColorPicker
