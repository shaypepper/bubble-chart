import * as React from 'react'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import HandHoldingSign from '../../icons/HandHoldingSign'
import { deepGrey, white } from '../../tokens/colors'
import { bangersFont } from '../../tokens/fonts'
import { pxToRem } from '../../tokens/spacing'

const signHolderClass = css`
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
  background-color: ${deepGrey};
  color: ${white};
  padding: ${pxToRem(12)};
  position: relative;
  box-shadow: white 1px 1px 10px;
  pointer-events: auto;
`
const SignMenuItemStyled = styled.div<{ rotation: number }>(
  (props) => `
  position: relative;
  transform-origin: 80%;
  transition: transform 200ms ease;
  padding-bottom: 20px;

  &:hover {
    transform: rotate(${props.rotation}deg) translateY(-10px);
  }
`
)

const rotations = [-15, 14, 0, -10]

export const SignMenuItem: React.FC<{
  stickLength?: number
  onClick?: React.ReactEventHandler
  index?: number
  center?: boolean
}> = ({ children, stickLength = 40, onClick = () => {}, index = 0 }) => {
  return (
    <SignMenuItemStyled rotation={rotations[index]}>
      <button className={signButtonClass} onClick={onClick}>
        <div>{children}</div>
      </button>
      <div className={signHolderClass}>
        <HandHoldingSign
          stickLength={stickLength}
          className={handHoldClass}
          width={20}
        />
      </div>
    </SignMenuItemStyled>
  )
}

export const SignMenu = styled.div`
  position: fixed;
  bottom: -40px;
  right: 0;
  transition: transform 700ms ease;
  transform: translateY(
    ${({ slideDown }: { slideDown: boolean }) => (slideDown ? '300px' : '0')}
  );
  display: flex;
  width: 100%;

  align-items: flex-end;
  justify-content: flex-end;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 1)
  );
  pointer-events: none;
`

export default SignMenu
