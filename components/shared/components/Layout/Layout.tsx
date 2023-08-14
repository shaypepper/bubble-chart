import * as React from 'react'
import { css } from '@emotion/css'
import { latoFont } from '../../tokens/fonts'
import Header, { DataForPowerPages } from './../Header'

const mainClass = css`
  display: flex;
  flex-direction: column;
  font-family: ${latoFont};
`

const Layout: React.FC<{ currentPage: DataForPowerPages }> = ({
  children,
  currentPage,
}) => {
  return (
    <>
      <Header currentPage={currentPage} />
      <main className={mainClass}>{children}</main>
    </>
  )
}

export default Layout
