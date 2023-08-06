import { ColumnMap, ListFromCSV } from '../types'
import { State } from '../dataFormattingReducer'

export function createColumnMap(
  state: State,
  columnMap: Partial<ColumnMap>,
  listFromCSV: ListFromCSV
): State {
  // This could be either a Workers object or a Groupings object
  listFromCSV.columnMap = {
    ...listFromCSV.columnMap,
    ...columnMap,
  }
  return { ...state }
}
