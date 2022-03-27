import * as React from 'react'
import Header, {
  DataForPowerPages,
} from '../../components/shared/components/Header'

const Lessons = () => {
  return (
    <>
      <Header currentPage={DataForPowerPages.LESSONS} />
      <h1>here we gooooo</h1>
    </>
  )
}

export default Lessons
