import { DSVRowArray } from 'd3'
import { Workers } from '../types'
import { State } from '../dataFormattingReducer'

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
    grouping: '',
  })

  return {
    ...state,
    workersData,
  }
}

export default loadWorkers
