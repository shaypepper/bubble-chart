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
              Load a CSV file to get started. Not sure what your data should
              look like? We are pretty agnostic here about what columns you have
              defined in your CSV. If you need some ideas, peruse{' '}
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
              organizing data can be sensitive. Rest assured that when you load
              your data, it will not be sent to a server and will not persist
              when you close the browser window. No one will be seeing this data
              except you! Unless you choose to via the Print option!
            </p>
          </LoadCSV>
        )}
      </form>
    </>
  )
}

export default FileInput
