import ChartCreater from '../../components/BubbleChart/ChartCreater'
import { css } from 'pretty-lights'
import { DataForPowerPages } from '../../components/shared/components/Header'
import { NextPage } from 'next'
import Layout from '../../components/shared/components/Layout'

const BubbleChartPage: NextPage = () => {
  return (
    <Layout currentPage={DataForPowerPages.BUBBLE_CHART}>
      <ChartCreater />
    </Layout>
  )
}

export default BubbleChartPage
