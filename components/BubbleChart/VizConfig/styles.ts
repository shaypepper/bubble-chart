import { css } from '@emotion/css'
import { latoFont } from '../../shared/tokens/fonts'
import { pxToRem } from '../../shared/tokens/spacing'

export const configTitleClass = css`
  font-family: ${latoFont};
  font-size: ${pxToRem(18)};
`

export const configContainerClass = css`
  margin: ${pxToRem(12)};
`
