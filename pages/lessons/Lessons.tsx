import * as React from 'react'
import Header, {
  DataForPowerPages,
} from '../../components/shared/components/Header'
import FauxBubble, { BubbleKonva } from '../../components/BubbleChart/Bubble'

const Lessons = () => {
  return (
    <>
      <Header currentPage={DataForPowerPages.LESSONS} />
      <h1>here we gooooo</h1>
      {/* <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <FauxBubble />
      <BubbleKonva /> */}
    </>
  )
}

export default Lessons
