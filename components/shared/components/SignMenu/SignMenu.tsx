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
// ${() => (Math.random() * 2 - 1) * (Math.random() * 35 + 3)}deg
const SignMenuItemStyled = styled.div`
  transform: rotate(${({ rotation = 10 }) => rotation}deg) translateY(10px);
  position: relative;
  transform-origin: 80%;
  transition: transform 200ms ease;
  padding-bottom: 20px;

  &:hover {
    transform: rotate(${({ rotation = 10 }) => rotation}deg) translateY(-10px);
  }
`

const rotations = [-4, 15, -6, 20]

export const SignMenuItem: React.FC<{
  stickLength?: number
  onClick?: React.ReactEventHandler
  index?: number
}> = ({ children, stickLength = 40, onClick = () => {}, index = 0 }) => {
  return (
    <SignMenuItemStyled rotation={rotations[index]}>
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
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 1)
  );
`

export default SignMenu
