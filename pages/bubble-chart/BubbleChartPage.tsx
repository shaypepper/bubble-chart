import ChartCreater from '../../components/ChartCreater'
import { css } from 'pretty-lights'
import Header, {
  DataForPowerPages,
} from '../../components/shared/components/Header'
import { NextPage } from 'next'
import Layout from '../../components/shared/components/Layout'

const containerClass = css``
const mainClass = css``
const footerClass = css``

const BubbleChartPage: NextPage = () => {
  return (
    <Layout currentPage={DataForPowerPages.BUBBLE_CHART}>
      <ChartCreater />
    </Layout>
  )
}

export default BubbleChartPage
