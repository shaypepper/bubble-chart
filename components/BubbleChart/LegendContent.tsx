import { FC, useContext } from 'react'
import { WorkerDataContext } from './data/WorkerDataProvider'

const LegendContent: FC = () => {
  const { chartOptions } = useContext(WorkerDataContext)

  return <div></div>
}

export default LegendContent
