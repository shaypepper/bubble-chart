import { FC, useContext } from 'react'
import * as React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'

const TextLineOptions: FC<{ index: number }> = ({ index }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)

  return (
    <div style={{ marginTop: '8px' }}>
      <Autocomplete
        id="text-line-column-dropdown"
        options={workersData?.columns || []}
        size="small"
        onChange={(e: React.BaseSyntheticEvent) => {
          dispatch({
            type: FormatAction.SET_TEXT_LINE,
            column: e.target.textContent,
            index,
          })
        }}
        renderInput={(params) => (
          <TextField {...params} label={chartOptions.textLineColumns[index]} />
        )}
      />
    </div>
  )
}

export default TextLineOptions
