import { FC, useState } from 'react'
import { Button, Dropdown, Form, FormControl } from 'react-bootstrap'

const DropdownWithFilter: FC<{
  list: string[]
  label?: string
  toggleText: string
  onSelect: (eventKey: any) => void
  disabled?: boolean
  id: string
}> = ({
  list,
  label = 'Label TK',
  onSelect,
  toggleText,
  disabled = false,
  id,
}) => {
  const [value, setValue] = useState<string>()
  return (
    <Form.Group>
      <Form.Label>
        {label}
        <Dropdown role="select" onSelect={onSelect}>
          <Dropdown.Toggle
            size="sm"
            id={id || `dropdownBasic${label.replace(' ', '')}`}
            disabled={disabled}
          >
            {toggleText || `Choose a ${label.toLowerCase()}...`}
          </Dropdown.Toggle>

          <Dropdown.Menu role="select">
            <FormControl
              size="sm"
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {list
              .filter(
                (col: string) =>
                    !value || col.toLowerCase().includes(value.toLowerCase())
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
