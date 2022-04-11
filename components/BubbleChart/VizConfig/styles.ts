import { css } from 'pretty-lights'
import { latoFont } from '../../shared/tokens/fonts'
import { pxToRem } from '../../shared/tokens/spacing'

export const configTitleClass = css`
  font-family: ${latoFont};
`

export const configContainerClass = css`
  margin: ${pxToRem(12)};
`
