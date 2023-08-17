import { State } from '../dataFormattingReducer'
import { ColorOptions, Column, ShapeOptions } from '../types'

export function uploadConfigJSON(state: State, configJSONString: string) {
  const newChartOptions = state.chartOptions.duplicate()
  let parsedConfig: {
    shapes: ShapeOptions[]
    textLineColumns: Column[]
    colors: ColorOptions
  }
  try {
    parsedConfig = JSON.parse(configJSONString)
  } catch {
    console.log('there is a parsing issue')
    return { ...state, chartOptions: newChartOptions }
  }

  newChartOptions.colors.currentColumn =
    parsedConfig.colors?.currentColumn || newChartOptions.colors.currentColumn
  Object.assign(newChartOptions.colors.colorMap, parsedConfig.colors.colorMap)

  parsedConfig.shapes?.forEach((s, i) => {
    Object.assign(newChartOptions.shapes[i], s)
  })
  parsedConfig.textLineColumns.forEach((t, i) => {
    newChartOptions.textLineColumns[i] = parsedConfig.textLineColumns[i] || t
  })

  return { ...state, chartOptions: newChartOptions }
}
export default uploadConfigJSON
