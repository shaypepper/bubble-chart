import * as React from 'react'
import Button from '@mui/material/Button'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'

export const UploadConfig: React.FC = () => {
  const { dispatch } = React.useContext(WorkerDataContext)
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  return (
    <div>
      <textarea ref={textAreaRef} className="form-control"></textarea>
      <div>
        <Button
          size="small"
          onClick={() => {
            dispatch({
              type: FormatAction.UPLOAD_CONFIG,
              json: textAreaRef.current?.value || '',
            })
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
