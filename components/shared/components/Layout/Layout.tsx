import { css } from 'pretty-lights'
import * as React from 'react'
import HandHoldingSign from '../../icons/HandHoldingSign'
import MinimalArrow from '../../icons/MinimalArrow'
import { deepGrey, red, green, blue, white } from '../../tokens/colors'
import { bangersFont, latoFont } from '../../tokens/fonts'
import { pxToRem } from '../../tokens/spacing'
import Header, { DataForPowerPages } from './../Header'

const mainClass = css`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  font-family: ${latoFont};
`

const signClass = css`
  border: ${pxToRem(10)} ${blue} solid;
  max-width: 824px;
  width: 100%;
  margin: ${pxToRem(20)} auto 0;
  border-radius: ${pxToRem(30)};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const pageTitleClass = css`
  font-family: ${bangersFont};
  background-color: ${blue};
  color: ${white};
  border-radius: ${pxToRem(16)} ${pxToRem(16)} 0 0;
  padding: 0 ${pxToRem(24)};
`

const stepClass = css`
  font-family: ${latoFont};
  font-size: ${pxToRem(18)};
  flex-grow: 1;
`

const mainContentClass = css`
  padding: ${pxToRem(20)};
  flex-grow: 1;
`

const signHolderClass = css`
  display: flex;
  justify-content: end;
  align-items: end;
`

const handHoldClass = css`
  margin-left: calc(50vw - 50px);
`

const Layout: React.FC<{ currentPage: DataForPowerPages }> = ({
  children,
  currentPage,
}) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)

  return (
    <>
      <Header currentPage={currentPage} />
      <main className={mainClass}>
        <div className={signClass}>
          <div className={pageTitleClass}>
            <h2
              style={{
                display: 'inline-flex',
                width: '100%',
                alignItems: 'flex-end',
              }}
            >
              <span className={stepClass}>Step 1</span>
              <span>Upload your worker list</span>
            </h2>
          </div>
          <div className={mainContentClass}>{children}</div>
        </div>
        <div
          className={signHolderClass}
          style={{
            transition: 'transform 400ms ease',
            transform: collapsed ? 'translate(40vw, 0)' : 'translate(0,0)',
            marginBottom: pxToRem(20),
          }}
        >
          <HandHoldingSign stickLength={20} className={handHoldClass} />
          <div
            style={{
              backgroundColor: green,
              height: '48px',
              marginBottom: '24px',
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MinimalArrow
              height={24}
              direction={collapsed ? 'left' : 'right'}
              onClick={() => {
                setCollapsed((currentCollapsed) => !currentCollapsed)
              }}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Layout
