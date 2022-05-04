import { FC } from 'react'
import SignModal from '../components/shared/components/SignModal'

const FourOhFour: FC = () => {
  return (
    <SignModal
      title={'404: Page not found'}
      onDismiss={() => {
        if (window) {
          window.location.href = '/'
        }
      }}
      hide={false}
    >
      <div>
        I&apos;m not sure where you were trying to go, but did you know that The
        New York Times&apos; technology employees won their election 404 to 88?
        That&apos;s not the 404 you&apos;re here for, but it&apos;s never a bad
        time to tell that story.
      </div>
    </SignModal>
  )
}

export default FourOhFour
