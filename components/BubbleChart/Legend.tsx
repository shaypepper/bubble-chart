import { FC } from 'react'
import { MiniBubbleSVG } from './Bubble'

const Legend: FC = () => {
  return (
    <div>
      <ul>
        <li>
          <MiniBubbleSVG /> Value 1
        </li>
        <li>
          <MiniBubbleSVG /> Value 2
        </li>
        <li>
          <MiniBubbleSVG /> Value 3
        </li>
        <li>
          <MiniBubbleSVG /> Value 4
        </li>
        <li>
          <MiniBubbleSVG /> Value 5
        </li>
      </ul>
    </div>
  )
}

export default Legend
