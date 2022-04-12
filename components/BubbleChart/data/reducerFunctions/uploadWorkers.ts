import { DSVParsedArray } from 'd3'
import { Person, Workers } from '../../types'
import { State } from '../dataFormattingReducer'

export function uploadWorkers(
  state: State,
  parsedData: DSVParsedArray<Person>
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
    columns: parsedData.columns.map(toString),
  }
}

export default uploadWorkers
