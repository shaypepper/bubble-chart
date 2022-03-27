import { css } from 'pretty-lights'
import * as React from 'react'
import HandHoldingSign from '../icons/HandHoldingSign'
import MinimalArrow from '../icons/MinimalArrow'
import { deepGrey, red, green } from '../tokens/colors'
import { pxToRem } from '../tokens/spacing'
import Header, { DataForPowerPages } from './Header'

const mainClass = css`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`

const mainContentClass = css`
  border: ${pxToRem(10)} ${deepGrey} solid;
  max-width: 824px;
  margin: ${pxToRem(20)} auto 0;
  border-radius: ${pxToRem(30)};
  padding: ${pxToRem(20)};
  flex-grow: 1;
`

const signClass = css`
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
        <div className={mainContentClass}>{children}</div>
        <div
          className={signClass}
          style={{
            transition: 'transform 400ms ease',
            transform: collapsed ? 'translate(40vw, 0)' : 'translate(0,0)',
          }}
        >
          <HandHoldingSign stickLength={1000} className={handHoldClass} />
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
