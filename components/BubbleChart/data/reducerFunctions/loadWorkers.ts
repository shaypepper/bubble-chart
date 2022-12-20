import { DSVRowArray } from 'd3'
import { Workers } from '../types'
import { State } from '../dataFormattingReducer'
import {
  exampleColumnMap,
  exampleData,
  exampleStarOptions,
} from '../../exampleData'
import { loadStarOptions } from './setStarOptions'
import { setTextLine } from './setTextLine'
import { createColumnMap } from '.'

export function loadWorkers(
  state: State,
  parsedData: DSVRowArray<string>
): State {
  if (!parsedData.length) {
    return state
  }

  const workersData = new Workers(parsedData, state.chartOptions, {
    uniqueIdentifier: '',
    displayName: '',
    primaryGrouping: '',
    secondaryGrouping: '',
  })

  return {
    ...state,
    workersData,
  }
}

export function loadExampleWorkersAndChartOptions(state: State) {
  let newState = loadWorkers(state, exampleData)
  if (newState.workersData) {
    newState = createColumnMap(newState, exampleColumnMap, newState.workersData)
    newState = loadStarOptions(newState, exampleStarOptions)
    newState = setTextLine(newState, 'Text', 0)
  }
  console.log(newState.workersData?.columns)
  return { ...newState }
}

export default loadWorkers
