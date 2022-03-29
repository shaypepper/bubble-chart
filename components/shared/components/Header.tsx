import * as React from 'react'
import { css } from 'pretty-lights'
import { deepGrey, white, yellow } from '../tokens/colors'
import { pxToRem } from '../tokens/spacing'
import Scabby from '../icons/Scabby'
import { bungeeFont, doppioOneFont } from '../tokens/fonts'
import Link from 'next/link'

export enum DataForPowerPages {
  BUBBLE_CHART = 'bubble-chart',
  ABOUT = 'about',
  LESSONS = 'lessons',
}

const headerClass = css`
  display: flex;
  width: 100%;
  padding: 0 ${pxToRem(12)};
  background-color: ${deepGrey};
`

const titleClass = css`
  color: ${yellow};
  font-family: ${bungeeFont};
  flex-grow: 1;
  margin: ${pxToRem(12)} 0;
  line-height: 1;
`

const navClass = css`
  display: flex;
  font-family: ${doppioOneFont};
  align-items: center;
`
const navItemClass = css`
  margin: 0;
  padding: 0 ${pxToRem(10)};
  color: ${white};
  background-color: transparent;
  height: ${pxToRem(32)};
  margin-right: ${pxToRem(10)};
  border: none;
  border-radius: 5px;
`

const currentNavItemClass = css`
  ${navItemClass};

  color: ${deepGrey};
  background-color: ${white};
`

const scabbyClass = css`
  align-self: end;
`

const Header: React.FC<{ currentPage: DataForPowerPages }> = ({
  currentPage = DataForPowerPages.BUBBLE_CHART,
}) => {
  return (
    <header className={headerClass}>
      <h1 className={titleClass}>Data for power</h1>
      <nav className={navClass}>
        <Link href="/lessons" passHref>
          <button
            className={
              currentPage === DataForPowerPages.LESSONS
                ? currentNavItemClass
                : navItemClass
            }
          >
            Lessons
          </button>
        </Link>
        <Link href="/bubble-chart" passHref>
          <button
            className={
              currentPage === DataForPowerPages.BUBBLE_CHART
                ? currentNavItemClass
                : navItemClass
            }
          >
            Bubble Chart
          </button>
        </Link>
        <Link href="/about" passHref>
          <button
            className={
              currentPage === DataForPowerPages.ABOUT
                ? currentNavItemClass
                : navItemClass
            }
          >
            About
          </button>
        </Link>
      </nav>
      <Scabby fill={yellow} size={50} className={scabbyClass} />
    </header>
  )
}

export default Header