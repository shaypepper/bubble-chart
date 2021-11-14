import React from 'react'
import BubbleChart from '../BubbleChart'
import FileInput from '../FileInput'
import WorkerDataProvider from '../BubbleChart/WorkerDataProvider'

const ChartCreater = ({}) => {
  return (
    <>
      <WorkerDataProvider>
        <FileInput />
        {/* <BubbleChart /> */}
      </WorkerDataProvider>
    </>
  )
}

export default ChartCreater
