import { FC, ReactEventHandler, useState } from 'react'
import { Button, Dropdown, Form, FormControl } from 'react-bootstrap'

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
  const [value, setValue] = useState<string>()
  return (
    <Form.Group key={label.replace(' ', '')}>
      <Form.Label>
        {label}
        <Dropdown role="select" onSelect={onSelect}>
          <Dropdown.Toggle id="dropdown-basic" disabled={disabled} size="sm">
            {toggleText}
          </Dropdown.Toggle>

          <Dropdown.Menu role="select">
            <FormControl
              autoFocus
              size="sm"
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {columnList
              .filter(
                (col) =>
                  !value || col.toLowerCase().startsWith(value.toLowerCase())
              )
              .map((col) => (
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
