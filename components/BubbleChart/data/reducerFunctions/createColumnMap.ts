import { ColumnMap, ListFromCSV } from '../types'
import { State } from '../dataFormattingReducer'

/**
 *
 * @param state State
 * @param columnMap ColumnMap
 * @param listFromCSV listFromCSV
 * @returns State
 */
export function createColumnMap(
  state: State,
  columnMap: ColumnMap,
  listFromCSV: ListFromCSV
): State {
  // This could be either a Workers object or a Groupings object
  listFromCSV.columnMap = {
    ...listFromCSV.columnMap,
    ...columnMap,
  }
  return { ...state }
}
