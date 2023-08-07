import { ShapeOptionsKeys, Value } from '../types'
import { State } from '../dataFormattingReducer'

export function setShapeOption(
  state: State,
  optionType: ShapeOptionsKeys,
  value: string | boolean | Value,
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
  }

  return { ...state, chartOptions: newChartOptions }
}
export default setShapeOption
