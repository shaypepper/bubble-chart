import {
  csvParse,
  csvParseRows,
  dsv,
  DSVParsedArray,
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
  Node,
  Person,
  StarOptionsKeys,
  Value,
  Workers,
} from '../types'
import {
  createColumnMap,
  setStarOption,
  stratifyData,
  uploadGroupings,
  uploadWorkers,
} from './reducerFunctions'

export type ColorMap = {
  [key: string]: string
}

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
  stratifiedData?: HierarchyNode<Node>

  /** groupings that are neither the root nor have their own grouping listed */
  unmappedGroupings?: Set<string>

  /** Stratification function */
  stratify?: StratifyOperator<DSVParsedArray<Person>>

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
  TOGGLE_STAR = 'toggleStarUse',
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
      value: Value
      starIndex: number
    }
  | {
      type: FormatAction.TOGGLE_STAR
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
      break

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
