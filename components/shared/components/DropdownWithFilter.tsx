import { FC, useState } from 'react'
import { css, cx } from 'pretty-lights'
import { Button, Dropdown, Form, FormControl } from 'react-bootstrap'

const optionListClass = css`
  height: 200px;
  overflow: scroll;
`

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
            <ul className={cx('list-unstyled', optionListClass)}>
              {list
                .filter(
                  (col: string) =>
                    !value || col.toLowerCase().includes(value.toLowerCase())
                )
                .map((col: string) => (
                  <li key={col}>
                    <Dropdown.Item eventKey={col} as={Button}>
                      {col}
                    </Dropdown.Item>
                  </li>
                ))}
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Label>
    </Form.Group>
  )
}

export default DropdownWithFilter
