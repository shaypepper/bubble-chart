import { BubbleShape } from '../types'
import { State } from '../dataFormattingReducer'

export function setBubbleShape(state: State, bubbleShape: BubbleShape): State {
  const newChartOptions = state.chartOptions.duplicate()
  newChartOptions.bubbleShape = bubbleShape

  return {
    ...state,
    chartOptions: newChartOptions,
  }
}
