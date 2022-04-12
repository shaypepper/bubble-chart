import { DSVParsedArray } from 'd3'
import { Groupings, Person } from '../../types'
import { State } from '../dataFormattingReducer'

export function uploadGroupings(
  prevState: State,
  parsedData: DSVParsedArray<Person>
): State {
  const groupings = new Groupings(
    parsedData,
    prevState.chartOptions,
    prevState.groupingsData?.columnMap || {
      uniqueIdentifier: '',
      displayName: '',
      grouping: '',
    }
  )

  const unmappedGroupings = new Set(prevState.unmappedGroupings)

  return {
    ...prevState,
    groupingsData: groupings,
    unmappedGroupings,
  }
}

export default uploadGroupings
