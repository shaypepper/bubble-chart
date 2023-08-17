import { v4 as uuidv4 } from 'uuid'
import { DSVRowArray } from 'd3'
import { colors } from '../../shared/tokens/colors'
import { Shapes } from '../shapes/Shape'

type Person = {
  [key: Column]: Value
}
export type Column = string
export type Value = number | string | Date | null | boolean

export type ColorMap = {
  [columnValue: string]: {
    textColor: string
    fillColor: string
  }
}
type ColorMapByColumn = {
  [columnName: Column]: ColorMap
}

export type ColorOptions = {
  currentColumn: Column
  colorMap: ColorMapByColumn
}

export type ColumnMap = {
  displayName?: string
  groupings: string[]
}

export enum BubbleShape {
  CIRCLE = 'circle',
  HEX = 'hex',
}

export enum ShapeOptionsKeys {
  COLOR = 'color',
  COLUMN = 'column',
  VALUES = 'values',
  LABEL = 'label',
  USE = 'use',
  SHAPE = 'shape',
}

export const blankValue = '(blank)'

export class ShapeOptions {
  [ShapeOptionsKeys.COLOR]: string;
  [ShapeOptionsKeys.COLUMN]: Column;
  [ShapeOptionsKeys.VALUES]: Value[];
  [ShapeOptionsKeys.LABEL]: string;
  [ShapeOptionsKeys.USE]: boolean;
  [ShapeOptionsKeys.SHAPE]: Shapes

  constructor() {
    this.column = ''
    this.color = ''
    this.values = []
    this.label = ''
    this.use = false
    this.shape = Shapes.HEART
  }
}

export class ChartOptions {
  shapes: ShapeOptions[]
  textLineColumns: Column[]
  colors: ColorOptions
  bubbleShape: BubbleShape

  constructor(
    shapes: ShapeOptions[] = [],
    textLineColumns: Column[] = [],
    colors: ColorOptions = {
      currentColumn: '',
      colorMap: {},
    },
    bubbleShape: BubbleShape = BubbleShape.CIRCLE
  ) {
    this.shapes = shapes.length
      ? shapes
      : [
          new ShapeOptions(),
          new ShapeOptions(),
          new ShapeOptions(),
          new ShapeOptions(),
          new ShapeOptions(),
          new ShapeOptions(),
          new ShapeOptions(),
        ]
    this.textLineColumns = textLineColumns
    this.colors = colors
    this.bubbleShape = bubbleShape
  }

  duplicate() {
    const newOptions = new ChartOptions(
      this.shapes,
      this.textLineColumns,
      this.colors,
      this.bubbleShape
    )
    return newOptions
  }
}

export function isWorker(node: Worker | Grouping): node is Worker {
  return node.nodeType === 'worker'
}

export class ListFromCSV {
  /** Loaded csv file */
  csvFile: DSVRowArray<string>
  /** Map of standardized labels to csv columns */
  columnMap: ColumnMap
  /** List of available columns from CSV */
  columns?: Column[]

  list: Worker[]
  chartOptions?: ChartOptions

  constructor(
    csvFile: DSVRowArray<string>,
    columnMap: ColumnMap | void = undefined,
    chartOptions?: ChartOptions
  ) {
    this.columnMap = {
      displayName: '',
      groupings: [],
      ...(columnMap || {}),
    }

    this.csvFile = csvFile
    this.columns = this.csvFile.columns?.map((s) => `${s}`).filter((s) => s)

    this.list = []

    if (chartOptions) {
      this.chartOptions = chartOptions
    }
  }

  get ids(): Set<Value | undefined> {
    return new Set(this.list.map((w) => w.id))
  }

  getUniqueValuesByColName(colName: string): Value[] {
    return [...new Set(this.list.map((n) => n.rawData[colName || '']))]
  }

  get uniqueGroupings(): Set<Value | undefined> {
    const allGroupings = new Set<Value | undefined>()
    this.list.forEach((n) => {
      const groupings = n.groupingList.map(
        (g, i, gList): string => `g: ${gList.slice(0, i + 1).join(' | ')}`
      )
      groupings.forEach((g) => allGroupings.add(g))
    })
    return allGroupings
  }

  get uniqueGroupingValues(): { colName: string; values: Value[] }[] {
    return this.columnMap.groupings.map((g) => ({
      colName: g,
      values: this.getUniqueValuesByColName(g),
    }))
  }

  listValues(columnName: string | number): Set<Value> {
    const valueSet = new Set<Value>()
    this.list.forEach((node: Worker) => {
      valueSet.add(`${node.rawData[columnName]}`)
    })
    return valueSet
  }
}

export type Grouping = {
  displayName: string
  grouping: string
  id: string
  nodeType: 'grouping'
}
export class Worker {
  rawData: Person
  parent: ListFromCSV
  id: string
  nodeType = 'worker'

  constructor(rawData: any, parent: ListFromCSV) {
    this.rawData = rawData
    this.parent = parent
    this.id = `${uuidv4()}}`
  }

  get shapes() {
    const shapes = this.parent.chartOptions?.shapes || []
    return shapes.map(({ values, column, color, use, shape }) => ({
      fillColor: color,
      show: values.includes(this.rawData[column]) && use,
      shape,
    }))
  }

  get textLines() {
    return this.parent.chartOptions?.textLineColumns.map((col) => {
      return `${col}: ${this.rawData[col]}`
    })
  }

  get bubbleColors() {
    if (!this.parent.chartOptions) return

    const {
      colors: { colorMap, currentColumn },
    } = this.parent.chartOptions

    const currentColorMap =
      colorMap[currentColumn]?.[`${this.rawData[currentColumn]}`]
    const fillColor = currentColorMap?.fillColor || colors.white.default
    const textColor = currentColorMap?.textColor || colors.white.gradient[5]
    return { fillColor, textColor }
  }

  get displayName(): string {
    return `${this.rawData[this.parent.columnMap.displayName || '']}`
  }

  get groupingList() {
    const list = this.parent.columnMap.groupings.map(
      (g) => `${this.rawData[g] || blankValue}`
    )
    return list.length ? list : ['allGroups']
  }

  get grouping() {
    return `g: ${this.groupingList.join(' | ')}`
  }
}
export class Workers extends ListFromCSV {
  list: Worker[]

  constructor(
    csvFile: DSVRowArray<string>,
    chartOptions: ChartOptions,
    columnMap: ColumnMap
  ) {
    super(csvFile, columnMap, chartOptions)
    this.list = this.csvFile.map((row) => {
      return new Worker(row, this)
    })
  }
}
