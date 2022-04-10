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

export type ColorMap = {
  [key: string | number]: string
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
  colorBasis?: string
}

export interface State {
  /**  Current step in the process */
  currentStep: Steps
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

export enum Steps {
  UPLOAD_WORKERS = 1,
  CHOOSE_COLUMNS = 2,
  UPLOAD_GROUPINGS = 3,
  CHOOSE_COLOR_SCHEME = 4,
  DRAW = 5,
}

export enum FormatAction {
  UPLOAD_WORKERS_CSV = 'uploadWorkers',
  SET_COLUMN_MAP = 'setColumnMap',
  SELECT_NAME_FIELD = 'selectNameField',
  SELECT_grouping_FIELD = 'selectgroupingField',
  UPLOAD_GROUPINGS_CSV = 'uploadGroupings',
  STRATIFY_DATA = 'stratifyData',
  SET_COLORS = 'setColors',
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
      type: FormatAction.SET_COLORS
      colorMap: ColorMap
    }
  | {
      type: FormatAction.STRATIFY_DATA
    }

interface FormatActionArg {
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

    case FormatAction.SET_COLORS:
      console.log(action.colorMap)
      return { ...state, colorMap: action.colorMap, currentStep: Steps.DRAW }
    default:
      return state
  }
}

export default dataFormattingReducer

function uploadWorkers(
  state: State,
  parsedData: DSVParsedArray<Person>
): State {
  if (!parsedData.length) {
    return state
  }

  return {
    ...state,
    workersData: parsedData,
    columns: parsedData.columns,
    currentStep: Steps.CHOOSE_COLUMNS,
  }
}

function uploadGroupings(
  prevState: State,
  parsedData: DSVParsedArray<Person>
): State {
  const nameKey = prevState.columnMap.name || ''
  const groupingKey = prevState.columnMap.grouping || ''

  const unmappedGroupings = new Set(prevState.unmappedGroupings)
  // const newAllPeople = new Set(prevState.allPeople)
  // parsedData.forEach((grouping) => {
  //   const groupingName = s(grouping[nameKey])
  //   if (unmappedGroupings.has(groupingName)) {
  //     unmappedGroupings.delete(groupingName)
  //   }

  //   if (!unmappedGroupings.has(groupingName)) {
  //     unmappedGroupings.delete(groupingName)
  //   }

  //   newAllPeople.add(groupingName)
  // })
  return {
    ...prevState,
    groupingsData: parsedData,
    unmappedGroupings,
    // allPeople: newAllPeople,
    currentStep: Steps.CHOOSE_COLOR_SCHEME,
  }
}

function createColumnMap(state: State, columnMap: ColumnMap): State {
  let newState = { ...state, columnMap }

  state.workersData?.forEach((worker) => {
    Object.entries(columnMap).forEach(([key, mappedKey]) => {
      worker[key] = worker[mappedKey]
    })
  })
  const nameKey = columnMap.name || ''
  const groupingKey = columnMap.grouping || ''
  const colorBasis = columnMap.colorBasis || ''

  const workerNameList = new Set<string>()
  state?.workersData?.forEach((worker) => {
    workerNameList.add(s(worker[nameKey]))
  })

  const unmappedGroupings = new Set<string>()

  state.workersData?.forEach((worker) => {
    const workerGroup = s(worker[groupingKey])
    if (!workerNameList.has(workerGroup)) {
      unmappedGroupings.add(workerGroup)
    }
  })

  newState.allPeople = workerNameList

  const colorValueSet = new Set(
    state.workersData?.map((worker) => worker[colorBasis])
  )

  if (unmappedGroupings.size == 1) {
    newState.unmappedGroupings = new Set()
    newState.currentStep = Steps.CHOOSE_COLOR_SCHEME
  } else {
    newState.unmappedGroupings = unmappedGroupings
    newState.currentStep = Steps.UPLOAD_GROUPINGS
  }

  return newState
}

function stratifyData(state: State): State {
  const strat = stratify<Person>()
    .id((d) => `${d?.[state.columnMap.name || '']}`)
    .parentId((d) => `${d?.[state.columnMap.grouping || '']}`)
  if (!state.workersData) {
    return state
  }

  const wtf = [...state.workersData, ...(state.groupingsData || [])].filter(
    (d) => !!d?.[state.columnMap.name || '']
  )
  const stratifiedData = strat(wtf)
    // const stratifiedData = strat([...state.workersData])
    .sum(() => 1)
    .sort((a, b) => (b?.value || 0) - (a?.value || 0))

  return { ...state, stratifiedData }
}
