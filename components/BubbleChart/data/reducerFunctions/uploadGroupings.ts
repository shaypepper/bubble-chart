import { DSVRowArray } from 'd3'
import { Groupings } from '../../types'
import { State } from '../dataFormattingReducer'

export function uploadGroupings(
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

  const unmappedGroupings = new Set(prevState.unmappedGroupings)

  return {
    ...prevState,
    groupingsData: groupings,
    unmappedGroupings,
  }
}

export default uploadGroupings
