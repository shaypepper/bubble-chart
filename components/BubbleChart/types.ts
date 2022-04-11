import { csvParse, DSVParsedArray } from 'd3'

export type Person = {
  [key: Column]: Value
}
export type Column = string
export type Value = number | string | Date

export type ColorMap = {
  [key: string]: string
}

const s = (v: any) => `${v}`

export type ColumnMap = {
  uniqueIdentifier?: string
  displayName?: string
  grouping?: string
}

// export type BubbleOptions = {
//   textColor: string
//   fillColor: string
// }

// export type BubbleTheme2 = {
//   default: BubbleOptions
//   categorical?: {
//     [s: string]: BubbleOptions
//   }
//   numeric: {
//     min: BubbleOptions
//     max: BubbleOptions
//   }
// }

// export class BubbleTheme {
//   default: BubbleOptions
//   categorical?: BubbleOptions[]
//   numeric: {
//     min: BubbleOptions
//     max: BubbleOptions
//   }
//   constructor() {
//     this.default = {}
//     this.categorical = []
//     this.numeric = {}
//   }
// }

export enum StarOptionsKeys {
  COLOR = 'color',
  COLUMN = 'column',
  VALUES = 'values',
  LABEL = 'label',
}

type StarOptions = {
  [StarOptionsKeys.COLOR]: string
  [StarOptionsKeys.COLUMN]: Column
  [StarOptionsKeys.VALUES]: Set<Value>
  [StarOptionsKeys.LABEL]: string
}

export class ChartOptions {
  stars: StarOptions[]
  textLineColumns: Column[]

  constructor(stars: StarOptions[] = [], textLineColumns: Column[] = []) {
    this.stars = stars
    this.textLineColumns = textLineColumns
  }

  duplicate() {
    return new ChartOptions(this.stars, this.textLineColumns)
  }
}
export class Node {
  rawData: Person
  parent: ListFromCSV

  constructor(rawData: any, parent: ListFromCSV) {
    this.rawData = rawData
    this.parent = parent
  }

  get id(): string {
    return `${this.rawData[this.parent.columnMap.uniqueIdentifier || '']}`
  }

  get displayName(): string {
    return `${this.rawData[this.parent.columnMap.displayName || '']}`
  }

  get grouping() {
    return `${this.rawData[this.parent.columnMap.grouping || '']}`
  }
}

export class ListFromCSV {
  /** Uploaded csv file */
  csvFile: DSVParsedArray<Person>
  /** Map of standardized labels to csv columns */
  columnMap: ColumnMap
  /** List of available columns from CSV */
  columns?: Column[]

  list: Node[]

  chartOptions: ChartOptions

  constructor(
    csvFile: DSVParsedArray<Person>,
    columnMap: ColumnMap | void = undefined,
    chartOptions: ChartOptions
  ) {
    this.columnMap = columnMap || {
      uniqueIdentifier: '',
      displayName: '',
      grouping: '',
    }

    this.csvFile = csvFile
    this.columns = this.csvFile.columns?.map((s) => `${s}`).filter((s) => s)

    this.list = []
    this.chartOptions = chartOptions
  }

  get ids(): Set<string> {
    return new Set(this.list.map((w) => w.id))
  }

  get groupings(): Set<string> {
    return new Set(this.list.map((n) => n.grouping))
  }

  listValues(columnName: string | number): Set<string> {
    const valueSet = new Set<string>()
    this.list.forEach((node: Node) => {
      valueSet.add(`${node.rawData[columnName]}`)
    })
    return valueSet
  }
}

export class Worker extends Node {
  constructor(rawData: any, parent: ListFromCSV) {
    super(rawData, parent)
  }
  get starColor() {
    const { stars } = this.parent.chartOptions
    return stars.map(({ values, column, color }) =>
      values.has(this.rawData[column]) ? color : 'none'
    )
  }

  get textLines() {
    return this.parent.chartOptions.textLineColumns.map((col) => {
      return `${col}: ${this.rawData[col]}`
    })
  }

  get bubbleColors() {
    return {}
  }
}
export class Workers extends ListFromCSV {
  list: Worker[]
  constructor(
    csvFile: DSVParsedArray<Person>,
    options: ChartOptions,
    columnMap: ColumnMap
  ) {
    super(csvFile, columnMap, options)
    this.list = this.csvFile.map((row) => {
      return new Worker(row, this)
    })
  }
}

export class Grouping extends Node {
  constructor(rawData: any, parent: ListFromCSV) {
    super(rawData, parent)
  }
}

export class Groupings extends ListFromCSV {
  list: Grouping[]
  constructor(
    csvFile: DSVParsedArray<Person> | void = undefined,
    options: ChartOptions,
    columnMap: ColumnMap
  ) {
    super(csvFile, columnMap, options)
    this.list = this.csvFile.map((row) => {
      return new Grouping(row, this)
    })
  }
}
