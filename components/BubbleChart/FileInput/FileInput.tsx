import * as React from 'react'
import { useContext } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Steps } from '../data/dataFormattingReducer'
import { pxToRem } from '../../shared/tokens/spacing'
import LoadCSV from './LoadCSV'

const FileInput: React.FC = () => {
  const { currentStep } = useContext(WorkerDataContext)

  return (
    <>
      <form
        style={{
          maxWidth: pxToRem(600),
        }}
      >
        {currentStep === Steps.LOAD_WORKERS && (
          <LoadCSV>
            <p
              style={{
                fontSize: pxToRem(14),
                lineHeight: '120%',
              }}
            >
              Upload a CSV file to get started. Not sure what your data should
              look like? Peruse{' '}
              <a
                target="_blank"
                referrerPolicy="no-referrer"
                href="https://docs.google.com/spreadsheets/d/1uCHiNVSKNMO-VQFSUl-YYo6_WdS5C5isD1jXg1vke1M/view#gid=462026481"
                rel="noreferrer"
              >
                this example
              </a>{' '}
              of a fake exotic wild-life rehab center. If you want to take a
              test drive of this tool, you can also load the data here by
              downloading a CSV of the &quot;Unit Members &quot; tab. We know
              organizing data can be sensitive. Rest assured this upload will
              not be sent to a server and will not persist when you close the
              window for the application. No one will be seeing this data but
              you.
            </p>
          </LoadCSV>
        )}
      </form>
    </>
  )
}

export default FileInput
