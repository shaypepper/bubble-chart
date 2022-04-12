import { DataForPowerPages } from '../../components/shared/components/Header'
import { NextPage } from 'next'
import Layout from '../../components/shared/components/Layout'
import SignModal from '../../components/shared/components/SignModal'
import WorkerDataProvider from '../../components/BubbleChart/data/WorkerDataProvider'
import FileInput from '../../components/BubbleChart/FileInput'
import BubbleChart from '../../components/BubbleChart'
import { useState } from 'react'
import VizConfig from '../../components/BubbleChart/VizConfig'

const BubbleChartPage: NextPage = () => {
  const [showModal, setShowModal] = useState(true)
  const [showColorConfig, setShowColorConfig] = useState(true)
  return (
    <Layout currentPage={DataForPowerPages.BUBBLE_CHART}>
      <WorkerDataProvider>
        <BubbleChart />
        {showColorConfig && (
          <VizConfig onDismiss={() => setShowColorConfig(false)} />
        )}
        {showModal && (
          <SignModal onDismiss={() => setShowModal(false)}>
            <FileInput />
          </SignModal>
        )}
      </WorkerDataProvider>
    </Layout>
  )
}

export default BubbleChartPage
