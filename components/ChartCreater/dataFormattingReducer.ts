import {
  DSVParsedArray,
  DSVRowArray,
  HierarchyNode,
  stratify,
  StratifyOperator,
} from 'd3'
import { Reducer } from 'react'

export type Person = {
  [key: string | number]: any
}

const s = (v: any) => `${v}`

enum StandardColumn {
  NAME = 'name',
  grouping = 'grouping',
  ASSESSMENT = 'assessment',
}

export type ColumnMap = {
  name?: string
  grouping?: string
  assessment?: number
}

export interface State {
  /** Uploaded csv workers data  */
  workersData?: DSVParsedArray<Person>
  /** Uploaded csv groupings data  */
  groupingsData?: DSVParsedArray<Person>
  /** Do we need a map of column names? */
  awaitingColumnMap?: boolean
  /** Map of standardized labels to csv columns */
  columnMap: ColumnMap

  /** List of available columns from CSV */
  columns?: (string | number)[]

  /** set of all names */
  allPeople?: Set<string>

  /** Stratified Data */
  stratifiedData?: HierarchyNode<Person>

  /** groupings that are neither the root nor have their own grouping listed */
  unmappedGroupings?: Set<string>

  /** Stratification function */
  stratify?: StratifyOperator<DSVRowArray>

  /** Which column should determine fill/text color? */
  colorColumn?: string
  //** Which values should map to which colors? */
  colorMap?: {
    [v: string]: string
  }
}

export enum FormatAction {
  UPLOAD_WORKERS_CSV = 'uploadWorkers',
  SET_COLUMN_MAP = 'seetColumnMap',
  SELECT_NAME_FIELD = 'selectNameField',
  SELECT_grouping_FIELD = 'selectgroupingField',
  UPLOAD_GROUPINGS_CSV = 'uploadGroupings',
  STRATIFY_DATA = 'stratifyData',
}

export type Action =
  | {
      type: FormatAction.UPLOAD_WORKERS_CSV
      parsedData: DSVParsedArray<Person>
    }
  | {
      type: FormatAction.UPLOAD_GROUPINGS_CSV
      parsedData: DSVParsedArray<Person>
    }
  | {
      type: FormatAction.SET_COLUMN_MAP
      columnMap: ColumnMap
    }
  | {
      type: FormatAction.SELECT_NAME_FIELD
      nameColumn: string
    }
  | {
      type: FormatAction.SELECT_grouping_FIELD
      groupingColumn: string
    }
  | {
      type: FormatAction.STRATIFY_DATA
    }

export interface FormatActionArg {
  type: FormatAction
  payload: any
}

const dataFormattingReducer: Reducer<State, Action> = (
  state,
  action
): State => {
  console.log('dispatch', state, action)
  switch (action.type) {
    case FormatAction.UPLOAD_WORKERS_CSV:
      return uploadWorkers(state, action.parsedData)
    case FormatAction.SET_COLUMN_MAP:
      return createColumnMap(state, action.columnMap)
    case FormatAction.UPLOAD_GROUPINGS_CSV:
      return uploadGroupings(state, action.parsedData)
    case FormatAction.STRATIFY_DATA:
      return stratifyData(state)
    default:
      return state
  }
}

export default dataFormattingReducer

function uploadWorkers(
  state: State,
  parsedData: DSVParsedArray<Person>
): State {
  return {
    ...state,
    workersData: parsedData,
    columns: parsedData.columns,
  }
}

function uploadGroupings(
  state: State,
  parsedData: DSVParsedArray<Person>
): State {
  const nameKey = state.columnMap.name || ''
  const groupingKey = state.columnMap.grouping || ''

  const newUnmappedGroupingset = new Set(state.unmappedGroupings)
  const newAllPeople = new Set(state.allPeople)
  parsedData.forEach((grouping) => {
    const groupingName = s(grouping[nameKey])
    if (newUnmappedGroupingset.has(groupingName)) {
      newUnmappedGroupingset.delete(groupingName)
    }

    if (!newUnmappedGroupingset.has(groupingName)) {
      newUnmappedGroupingset.delete(groupingName)
    }

    newAllPeople.add(groupingName)
  })
  return {
    ...state,
    groupingsData: parsedData,
    unmappedGroupings: newUnmappedGroupingset,
    allPeople: newAllPeople,
  }
}

function createColumnMap(state: State, columnMap: ColumnMap): State {
  state.workersData?.forEach((worker) => {
    Object.entries(columnMap).forEach(([key, mappedKey]) => {
      worker[key] = worker[mappedKey]
    })
  })
  const nameKey = columnMap.name || ''
  const groupingKey = columnMap.grouping || ''
  const workerNameList = new Set<string>()
  state?.workersData?.forEach((worker) => {
    workerNameList.add(s(worker[nameKey]))
  })

  const unlistedGroupingset = new Set<string>()

  state?.workersData?.forEach((worker) => {
    const workerGroup = s(worker[groupingKey])
    if (!workerNameList.has(workerGroup)) {
      unlistedGroupingset.add(workerGroup)
    }
  })

  return {
    ...state,
    workersData: state.workersData,
    unmappedGroupings: unlistedGroupingset,
    allPeople: workerNameList,
    columnMap,
  }
}

function stratifyData(state: State): State {
  const strat = stratify<Person>()
    .id((d) => `${d?.[state.columnMap.name || '']}`)
    .parentId((d) => `${d?.[state.columnMap.grouping || '']}`)
  if (!state.workersData || !state.groupingsData) {
    return state
  }
  const stratifiedData = strat([...state.workersData, ...state.groupingsData])
    .sum(() => 1)
    .sort((a, b) => (b?.value || 0) - (a?.value || 0))

  return { ...state, stratifiedData }
}
