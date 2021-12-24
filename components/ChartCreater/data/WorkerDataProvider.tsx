import React, {
  createContext,
  Dispatch,
  useReducer,
  useRef,
  useState,
} from 'react'
import { csvParse, HierarchyNode, HierarchyCircularNode } from 'd3'
import dataFormattingReducer, {
  Action,
  FormatAction,
  State,
  Steps,
} from './dataFormattingReducer'

type Worker = {
  [k: string]: string
}

type WorkerDataType = {
  convertWorkerCsv: (files: FileList) => void
  convertGroupingCsv: (files: FileList) => void
  workerHeirarchy?: HierarchyNode<unknown>
  dispatch: Dispatch<Action>
} & State
export const WorkerDataContext = createContext<WorkerDataType>({
  convertWorkerCsv: (files) => files && undefined,
  convertGroupingCsv: (files) => files && undefined,
  columnMap: {},
  dispatch: () => undefined,
  currentStep: Steps.UPLOAD_WORKERS,
})

const WorkerDataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(dataFormattingReducer, {
    columnMap: {},
    currentStep: Steps.UPLOAD_WORKERS,
  })

  return (
    <WorkerDataContext.Provider
      value={{
        convertWorkerCsv: convertCsv(FormatAction.UPLOAD_WORKERS_CSV, dispatch),
        convertGroupingCsv: convertCsv(
          FormatAction.UPLOAD_GROUPINGS_CSV,
          dispatch
        ),
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

function convertCsv(
  action: FormatAction.UPLOAD_WORKERS_CSV | FormatAction.UPLOAD_GROUPINGS_CSV,
  dispatch: Dispatch<Action>
) {
  return (files: FileList) => {
    let reader = new FileReader()
    let file = files[0]

    if (file != null && file.size > 0) {
      reader.readAsText(file)
    }
    reader.addEventListener('loadend', () => {
      if (typeof reader.result !== 'string') return
      const parsedWorkerData = csvParse(reader.result)
      dispatch({
        type: action,
        parsedData: parsedWorkerData,
      })
    })
  }
}
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
