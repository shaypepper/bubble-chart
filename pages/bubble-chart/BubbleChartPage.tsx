import { DataForPowerPages } from '../../components/shared/components/Header'
import { NextPage } from 'next'
import Layout from '../../components/shared/components/Layout'
import SignModal from '../../components/shared/components/SignModal'
import WorkerDataProvider from '../../components/BubbleChart/data/WorkerDataProvider'
import FileInput from '../../components/BubbleChart/FileInput'
import BubbleChart from '../../components/BubbleChart'
import { useState } from 'react'
import VizConfig from '../../components/BubbleChart/VizConfig'
import SignMenu from '../../components/shared/components/SignMenu'
import { SignMenuItem } from '../../components/shared/components/SignMenu/SignMenu'

const BubbleChartPage: NextPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [showColorConfig, setShowColorConfig] = useState(false)

  return (
    <Layout currentPage={DataForPowerPages.BUBBLE_CHART}>
      <WorkerDataProvider>
        <BubbleChart />
        {showColorConfig && (
          <SignModal onDismiss={() => setShowColorConfig(false)}>
            <VizConfig />
          </SignModal>
        )}
        {showModal && (
          <SignModal onDismiss={() => setShowModal(false)}>
            <FileInput />
          </SignModal>
        )}

        <SignMenu>
          <SignMenuItem
            onClick={() => {
              if (!showModal && !showColorConfig) {
                setShowModal(true)
              } else if (showModal) {
                setShowModal(false)
              } else if (!showModal && showColorConfig) {
                setShowColorConfig(false)
                setShowModal(true)
              }
            }}
          >
            upload data
          </SignMenuItem>
          <SignMenuItem
            onClick={() => {
              if (!showModal && !showColorConfig) {
                setShowColorConfig(true)
              } else if (showColorConfig) {
                setShowColorConfig(false)
              } else if (showModal && !showColorConfig) {
                setShowColorConfig(true)
                setShowModal(false)
              }
            }}
          >
            customize chart
          </SignMenuItem>

          <SignMenuItem>Reset Frame</SignMenuItem>
          <SignMenuItem>Save Image</SignMenuItem>
        </SignMenu>
      </WorkerDataProvider>
    </Layout>
  )
}

export default BubbleChartPage
