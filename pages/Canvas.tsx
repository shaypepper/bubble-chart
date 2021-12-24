import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import BubbleChart from '../components/BubbleChart'
import WorkerDataProvider from '../components/ChartCreater/data/WorkerDataProvider'
import ChartCreater from '../components/ChartCreater'
// import BubbleChart from '../components/BubbleChartJS.jsx'
import styles from '../styles/Home.module.css'
import BubbleChartCanvas from '../components/BubbleChart/BubbleChartCanvas'

const Canvas: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Organized organizers</h1>
          <BubbleChartCanvas />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  )
}

export default Canvas
