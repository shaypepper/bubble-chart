import { DSVRowArray } from 'd3'
import { deepGrey, white } from '../shared/tokens/colors'

export type Person = {
  [key: Column]: Value
}
export type Column = string
export type Value = number | string | Date | null | boolean
// export type Value = number | string | Date | boolean

export type ColorMap = {
  [columnValue: string]: {
    textColor: string
    fillColor: string
  }
}
export type ColorMapByColumn = {
  [columnName: Column]: ColorMap
}

export type ColorOptions = {
  currentColumn: Column
  colorMap: ColorMapByColumn
}

const s = (v: any) => `${v}`

export type ColumnMap = {
  uniqueIdentifier?: string
  displayName?: string
  grouping?: string
}

export enum StarOptionsKeys {
  COLOR = 'color',
  COLUMN = 'column',
  VALUE = 'value',
  LABEL = 'label',
  USE = 'use',
}

export class StarOptions {
  [StarOptionsKeys.COLOR]: string;
  [StarOptionsKeys.COLUMN]: Column;
  [StarOptionsKeys.VALUE]: Value;
  [StarOptionsKeys.LABEL]: string;
  [StarOptionsKeys.USE]: boolean

  constructor() {
    this.column = ''
    this.color = 'transparent'
    this.value = ''
    this.label = ''
    this.use = false
  }
}

export class ChartOptions {
  stars: StarOptions[]
  textLineColumns: Column[]
  colors: ColorOptions

  constructor(
    stars: StarOptions[] = [],
    textLineColumns: Column[] = [],
    colors: ColorOptions = {
      currentColumn: '',
      colorMap: {},
    }
  ) {
    this.stars = stars.length
      ? stars
      : [new StarOptions(), new StarOptions(), new StarOptions()]
    this.textLineColumns = textLineColumns
    this.colors = colors
  }

  duplicate() {
    const newOptions = new ChartOptions(
      this.stars,
      this.textLineColumns,
      this.colors
    )
    return newOptions
  }
}
export class Node {
  rawData: Person
  parent: ListFromCSV
  backupId: number
  nodeType = 'node'

  constructor(rawData: any, parent: ListFromCSV) {
    this.rawData = rawData
    this.parent = parent
    this.backupId = Math.round(Math.random() * 10000000)
  }

  get id(): string {
    return `${
      this.rawData[this.parent.columnMap.uniqueIdentifier || ''] ||
      this.backupId
    }`
  }

  get displayName(): string {
    return `${this.rawData[this.parent.columnMap.displayName || '']}`
  }

  get grouping() {
    return `${this.rawData[this.parent.columnMap.grouping || '']}`
  }
}

export function isWorker(node: Node): node is Worker {
  return node.nodeType === 'worker'
}

export class ListFromCSV {
  /** Uploaded csv file */
  csvFile: DSVRowArray<string>
  /** Map of standardized labels to csv columns */
  columnMap: ColumnMap
  /** List of available columns from CSV */
  columns?: Column[]

  list: Node[]
  chartOptions?: ChartOptions

  constructor(
    csvFile: DSVRowArray<string>,
    columnMap: ColumnMap | void = undefined,
    chartOptions?: ChartOptions
  ) {
    this.columnMap = columnMap || {
      uniqueIdentifier: '',
      displayName: '',
      grouping: '',
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

  get groupings(): Set<Value | undefined> {
    return new Set(this.list.map((n) => n.grouping))
  }

  listValues(columnName: string | number): Set<Value> {
    const valueSet = new Set<Value>()
    this.list.forEach((node: Node) => {
      valueSet.add(`${node.rawData[columnName]}`)
    })
    return valueSet
  }
}

export class Worker extends Node {
  constructor(rawData: any, parent: Workers) {
    super(rawData, parent)
    this.nodeType = 'worker'
  }
  get stars() {
    const stars = this.parent.chartOptions?.stars || []
    return stars.map(({ value, column, color, use }) => ({
      fillColor: color,
      show: value === this.rawData[column] && use,
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
    const fillColor = currentColorMap?.fillColor || deepGrey
    const textColor = currentColorMap?.textColor || white
    return { fillColor, textColor }
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

export class Grouping extends Node {
  constructor(rawData: any, parent: ListFromCSV) {
    super(rawData, parent)
    this.nodeType = 'grouping'
  }
}

export class Groupings extends ListFromCSV {
  list: Grouping[]
  constructor(csvFile: DSVRowArray<string>, columnMap: ColumnMap) {
    super(csvFile, columnMap)
    this.list = this.csvFile.map((row) => {
      return new Grouping(row, this)
    })
  }
}
