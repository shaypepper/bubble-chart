import { FC, ReactEventHandler } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'

import { Column } from '../../BubbleChart/types'

const ListOfColumns: FC<{
  columnList: Column[]
  label?: string
  toggleText: string
  onSelect: (eventKey: any) => void
  disabled?: boolean
}> = ({
  columnList,
  label = 'Column',
  onSelect,
  toggleText,
  disabled = false,
}) => {
  return (
    <Form.Group>
      <Form.Label>
        {label}
        <Dropdown role="select" onSelect={onSelect}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            disabled={disabled}
          >
            {toggleText}
          </Dropdown.Toggle>

          <Dropdown.Menu role="select">
            {columnList.map((col) => (
              <Dropdown.Item key={col} eventKey={col} as={Button}>
                {col}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Label>
    </Form.Group>
  )
}

export default ListOfColumns
