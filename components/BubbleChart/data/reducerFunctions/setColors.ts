import { ColorMap, Column } from '../types'
import { State } from '../dataFormattingReducer'

export function setColorColumn(state: State, column: Column) {
  const newChartOptions = state.chartOptions.duplicate()
  newChartOptions.colors.currentColumn = column
  newChartOptions.colors.colorMap[column] =
    newChartOptions.colors.colorMap[column] || {}
  return { ...state, chartOptions: newChartOptions }
}

export function setColorMap(state: State, colorMap: ColorMap) {
  const { currentColumn } = state.chartOptions.colors
  const newChartOptions = state.chartOptions.duplicate()
  newChartOptions.colors.currentColumn = currentColumn
  newChartOptions.colors.colorMap[currentColumn] = {
    ...newChartOptions.colors.colorMap[currentColumn],
    ...colorMap,
  }
  return { ...state, chartOptions: newChartOptions }
}
