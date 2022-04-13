import { StarOptionsKeys, Value } from '../../types'
import { State } from '../dataFormattingReducer'

export function setStarOption(
  state: State,
  optionType: StarOptionsKeys,
  value: string | boolean | Value,
  starIndex: number
) {
  const newChartOptions = state.chartOptions.duplicate()

  // if (!newChartOptions.stars[starIndex]) {
  //   newChartOptions.stars[starIndex] = {
  //     [StarOptionsKeys.COLOR]: '',
  //     [StarOptionsKeys.COLUMN]: '',
  //     [StarOptionsKeys.VALUE]: '',
  //     [StarOptionsKeys.LABEL]: '',
  //     [StarOptionsKeys.USE]: false,
  //   }
  // }

  switch (optionType) {
    case StarOptionsKeys.USE:
      if (typeof value === 'boolean') {
        newChartOptions.stars[starIndex][StarOptionsKeys.USE] = value
      }
      break

    case StarOptionsKeys.VALUE:
    case StarOptionsKeys.COLOR:
    case StarOptionsKeys.COLUMN:
    case StarOptionsKeys.LABEL:
      if (typeof value === 'string') {
        newChartOptions.stars[starIndex][optionType] = value
      }
  }

  return { ...state, chartOptions: newChartOptions }
}
export default setStarOption
