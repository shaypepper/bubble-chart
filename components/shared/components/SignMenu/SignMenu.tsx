import { css, styled } from 'pretty-lights'
import * as React from 'react'
import { Button } from 'react-bootstrap'
import HandHoldingSign from '../../icons/HandHoldingSign'
import MinimalArrow from '../../icons/MinimalArrow'
import { blue, deepGrey, green, white } from '../../tokens/colors'
import { bangersFont, latoFont } from '../../tokens/fonts'
import { pxToRem } from '../../tokens/spacing'

const SignHolder = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  transition: transform 400ms ease;
  width: 100%;
`

const handHoldClass = css`
  margin-right: calc(50% - 10px);
`

const signButtonClass = css`
  padding: 0;
  margin: 0 8px;
  letter-spacing: 1px;
  border: none;
  font-family: ${bangersFont};
  background-color: ${blue};
  color: ${white};
  padding: ${pxToRem(12)};
  position: relative;
  box-shadow: white 1px 1px 10px;
`

const SignMenuItemStyled = styled.div`
  transform: rotate(
      ${() => (Math.random() * 2 - 1) * (Math.random() * 35 + 3)}deg
    )
    translateY(10px);
  position: relative;
  transform-origin: 80%;
  transition: transform 200ms ease;
  padding-bottom: 20px;

  &:hover {
    transform: translateY(-20px);
  }
`

export const SignMenuItem: React.FC<{
  stickLength?: number
  onClick?: React.ReactEventHandler
}> = ({ children, stickLength = 40, onClick = () => {} }) => {
  return (
    <SignMenuItemStyled>
      <button className={signButtonClass} onClick={onClick}>
        <div>{children}</div>
      </button>
      <SignHolder>
        <HandHoldingSign
          stickLength={stickLength}
          className={handHoldClass}
          width={20}
        />
      </SignHolder>
    </SignMenuItemStyled>
  )
}

export const SignMenu = styled.div`
  position: fixed;
  bottom: -20px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: 150px;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(50, 50, 50, 1),
    rgba(255, 255, 255, 1)
  );
  z-index: -1;
`

export default SignMenu
