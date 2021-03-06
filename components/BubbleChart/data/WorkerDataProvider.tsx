import { createContext, Dispatch, useReducer } from 'react'
import { csvParse, HierarchyCircularNode } from 'd3'
import dataFormattingReducer, {
  Action,
  FormatAction,
  State,
  Steps,
} from './dataFormattingReducer'
import { ChartOptions } from './types'

type WorkerDataType = {
  convertCsv: (action: FormatAction.LOAD_WORKERS_CSV, files: FileList) => void
  workerHeirarchy?: HierarchyCircularNode<unknown>
  dispatch: Dispatch<Action>
} & State
export const WorkerDataContext = createContext<WorkerDataType>({
  convertCsv: (action, files) => [action, files] && undefined,
  dispatch: () => undefined,
  currentStep: Steps.LOAD_WORKERS,
  chartOptions: new ChartOptions(),
})

const WorkerDataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(dataFormattingReducer, {
    currentStep: Steps.LOAD_WORKERS,
    chartOptions: new ChartOptions(),
  })

  return (
    <WorkerDataContext.Provider
      value={{
        convertCsv: generateConvertCsvFunction(dispatch),
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

function generateConvertCsvFunction(dispatch: Dispatch<Action>) {
  return (action: FormatAction.LOAD_WORKERS_CSV, files: FileList) => {
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
