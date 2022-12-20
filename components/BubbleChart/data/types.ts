import { DSVRowArray } from 'd3'
import { colors } from '../../shared/tokens/colors'

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

type ColorOptions = {
  currentColumn: Column
  colorMap: ColorMapByColumn
}

export type ColumnMap = {
  uniqueIdentifier?: string
  displayName?: string
  primaryGrouping?: string
  secondaryGrouping?: string
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

  constructor(
    column: string = '',
    color: Column = '',
    value: Value = '',
    label: string = '',
    use: boolean = false
  ) {
    this.column = column
    this.color = color
    this.value = value
    this.label = label
    this.use = use
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
    this.columnMap = columnMap || {
      uniqueIdentifier: '',
      displayName: '',
      primaryGrouping: '',
      secondaryGrouping: '',
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

  get primaryGroupings(): Set<Value | undefined> {
    return new Set(this.list.map((n) => n.primaryGrouping))
  }

  get secondaryGroupings(): Set<Value | undefined> {
    return new Set(this.list.map((n) => n.secondaryGrouping))
  }

  get groupings(): Set<Value | undefined> {
    return new Set(this.list.map((n) => n.grouping))
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
  backupId: number
  nodeType = 'worker'

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

  get stars() {
    const stars = this.parent.chartOptions?.stars || []
    return stars.map(({ value, column, color, use }) => ({
      fillColor: color,
      show: value === this.rawData[column] && use,
    }))
  }

  get textLines() {
    return this.parent.chartOptions?.textLineColumns.map((col) => {
      return `${this.rawData[col]}`
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

  get primaryGrouping() {
    return `${this.rawData[this.parent.columnMap.primaryGrouping || '']}`
  }

  get secondaryGrouping() {
    return `${this.rawData[this.parent.columnMap.secondaryGrouping || '']}`
  }

  get grouping() {
    if (this.secondaryGrouping) {
      return `g: ${this.primaryGrouping} - ${this.secondaryGrouping}`
    } else {
      return `g: ${this.primaryGrouping}`
    }
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
