import { FC, useContext, useRef, useState, useCallback, useEffect } from 'react'
import { WorkerDataContext } from '../ChartCreater/data/WorkerDataProvider'
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
} from 'react-bootstrap'
import {
  ColorMap,
  FormatAction,
} from '../ChartCreater/data/dataFormattingReducer'
import Bubble from '../BubbleChart/Bubble'
// import { Stage } from 'konva/types/Stage'
// import { Layer } from 'konva/types/Layer'
import { Stage, Layer, Text } from 'react-konva'
import { Themes, timesGuildTheme } from '../BubbleChart/themes'
import {
  bubbleSampleClass,
  canvasClass,
  colorPickerClass,
  valueLabelClass,
} from './ColorPicker.styled'

enum ColorBasisDataType {
  CATEGORICAL = 'Categorical',
  ORDINAL = 'Ordinal',
  NUMERIC = 'Numeric',
}

const ColorPicker: FC = () => {
  const { workersData, unmappedGroupings, columns, columnMap, dispatch } =
    useContext(WorkerDataContext)

  const colorMapRef = useRef<ColorMap>({})
  const [tempColorMap, setTempColorMap] = useState<any>({})

  const [dataType, setDataType] = useState<ColorBasisDataType>()

  let nWorkers = workersData?.length

  const uniqueValues = [
    ...new Set(workersData?.map((w, i) => w[columnMap?.colorBasis || ''])),
  ].sort((a, b) => (a < b ? -1 : 1))

  const startingColors = []
  for (let v of uniqueValues) {
    startingColors.push({
      value: v,
      color: 'hsl(318, 73%, 22%)',
    })
  }

  const getColors = useCallback((value, idx) => {
    let bubbleColors = { fillColor: 'black', textColor: 'white' }
    let colors
    switch (dataType) {
      case ColorBasisDataType.CATEGORICAL:
        colors =
          timesGuildTheme.leaf.categorical?.[
            idx % timesGuildTheme.leaf.categorical.length
          ]
        return colors || bubbleColors
      case ColorBasisDataType.NUMERIC:
        const { h: minH, s: minS, l: minL } = timesGuildTheme.leaf.numeric?.min
    }
  }, [])

  const exampleSize = window.innerWidth / 20

  useEffect(() => {}, [dataType])

  return (
    <>
      <Form.Group key={'wtf'}>
        <Form.Label>
          What type of data are you visualizing?
          <Dropdown
            role="select"
            onSelect={(e) => {
              console.log('something was selected', e)
              // colorMap.current[value] = e.value
              // setDataType(e)
            }}
          >
            <Dropdown.Toggle variant="success" size="sm">
              {dataType}
            </Dropdown.Toggle>

            <Dropdown.Menu role="select">
              {[
                ColorBasisDataType.ORDINAL,
                ColorBasisDataType.CATEGORICAL,
                ColorBasisDataType.NUMERIC,
              ].map((col) => (
                <Dropdown.Item key={col} eventKey={col} as={Button}>
                  {col}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Label>
        <div>
          <Button
            size="sm"
            onClick={() => {
              dispatch({
                type: FormatAction.SET_COLORS,
                colorMap: colorMapRef.current,
              })
            }}
          >
            Apply
          </Button>
        </div>
      </Form.Group>
      <div className={colorPickerClass}>
        {startingColors.map(({ value, color }, idx) => {
          let bubbleColors = { fillColor: 'black', textColor: 'white' }
          switch (dataType) {
            case ColorBasisDataType.CATEGORICAL:
              const colors =
                timesGuildTheme.leaf.categorical?.[
                  idx % timesGuildTheme.leaf.categorical.length
                ]
              if (colors) bubbleColors = colors
              break
          }
          return (
            <div key={value} className={bubbleSampleClass}>
              <p className={valueLabelClass}>
                {columnMap?.colorBasis}: {value}
              </p>
              <Stage
                width={exampleSize * 2}
                height={exampleSize * 2}
                draggable
                className={canvasClass}
              >
                <Layer>
                  <Bubble
                    radius={0.5}
                    translation={{ x: exampleSize, y: exampleSize }}
                    theme={timesGuildTheme}
                    fillColor={bubbleColors.fillColor}
                    textColor={bubbleColors.textColor}
                    listLength={1}
                    onClick={() => {}}
                    isLeaf
                    scale={1}
                    name={'President Lisa Simpson'}
                    height={exampleSize * 2}
                    width={exampleSize * 2}
                  />
                </Layer>
              </Stage>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ColorPicker
