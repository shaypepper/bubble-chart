import * as React from 'react'
import { useContext, useRef } from 'react'
import { MuiFileInput } from 'mui-file-input'
import { Autocomplete, Button, TextField } from '@mui/material'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { FormatAction } from '../data/dataFormattingReducer'
import { pxToRem } from '../../shared/tokens/spacing'

const columnMapLabels: { [s: string]: string } = {
  displayName: 'Display name',
}

const LoadCSV: React.FC = ({ children = 'Load your outreach data' }) => {
  const { convertCsv, dispatch, workersData } = useContext(WorkerDataContext)
  const action = FormatAction.LOAD_WORKERS_CSV
  const displayName = workersData?.columnMap.displayName

  const convertedCsv = workersData

  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const handleLoadFile = (newFile: File | null) => {
    if (newFile) {
      convertCsv(action, newFile)
    }
    setFile(newFile || null)
  }
  return (
    <>
      <div>
        {children}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: pxToRem(20),
            width: '100%',
          }}
        >
          <MuiFileInput
            size="small"
            ref={inputRef}
            value={file}
            label={'Load a csv of your worker data'}
            inputProps={{
              accept: '.csv',
            }}
            name={`worker-data"`}
            onChange={handleLoadFile}
          />
          <Button
            size="small"
            style={{ marginBottom: pxToRem(4), marginLeft: pxToRem(6) }}
            onClick={() => {
              dispatch({ type: FormatAction.LOAD_EXAMPLE_DATA })
            }}
          >
            ...or load example data
          </Button>
        </div>

        {convertedCsv && (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: pxToRem(20),
                width: '100%',
                marginTop: pxToRem(20),
              }}
            >
              <Autocomplete
                size="small"
                key="displayName"
                id={`displayName-dropdown-for-csv`}
                options={convertedCsv.columns || []}
                renderInput={(params) => (
                  <TextField {...params} label={columnMapLabels.displayName} />
                )}
                value={displayName}
                onChange={(e: React.BaseSyntheticEvent) => {
                  dispatch({
                    type: FormatAction.SET_COLUMN_MAP,
                    columnMap: {
                      displayName: e.target.textContent,
                    },
                    listFromCsv: convertedCsv,
                  })
                }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: pxToRem(20),
                marginTop: pxToRem(20),
              }}
            >
              {[...convertedCsv.columnMap.groupings, null].map(
                (columnLabel, groupingIndex) => (
                  <div key={`${columnLabel} - ${groupingIndex}`}>
                    <Autocomplete
                      size="small"
                      id={`grouping-${groupingIndex}-dropdown-for-csv`}
                      options={convertedCsv.columns || []}
                      value={columnLabel}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`Grouping ${groupingIndex + 1}`}
                        />
                      )}
                      onChange={(e: React.BaseSyntheticEvent) => {
                        let newGroupings = [...convertedCsv.columnMap.groupings]
                        newGroupings[groupingIndex] = e.target.textContent
                        newGroupings = newGroupings.filter((g) => g.length)
                        dispatch({
                          type: FormatAction.SET_COLUMN_MAP,
                          columnMap: {
                            groupings: newGroupings,
                            displayName,
                          },
                          listFromCsv: convertedCsv,
                        })
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default LoadCSV
