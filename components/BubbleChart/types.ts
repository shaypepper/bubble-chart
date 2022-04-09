import { CarouselVariant } from 'react-bootstrap/esm/Carousel'
import { DSVParsedArray } from 'd3'

export type Person = {
  [key: string | number]: any
}

export type ColorMap = {
  [key: string | number]: string
}

const s = (v: any) => `${v}`

export type ColumnMap = {
  name?: string
  grouping?: string
  assessment?: number
  colorBasis?: string
}
type Column = string

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

export class ChartOptions {
  groupColumn: Column
  stars: {
    color: string
    column: Column
    values: Set<string | number>
    label: string
  }[]
  textLineColumns: Column[]
  displayName: Column
  uniqueIdentifier: Column
  // mainTheme?: BubbleTheme

  constructor() {
    this.groupColumn = 'group'
    this.stars = []
    this.textLineColumns = []
    this.displayName = 'Shay'
    this.uniqueIdentifier = 'Name'
  }
}

export class Worker {
  rawData: { [s: string]: string | number }
  options: ChartOptions
  grouping: string

  constructor(rawData: any, options: ChartOptions) {
    this.rawData = rawData
    this.options = options
    this.grouping = ''
  }

  get id() {
    return this.rawData[this.options.uniqueIdentifier]
  }

  get displayName() {
    return this.rawData[this.options.displayName]
  }

  get group() {
    return this.rawData[this.options.groupColumn]
  }

  get starColor() {
    const { stars } = this.options
    return stars.map(({ values, column, color }) =>
      values.has(this.rawData[column]) ? color : 'none'
    )
  }

  get textLines() {
    return this.options.textLineColumns.map((col) => {
      return `${col}: ${this.rawData[col]}`
    })
  }

  get bubbleColors() {
    return {}
  }
}

export class Workers {
  csvFile: DSVParsedArray<Person>
  list: Worker[]
  groupings: Set<string>
  constructor(csvFile: DSVParsedArray<Person>, options: ChartOptions) {
    this.csvFile = csvFile
    this.list = csvFile.map((row) => {
      return new Worker(row, options)
    })
    this.groupings = new Set(this.list.map((w) => w.grouping))
  }

  updateOptions(options: ChartOptions) {
    this.list.forEach((worker) => (worker.options = options))
  }
}
