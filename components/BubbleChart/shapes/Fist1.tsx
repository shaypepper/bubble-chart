import * as React from 'react'
import { ShapeComponent, ShapeSVG } from './Shape'

const pathCommands = `M51.6553 27.1287C50.7469 26.8712 50.5388 25.5354 51.3109 24.992C54.9347 22.4411 57.3682 19.0587 57.8511 15.3176C58.9083 7.12791 50.2178 0.320382 38.4404 0.112536C26.663 -0.0953092 16.2585 6.37523 15.2013 14.5649C14.4384 20.4756 18.7528 25.6663 25.6406 28.1757C26.5437 28.5047 26.6659 29.8869 25.8173 30.3383C9.63959 38.944 -1.3169 58.8765 0.127661 79.5059C2.28718 110.345 79.9 93.9424 77.7405 63.1029C77.382 57.9844 76.2883 53.2254 74.5883 48.9381C74.527 48.7835 74.5949 48.6076 74.7445 48.5349C79.039 46.4476 82.9361 44.1871 85.9096 41.6487C88.8581 39.1316 91.3123 35.9851 91.8794 32.074C92.4702 27.9988 90.8773 24.1114 87.865 20.5193C87.2633 19.8019 86.5942 19.0821 85.857 18.3589C85.5681 18.0755 85.4746 17.6499 85.5921 17.2626C85.8573 16.3884 86 15.4609 86 14.5C86 9.25329 81.7467 5 76.5 5C71.2533 5 67 9.25329 67 14.5C67 19.7467 71.2533 24 76.5 24C77.3852 24 78.2422 23.8789 79.0552 23.6524C79.4113 23.5532 79.799 23.6287 80.0652 23.8851C80.7052 24.5013 81.2596 25.0928 81.7351 25.6598C83.8525 28.1848 84.1175 29.8549 83.9622 30.9261C83.7909 32.107 82.9574 33.6502 80.7153 35.5642C78.4983 37.4569 75.3021 39.369 71.2474 41.3398C70.9793 41.4701 70.6566 41.3792 70.4899 41.132C65.8202 34.2081 59.2413 29.279 51.6553 27.1287Z`

const Fist1: ShapeComponent = ({ height, fillColor, onClick }) => (
  <ShapeSVG size={height} onClick={onClick}>
    <path d={pathCommands} fill={fillColor} />
  </ShapeSVG>
)

Fist1.pathCommands = pathCommands

export default Fist1
