import { css } from 'pretty-lights'

export const colorPickerClass = css`
  display: flex;
  flex-wrap: wrap;
`

export const bubbleSampleClass = css`
  display: grid;
  align-content: space-between;
  grid-template-columns: 10px min-content 10px;
  grid-template-rows: 32px 1fr min-content 1fr 10px;
  //   justify-content: space-between;

  background-color: gainsboro;

  margin: 2px;
  position: relative;

  border-radius: 4px;
  > p {
  }
`

export const canvasClass = css`
  grid-row: 2 / -2;
  grid-column: 2 / -2;
`

export const valueLabelClass = css`
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  z-index: 1;
  margin: 0;
  padding: 5px;
  border-radius: 4px;
  line-height: 100%;
  font-size: 12px;
`
