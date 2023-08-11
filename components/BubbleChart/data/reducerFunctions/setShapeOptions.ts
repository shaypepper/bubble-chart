import { ShapeOptionsKeys, Value } from '../types'
import { State } from '../dataFormattingReducer'
import { Shapes } from '../../shapes/Shape'

export function setShapeOption(
  state: State,
  optionType: ShapeOptionsKeys,
  value: string | boolean | Value | Shapes,
  shapeIndex: number
) {
  const newChartOptions = state.chartOptions.duplicate()

  switch (optionType) {
    case ShapeOptionsKeys.USE:
      if (typeof value === 'boolean') {
        newChartOptions.shapes[shapeIndex][ShapeOptionsKeys.USE] = value
      }
      break

    case ShapeOptionsKeys.VALUE:
    case ShapeOptionsKeys.COLOR:
    case ShapeOptionsKeys.COLUMN:
    case ShapeOptionsKeys.LABEL:
      if (typeof value === 'string') {
        newChartOptions.shapes[shapeIndex][optionType] = value
      }
      break
    case ShapeOptionsKeys.SHAPE:
      if (value) {
        newChartOptions.shapes[shapeIndex][optionType] = value as Shapes
      }
  }

  return { ...state, chartOptions: newChartOptions }
}
export default setShapeOption
