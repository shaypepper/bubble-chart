import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import {
  ColorMap,
  FormatAction,
} from '../ChartCreater/data/dataFormattingReducer'

const ColorPicker: React.FC = () => {
  const { workersData, unmappedGroupings, columns, columnMap, dispatch } =
    useContext(WorkerDataContext)

  const colorMap = useRef<ColorMap>({})

  const uniqueValues = [
    ...new Set(workersData?.map((w) => w[columnMap?.colorBasis || ''])),
  ].sort((a, b) => (a < b ? -1 : 1))

  return (
    <React.Fragment>
      <Form.Group>
        How would you like to map your values to colors?
        {uniqueValues.map((v) => (
          <InputGroup key={v}>
            <InputGroup.Text>{v}</InputGroup.Text>
            <FormControl
              type="color"
              onBlur={(e) => {
                console.log('blur', e.target.value)
                colorMap.current[v] = e.target.value
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
