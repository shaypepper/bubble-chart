import { BubbleShape } from '../data/types'
import { Shapes } from '../shapes/Shape'
import { ConfigPanel } from '../VizConfig/VizConfig'

export type BubbleProps = {
  displayName: string
  radius?: number
  bubbleFillColor?: string
  innerTextColor?: string
  bubbleShape?: BubbleShape
  translation?: {
    x: number
    y: number
  }
  textLines?: string[]
  editMode?: boolean
  width?: number | string
  generateOnClick?: (s: ConfigPanel) => () => void
  onClick?: () => void
  shapes?: { fillColor: string; show: boolean; shape: Shapes }[]
  id?: string
}
