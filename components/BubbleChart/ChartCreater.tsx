import * as React from 'react'
import FileInput from './FileInput'
import WorkerDataProvider from './data/WorkerDataProvider'
import BubbleChart from '.'

const ChartCreater = ({}) => {
  return (
    <WorkerDataProvider>
      <FileInput />
      <BubbleChart />
    </WorkerDataProvider>
  )
}

export default ChartCreater
