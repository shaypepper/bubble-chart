import { FC, ReactEventHandler } from 'react'
import { css, cx } from 'pretty-lights'

const pointLeftClass = css``
const pointRightClass = css`
  transform: rotateY(0.5turn);
`

const MinimalArrow: FC<{
  direction?: 'left' | 'right'
  onClick: ReactEventHandler
  height?: number
}> = ({ direction = 'left', onClick, height = 100 }) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        css`
          background: transparent;
          width: min-content;
          border: none;
          transition: transform 800ms ease;
        `,
        {
          [pointLeftClass]: direction === 'left',
          [pointRightClass]: direction === 'right',
        }
      )}
    >
      <svg
        height={height}
        viewBox="0 0 5 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 7 L5 0 L5 14 L0 7Z" fill="#CCC" />
      </svg>
    </button>
  )
}

export default MinimalArrow
