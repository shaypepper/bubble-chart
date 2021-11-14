import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { width, height, squareSize } from './tokens'
import orgChart from './org-chart.json'
import {
  rollup,
  hierarchy,
  pack,
  csv,
  csvParse,
  stratify,
  HierarchyNode,
  PackLayout,
  HierarchyCircularNode,
  DSVRowArray,
  autoType,
  interpolateCubehelixLong,
} from 'd3'
import dataFormattingReducer, {
  ColumnMap,
  FormatAction,
  State,
} from '../ChartCreater/dataFormattingReducer'

type Worker = {
  [k: string]: string
}

type WorkerDataType = {
  convertWorkerCsv: (files: FileList) => void
  convertgroupingCsv: (files: FileList) => void
  workerHeirarchy?: HierarchyNode<unknown>
  columns?: string[]
} & State
export const WorkerDataContext = createContext<WorkerDataType>({
  convertWorkerCsv: (files) => files && null,
  convertgroupingCsv: (files) => files && null,
})

const WorkerDataProvider: React.FC = ({ children }) => {
  const [workerHeirarchy, setWorkerHeirarchy] =
    useState<HierarchyNode<unknown>>()
  const [bubbleData, setBubbleData] = useState<
    HierarchyCircularNode<unknown>[]
  >([])

  const [state, dispatch] = useReducer(dataFormattingReducer, {})
  console.log(state, dispatch)

  const [workerData, setWorkerData] = useState<Worker[]>([])
  const workerSet = useRef<Set<string>>(new Set())

  const convertCsv =
    (
      action:
        | FormatAction.UPLOAD_WORKERS_CSV
        | FormatAction.UPLOAD_groupingS_CSV
    ) =>
    (files: FileList) => {
      let reader = new FileReader()
      let file = files[0]

      if (file != null && file.size > 0) {
        let t = reader.readAsText(file)
      }
      reader.addEventListener('loadend', () => {
        if (typeof reader.result !== 'string') return
        const parsedWorkerData = csvParse(reader.result, autoType)
        console.log({ parsedWorkerData })

        dispatch({
          type: action,
          parsedData: parsedWorkerData,
        })
      })
    }

  return (
    <WorkerDataContext.Provider
      value={{
        convertWorkerCsv: convertCsv(FormatAction.UPLOAD_WORKERS_CSV),
        convertgroupingCsv: convertCsv(FormatAction.UPLOAD_groupingS_CSV),
        ...state,
        dispatch,
      }}
    >
      {' '}
      {children}
    </WorkerDataContext.Provider>
  )
}

export default WorkerDataProvider

// const strat = stratify<Worker>()
// .id((d) => d?.[state.nameColumn || ''])
// .parentId((d) => d?.[state.groupingColumn || ''])

// setWorkerData(parsedWorkerData)
// console.log({ parsedWorkerData })

// console.log(parsedWorkerData.columns)

// const workerNameList = new Set()
// parsedWorkerData.forEach((worker) => {
//   workerNameList.add(worker.Name)
// })

// const unlistedgroupingList = new Set()

// parsedWorkerData.forEach((worker) => {
//   if (!workerNameList.has(worker.grouping)) {
//     unlistedgroupingList.add(worker.grouping)
//   }
// })

// console.log({ unlistedgroupingList })

// const stratifiedThing = strat(thing)
//   .sum(() => 1)
//   .sort((a, b) => (b?.value || 0) - (a?.value || 0))
// setWorkerHeirarchy(stratifiedThing)
