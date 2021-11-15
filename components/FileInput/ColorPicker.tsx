import React, { useContext, useRef, useState } from 'react'
import { WorkerDataContext } from '../BubbleChart/WorkerDataProvider'
import { Form } from 'react-bootstrap'

const ColorInput: React.FC = () => {
  const { workersData, unmappedGroupings } = useContext(WorkerDataContext)

  return (
    <Form.Group>
      <Form.Label>
        Pick a color, any color!
        <Form.Control type="color"></Form.Control>
      </Form.Label>
    </Form.Group>
  )
}

export default ColorInput
