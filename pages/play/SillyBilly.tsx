import { Selection, select } from 'd3'
import * as React from 'react'

type SillyBillyComponentProps = {
  shayIsCool: boolean
}

const SillyBillyComponent: React.FC<SillyBillyComponentProps> = ({
  shayIsCool,
}) => (
  <svg>
    {' '}
    <text>{shayIsCool ? 'Shay is so cool!' : 'Shay is very not cool!'}</text>
  </svg>
)

export default SillyBillyComponent
