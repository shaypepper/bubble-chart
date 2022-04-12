import { FC, useState } from 'react'
import { Button, Dropdown, Form, FormControl } from 'react-bootstrap'

const DropdownWithFilter: FC<{
  list: string[]
  label?: string
  toggleText: string
  onSelect: (eventKey: any) => void
  disabled?: boolean
}> = ({ list, label = 'Label TK', onSelect, toggleText, disabled = false }) => {
  const [value, setValue] = useState<string>()
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
            <FormControl
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {list
              .filter(
                (col: string) =>
                  !value || col.toLowerCase().startsWith(value.toLowerCase())
              )
              .map((col: string) => (
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

export default DropdownWithFilter
