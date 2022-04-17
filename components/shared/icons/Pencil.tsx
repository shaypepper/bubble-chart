import { FC } from 'react'
import { css } from 'pretty-lights'

const circleClass = css`
  transition: opacity 100ms ease;
  opacity: 0;
  &:hover {
    opacity: 0.2;
  }
`
const Pencil: FC<{
  size: number
  transform: string
  onClick: () => void
}> = ({ size, transform, onClick }) => {
  return (
    <g transform={transform} onClick={onClick}>
      <svg
        width={size}
        viewBox="-30 -30 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle fill="#FFFFFF60" r={35} transform={`translate(${20} ${20})`} />
        <path
          d="M31.1845 0.000502112C30.7148 -0.00729724 30.2482 0.0758353 29.8125 0.244954C29.3768 0.414073 28.9809 0.665724 28.6484 0.984936L27.0877 2.53212L37.3774 12.474L38.938 10.9283C39.2747 10.6051 39.5418 10.2212 39.724 9.79868C39.9062 9.37613 40 8.92317 40 8.46573C40 8.00829 39.9062 7.55534 39.724 7.13279C39.5418 6.71023 39.2747 6.32637 38.938 6.00315L33.7691 1.03146C33.0821 0.374287 32.1535 0.00387722 31.1845 0.000502112ZM25.332 3.89322L22.8926 6.14421L33.6223 16.4613L36.1101 14.2568L25.332 3.89322ZM21.3304 7.78593L4.45933 23.8685C4.26765 23.9629 4.09897 24.0953 3.96445 24.2569C3.82993 24.4186 3.73263 24.6059 3.67899 24.8064L0.0675551 36.5791C-0.0139858 36.8334 -0.0218661 37.1042 0.0447622 37.3625C0.111391 37.6208 0.250005 37.8567 0.445687 38.0448C0.641369 38.233 0.88671 38.3663 1.15531 38.4303C1.4239 38.4944 1.70558 38.4868 1.97003 38.4084L14.2121 34.9374C14.49 34.8975 14.7509 34.7844 14.9661 34.6107C15.1812 34.4369 15.3421 34.2093 15.431 33.953L32.0617 18.1015L29.7706 15.8985L12.6998 32.3593L5.82337 34.2801L4.35945 32.874L6.45701 25.9815L23.3811 9.7548L21.3304 7.78443V7.78593ZM25.037 11.3965L7.91938 27.9038L10.4056 28.4185L10.7473 30.6245L27.9149 14.1622L25.037 11.3965Z"
          fill="black"
        />
        <circle
          fill="#000000"
          r={35}
          transform={`translate(${20} ${20})`}
          className={circleClass}
        />
      </svg>
    </g>
  )
}

export default Pencil
