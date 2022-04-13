import { css, styled } from 'pretty-lights'
import * as React from 'react'
import { Button } from 'react-bootstrap'
import HandHoldingSign from '../../icons/HandHoldingSign'
import MinimalArrow from '../../icons/MinimalArrow'
import { blue, deepGrey, white } from '../../tokens/colors'
import { bangersFont, latoFont } from '../../tokens/fonts'
import { pxToRem } from '../../tokens/spacing'

const signClass = css`
  max-width: 824px;
  min-width: 400px;
  margin: ${pxToRem(20)} ${pxToRem(20)} 0;
  display: flex;
  flex-direction: column;
  box-shadow: black 1px 1px 10px;
  background-color: ${white};
  height: min-content;
`

const pageTitleClass = css`
  font-family: ${bangersFont};
  background-color: ${blue};
  color: ${white};
  padding: ${pxToRem(18)};
  position: relative;
`

const stepClass = css`
  font-family: ${latoFont};
  font-size: ${pxToRem(12)};
  line-height: 80%;
  margin: 0;
`

const mainContentClass = css`
  padding: ${pxToRem(18)};
  flex-grow: 1;
`

const SignHolder = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: ${pxToRem(20)};
  width: 100%;
`

const handHoldClass = css`
  margin-left: calc(50vw - 20px);
`

const signTitle = css`
  width: 100%;
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
`
const armClass = css`
  background-color: ${deepGrey};
  height: 24px;
  margin-bottom: 30px;
  flex-grow: 1;
  display: flex;
  align-items: center;

  button {
    margin: 0 0 1px;
    padding-left: 4px 0;
  }
`

const containerClass = css`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const fullWidthContainerClass = css`
  ${containerClass};
  top: 0;
  left: 0;
  backdrop-filter: blur(2px);
`

const backdropFilterClass = css`
  height: 100%;
  width: 100%;
  backdrop-filter: blur(2px);
  background-color: #30303090;
  position: absolute;
`

const SignModal: React.FC<{
  onDismiss?: () => void
  stepNumber?: number
  title?: string
}> = ({ children, onDismiss = () => {}, stepNumber, title }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const fullWidth = true

  return (
    <div className={fullWidth ? fullWidthContainerClass : containerClass}>
      {/* <div className={backdropFilterClass}></div> */}
      <div className={signClass}>
        <div className={pageTitleClass}>
          {stepNumber && <p className={stepClass}>Step {stepNumber} </p>}
          <h2 className={signTitle}>{title}</h2>

          <Button
            size="sm"
            variant=""
            style={{ position: 'absolute', top: 0, right: 0 }}
            onClick={onDismiss}
          >
            <svg viewBox="0 0 10 10" height={14}>
              <path
                d="M 1,1 L 9,9 M 1,9 L 9,1"
                fill="transparent"
                stroke={white}
              />
            </svg>
          </Button>
        </div>
        <div className={mainContentClass}>{children}</div>
      </div>
      <SignHolder collapsed={collapsed}>
        <HandHoldingSign stickLength={50} className={handHoldClass} />
        <div className={armClass}>
          <MinimalArrow
            height={12}
            direction={collapsed ? 'left' : 'right'}
            onClick={() => {
              setCollapsed((currentCollapsed) => !currentCollapsed)
            }}
          />
        </div>
      </SignHolder>
    </div>
  )
}

export default SignModal
