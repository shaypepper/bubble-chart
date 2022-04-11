import {
  csvParse,
  DSVParsedArray,
  DSVRowArray,
  HierarchyNode,
  stratify,
  StratifyOperator,
} from 'd3'
import { Reducer } from 'react'
import {
  ChartOptions,
  ColumnMap,
  Grouping,
  Groupings,
  ListFromCSV,
  Person,
  StarOptionsKeys,
  Workers,
} from '../types'

export type ColorMap = {
  [key: string]: string
}

const toString = (v: any) => `${v}`

export interface State {
  /**  Current step in the process */
  currentStep: Steps
  /** Workers data object generated from CSV  */
  workersData?: Workers
  /** Groupings data object generated from CSV  */
  groupingsData?: Groupings

  /** List of available columns from CSV */
  columns?: string[]

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

  chartOptions: ChartOptions
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
  GO_TO_STEP = 'goToStep',
  SET_STAR_OPTION = 'setStarOption',
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
      listFromCsv: ListFromCSV
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
  | { type: FormatAction.GO_TO_STEP; step: Steps }
  | {
      type: FormatAction.SET_STAR_OPTION
      optionType: StarOptionsKeys
      value: Set<string> | string
      starIndex: number
    }

const dataFormattingReducer: Reducer<State, Action> = (
  state,
  action
): State => {
  let newState
  console.log('dispatch', state, action)
  switch (action.type) {
    case FormatAction.GO_TO_STEP:
      newState = { ...state, currentStep: action.step }
      break
    case FormatAction.UPLOAD_WORKERS_CSV:
      return uploadWorkers(state, action.parsedData)
    case FormatAction.SET_COLUMN_MAP:
      newState = createColumnMap(state, action.columnMap, action.listFromCsv)
      let { uniqueIdentifier, displayName, grouping } =
        action.listFromCsv.columnMap
      if (!uniqueIdentifier || !displayName || !grouping) {
        return newState
      }
      break
    case FormatAction.UPLOAD_GROUPINGS_CSV:
      newState = uploadGroupings(state, action.parsedData)
      break
    case FormatAction.STRATIFY_DATA:
      newState = stratifyData(state)
      break

    case FormatAction.SET_STAR_OPTION:
      newState = setStarOption(
        state,
        action.optionType,
        action.value,
        action.starIndex
      )

    case FormatAction.SET_COLORS:
      newState = {
        ...state,
        colorMap: action.colorMap,
        currentStep: Steps.DRAW,
      }
      break
    default:
      newState = state
  }

  return stratifyData(newState)
}

export default dataFormattingReducer

function uploadWorkers(
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

function uploadGroupings(
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

function createColumnMap(
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

function stratifyData(state: State): State {
  let { workersData, groupingsData } = state

  if (!groupingsData) {
    const fauxCsv = csvParse(
      `${workersData?.columnMap.uniqueIdentifier},${workersData?.columnMap.displayName},${workersData?.columnMap.grouping}\n`
    )
    groupingsData = new Groupings(
      fauxCsv,
      state.chartOptions,
      workersData?.columnMap || {
        uniqueIdentifier: '',
        displayName: '',
        grouping: '',
      }
    )
  }

  const workerGroupings = workersData?.groupings || new Set()
  const parentGroupings = groupingsData?.groupings || new Set()

  const uniqueIdentifier = groupingsData?.columnMap.uniqueIdentifier
  const displayName = groupingsData?.columnMap.displayName
  const grouping = groupingsData?.columnMap.grouping

  if (groupingsData.groupings.has('')) {
    groupingsData.list.find((g) => {
      if (!g.grouping) {
        g.rawData[grouping] = 'allGroups'
      }
    })
  }

  if (workersData?.groupings.has('')) {
    workersData.list.find((g) => {
      if (!g.grouping) {
        g.rawData[grouping] = 'allGroups'
      }
    })
  }

  if (groupingsData.ids.has(undefined)) {
    groupingsData.list.find((g) => {
      if (g.id === 'allGroups') {
        g.rawData[uniqueIdentifier] = Math.ceil(Math.random() * 123)
      }
    })
  }

  if (!groupingsData.ids.has('allGroups')) {
    groupingsData?.list.push(
      new Grouping(
        {
          [grouping || '*']: '',
          [uniqueIdentifier || '**']: 'allGroups',
          [displayName || '***']: 'allGroups',
        },
        groupingsData
      )
    )
  }

  for (let groupingId of [...workerGroupings, ...parentGroupings]) {
    if (
      groupingsData?.ids.has(groupingId) ||
      !groupingId ||
      groupingId === 'allGroups'
    )
      continue
    groupingsData?.list.push(
      new Grouping(
        {
          [grouping || '*']: 'allGroups',
          [uniqueIdentifier || '**']: groupingId,
          [displayName || '***']: groupingId,
        },
        groupingsData
      )
    )
  }

  const strat = stratify<Person>()
    .id((d) => `${d?.id}`)
    .parentId((d) => `${d?.grouping}`)
  if (!state.workersData) {
    return state
  }

  const wtf = [...state.workersData.list, ...(groupingsData?.list || [])]
  console.log(wtf.filter((d) => d.id === undefined))
  let stratifiedData
  try {
    stratifiedData = strat(wtf)
      // const stratifiedData = strat([...state.workersData])
      .sum(() => 1)
      .sort((a, b) => (b?.value || 0) - (a?.value || 0))
  } catch (err) {
    console.log('**** ERROR', err)
  }
  return { ...state, stratifiedData }
}

function setStarOption(
  state: State,
  optionType: StarOptionsKeys,
  value: Set<string> | string,
  starIndex: number
) {
  const newChartOptions = state.chartOptions.duplicate()

  if (!newChartOptions.stars[starIndex]) {
    newChartOptions.stars[starIndex] = {
      color: '',
      column: '',
      values: new Set(),
      label: '',
    }
  }
  newChartOptions.stars[starIndex][optionType] = value

  return { ...state, chartOptions: newChartOptions }
}
