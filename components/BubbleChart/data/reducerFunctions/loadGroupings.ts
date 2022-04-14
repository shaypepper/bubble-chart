import { DSVRowArray } from 'd3'
import { Groupings } from '../types'
import { State } from '../dataFormattingReducer'

export function loadGroupings(
  prevState: State,
  parsedData: DSVRowArray<string>
): State {
  const groupings = new Groupings(
    parsedData,
    prevState.groupingsData?.columnMap || {
      uniqueIdentifier: '',
      displayName: '',
      grouping: '',
    }
  )
  return {
    ...prevState,
    groupingsData: groupings,
  }
}

export default loadGroupings
