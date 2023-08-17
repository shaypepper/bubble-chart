import { Reducer } from 'react'
import { DSVRowArray, HierarchyNode } from 'd3'
import {
  ChartOptions,
  ColorMap,
  Column,
  ColumnMap,
  ListFromCSV,
  Worker,
  ShapeOptionsKeys,
  Value,
  Workers,
  Grouping,
  BubbleShape,
} from './types'
import {
  createColumnMap,
  setShapeOption,
  setTextLine,
  stratifyData,
  loadWorkers,
  setColorColumn,
  setColorMap,
  loadExampleWorkersAndChartOptions,
} from './reducerFunctions'
import { setBubbleShape } from './reducerFunctions/setBubbleShape'
import uploadConfigJSON from './reducerFunctions/uploadConfigJSON'

export interface State {
  /**  Current step in the process */
  currentStep: Steps
  /** Workers data object generated from CSV  */
  workersData?: Workers

  /** Stratified Data */
  stratifiedData?: HierarchyNode<Worker | Grouping>

  chartOptions: ChartOptions
}

export enum Steps {
  LOAD_WORKERS = 1,
  CHOOSE_COLUMNS = 2,
  CHOOSE_COLOR_SCHEME = 3,
  DRAW = 4,
}

export enum FormatAction {
  LOAD_WORKERS_CSV = 'loadWorkers',
  SET_COLUMN_MAP = 'setColumnMap',
  SELECT_NAME_FIELD = 'selectNameField',
  SELECT_grouping_FIELD = 'selectgroupingField',
  STRATIFY_DATA = 'stratifyData',
  SET_COLORS = 'setColors',
  GO_TO_STEP = 'goToStep',
  SET_STAR_OPTION = 'setShapeOption',
  TOGGLE_STAR = 'toggleShapeUse',
  SET_TEXT_LINE = 'setTextLine',
  SET_COLOR_COLUMN = 'setColorColumn',
  SET_COLOR_MAP = 'setColorMap',
  RESET_CHART_FRAME = 'resetChartFrame',
  LOAD_EXAMPLE_DATA = 'loadExampleData',
  SET_BUBBLE_SHAPE = 'setBubbleShape',
  UPLOAD_CONFIG = 'upoadConfigJSON',
}

export type Action =
  | {
      type: FormatAction.LOAD_WORKERS_CSV
      parsedData: DSVRowArray<string>
    }
  | {
      type: FormatAction.SET_COLUMN_MAP
      columnMap: Partial<ColumnMap>
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
      optionType: ShapeOptionsKeys
      value: Value
      shapeIndex: number
    }
  | {
      type: FormatAction.TOGGLE_STAR
      shapeIndex: number
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
  | { type: FormatAction.LOAD_EXAMPLE_DATA }
  | { type: FormatAction.SET_BUBBLE_SHAPE; bubbleShape: BubbleShape }
  | { type: FormatAction.UPLOAD_CONFIG; json: string }

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

    case FormatAction.LOAD_WORKERS_CSV:
      return loadWorkers(state, action.parsedData)

    case FormatAction.SET_COLUMN_MAP:
      newState = createColumnMap(state, action.columnMap, action.listFromCsv)
      let { displayName, groupings } = action.listFromCsv.columnMap
      if (!displayName || !groupings.length) {
        return newState
      }
      break

    case FormatAction.LOAD_EXAMPLE_DATA:
      newState = loadExampleWorkersAndChartOptions(state)
      break

    case FormatAction.STRATIFY_DATA:
      newState = stratifyData(state)
      break

    case FormatAction.SET_STAR_OPTION:
      newState = setShapeOption(
        state,
        action.optionType,
        action.value,
        action.shapeIndex
      )
      break

    case FormatAction.SET_TEXT_LINE:
      newState = setTextLine(state, action.column, action.index)
      break

    case FormatAction.SET_COLOR_COLUMN:
      newState = setColorColumn(state, action.column)
      break

    case FormatAction.SET_COLOR_MAP:
      newState = setColorMap(state, action.colorMap)
      break

    case FormatAction.SET_BUBBLE_SHAPE:
      newState = setBubbleShape(state, action.bubbleShape)
      break

    case FormatAction.UPLOAD_CONFIG:
      newState = uploadConfigJSON(state, action.json)
      break

    default:
      newState = state
  }

  return newState
}

export default dataFormattingReducer
