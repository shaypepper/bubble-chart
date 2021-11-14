import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import BubbleChart from '../components/BubbleChart'
import WorkerDataProvider from '../components/BubbleChart/WorkerDataProvider'
import ChartCreater from '../components/ChartCreater'
// import BubbleChart from '../components/BubbleChartJS.jsx'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Organized workers for organizing</h1>
          <ChartCreater />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  )
}

export default Home
