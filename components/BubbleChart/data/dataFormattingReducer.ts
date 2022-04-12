import { DSVRowArray, HierarchyNode, StratifyOperator } from 'd3'
import { Reducer } from 'react'
import {
  ChartOptions,
  ColorMap,
  ColorMapByColumn,
  Column,
  ColumnMap,
  Groupings,
  ListFromCSV,
  Node,
  StarOptionsKeys,
  Value,
  Workers,
} from '../types'
import {
  createColumnMap,
  setStarOption,
  setTextLine,
  stratifyData,
  uploadGroupings,
  uploadWorkers,
} from './reducerFunctions'
import { setColorColumn, setColorMap } from './reducerFunctions/setColors'

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
  SET_TEXT_LINE = 'setTextLine',
  SET_COLOR_COLUMN = 'setColorColumn',
  SET_COLOR_MAP = 'setColorMap',
  RESET_CHART_FRAME = 'resetChartFrame',
}

export type Action =
  | {
      type: FormatAction.UPLOAD_WORKERS_CSV
      parsedData: DSVRowArray<string>
    }
  | {
      type: FormatAction.UPLOAD_GROUPINGS_CSV
      parsedData: DSVRowArray<string>
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
  | {
      type: FormatAction.SET_TEXT_LINE
      column: Column
      index: number
    }
  | { type: FormatAction.SET_COLOR_COLUMN; column: Column }
  | { type: FormatAction.SET_COLOR_MAP; colorMap: ColorMap }
  | {
      type: FormatAction.RESET_CHART_FRAME
      x: number
      y: number
      scale: number
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

    case FormatAction.SET_TEXT_LINE:
      newState = setTextLine(state, action.column, action.index)

    case FormatAction.SET_COLOR_COLUMN:
      newState = setColorColumn(state, action.column)
      break

    case FormatAction.SET_COLOR_MAP:
      newState = setColorMap(state, action.colorMap)
      break

    default:
      newState = state
  }

  return stratifyData(newState)
}

export default dataFormattingReducer
