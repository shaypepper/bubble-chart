import { FC, useContext } from 'react'
import { DataForPowerPages } from '../../components/shared/components/Header'
import { NextPage } from 'next'
import Layout from '../../components/shared/components/Layout'
import SignModal from '../../components/shared/components/SignModal'
import WorkerDataProvider, {
  WorkerDataContext,
} from '../../components/BubbleChart/data/WorkerDataProvider'
import FileInput from '../../components/BubbleChart/FileInput'
import BubbleChart from '../../components/BubbleChart'
import { useState } from 'react'
import VizConfig from '../../components/BubbleChart/VizConfig'
import SignMenu from '../../components/shared/components/SignMenu'
import { SignMenuItem } from '../../components/shared/components/SignMenu/SignMenu'
import { FormatAction } from './data/dataFormattingReducer'
import Legend from './Legend'

const Signs: FC<{ onReset: () => void; onSaveImage: () => void }> = ({
  onReset = () => {},
  onSaveImage,
}) => {
  const [showModal, setShowModal] = useState(true)
  const [showColorConfig, setShowColorConfig] = useState(false)
  const { dispatch } = useContext(WorkerDataContext)
  return (
    <>
      <SignModal
        hide={!showColorConfig}
        title={'Customize chart'}
        onDismiss={() => {
          setShowColorConfig(false)
        }}
      >
        <VizConfig />
      </SignModal>

      <SignModal
        hide={!showModal}
        title={'Load data'}
        onDismiss={() => {
          dispatch({
            type: FormatAction.STRATIFY_DATA,
          })
          setShowModal(false)
        }}
      >
        <FileInput />
      </SignModal>

      <SignMenu slideDown={showColorConfig || showModal}>
        <SignMenuItem
          index={0}
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
          load data
        </SignMenuItem>
        <SignMenuItem
          index={1}
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

        <SignMenuItem index={2} onClick={onReset}>
          Reset Frame
        </SignMenuItem>
        <SignMenuItem index={3} onClick={onSaveImage}>
          Save Image
        </SignMenuItem>
      </SignMenu>
    </>
  )
}

export default Signs
