import { StarOptionsKeys, Value } from '../../types'
import { State } from '../dataFormattingReducer'

export function setStarOption(
  state: State,
  optionType: StarOptionsKeys,
  value: Value,
  starIndex: number
) {
  const newChartOptions = state.chartOptions.duplicate()

  if (!newChartOptions.stars[starIndex]) {
    newChartOptions.stars[starIndex] = {
      color: '',
      column: '',
      value: '',
      label: '',
    }
  }
  newChartOptions.stars[starIndex][optionType] = value

  return { ...state, chartOptions: newChartOptions }
}
export default setStarOption
