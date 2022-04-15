import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { DataForPowerPages } from '../components/shared/components/Header'
import Layout from '../components/shared/components/Layout'
import WorkerDataProvider from '../components/BubbleChart/data/WorkerDataProvider'
import BubbleChart from '../components/BubbleChart'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Data for Power</title>
        <meta
          name="description"
          content="Created by Shay Culpepper for unionists everywhere"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout currentPage={DataForPowerPages.BUBBLE_CHART}>
        <WorkerDataProvider>
          <BubbleChart />
        </WorkerDataProvider>
      </Layout>
      <footer className={styles.footer} />
    </div>
  )
}

export default Home
