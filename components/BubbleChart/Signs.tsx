import { FC, useContext } from 'react'
import { useState } from 'react'
import SignModal from '../../components/shared/components/SignModal'
import { WorkerDataContext } from '../../components/BubbleChart/data/WorkerDataProvider'
import FileInput from '../../components/BubbleChart/FileInput'
import VizConfig from '../../components/BubbleChart/VizConfig'
import SignMenu from '../../components/shared/components/SignMenu'
import { SignMenuItem } from '../../components/shared/components/SignMenu/SignMenu'
import { FormatAction } from './data/dataFormattingReducer'

enum SignSteps {
  WELCOME = 'welcome',
  UPLOAD_WORKERS = 'uploadWorkers',
  LOAD_PLATFORM = 'loadPlatform',
  CUSTOMIZE_CHART = 'customizeChart',
  NONE = 'none',
}

const Signs: FC<{
  onReset: () => void
  onSaveImage: () => void
  onSaveAsSVG: () => void
}> = ({ onReset = () => {}, onSaveImage, onSaveAsSVG }) => {
  const [currentStep, setCurrentStep] = useState<SignSteps>(SignSteps.WELCOME)
  const { dispatch } = useContext(WorkerDataContext)
  return (
    <>
      <SignModal
        hide={currentStep !== SignSteps.WELCOME}
        title={'Welcome!'}
        onDismiss={() => {
          setCurrentStep(SignSteps.NONE)
        }}
        actionText={'Continue to Bubble Chart'}
        actionOnClick={() => {
          dispatch({ type: FormatAction.LOAD_EXAMPLE_DATA })
          dispatch({
            type: FormatAction.STRATIFY_DATA,
          })
          setCurrentStep(SignSteps.NONE)
        }}
      >
        <div
          style={{
            maxWidth: '750px',
          }}
        >
          <div>
            <p>
              Hello hello! You&apos;ve arrived at a quirky corner of the
              internet. I am Shay Culpepper, and I am running for unit chair for
              the Times Tech Guild. This chart will show the experience and
              philosophies I hope to bring to the table!
            </p>
          </div>
        </div>
      </SignModal>

      <SignModal
        hide={currentStep !== SignSteps.UPLOAD_WORKERS}
        title={'Upload your worker data!'}
        onDismiss={() => {
          dispatch({
            type: FormatAction.STRATIFY_DATA,
          })
          setCurrentStep(SignSteps.NONE)
        }}
        actionText={'Customize your chart'}
        actionOnClick={() => {
          dispatch({
            type: FormatAction.STRATIFY_DATA,
          })
          setCurrentStep(SignSteps.CUSTOMIZE_CHART)
        }}
      >
        <FileInput />
      </SignModal>

      <SignModal
        hide={currentStep !== SignSteps.CUSTOMIZE_CHART}
        title={'Customize chart'}
        onDismiss={() => {
          setCurrentStep(SignSteps.NONE)
        }}
      >
        <VizConfig />
      </SignModal>

      <SignMenu slideDown={currentStep !== SignSteps.NONE}>
        <SignMenuItem
          index={0}
          // onClick={() => {
          //   setCurrentStep(SignSteps.UPLOAD_WORKERS)
          // }}
        >
          Click on a gropuing or issue to zoom in/out
        </SignMenuItem>
        {/* <SignMenuItem
          index={1}
          onClick={() => {
            setCurrentStep(SignSteps.CUSTOMIZE_CHART)
          }}
        >
          customize chart
        </SignMenuItem> */}

        {/* <SignMenuItem index={2} onClick={onReset}>
          Reset Frame
        </SignMenuItem>
        <SignMenuItem index={3} onClick={onSaveImage}>
          Save Image
        </SignMenuItem> */}

        {/* <SignMenuItem index={4} onClick={onSaveAsSVG}>
          Print
        </SignMenuItem> */}
      </SignMenu>
    </>
  )
}

export default Signs
