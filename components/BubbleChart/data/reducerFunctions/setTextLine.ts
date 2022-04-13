import { Column } from '../../types'
import { State } from '../dataFormattingReducer'

export function setTextLine(
  state: State,
  column: Column,
  index: number
): State {
  const newChartOptions = state.chartOptions.duplicate()
  newChartOptions.textLineColumns[index] = column

  return {
    ...state,
    chartOptions: newChartOptions,
  }
}
