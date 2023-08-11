import * as React from 'react'
import { ShapeComponent, ShapeSVG } from './Shape'
;<svg
  width="100"
  height="100"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clipPath="url(#clip0_1033_938)">
    <rect width="100" height="100" fill="white" />
    <path
      d="M28.4939 5.9238C20.1451 11.1417 20.0236 23.621 20.0236 23.621C20.0236 23.621 7.07858 20.1181 0.986478 35.9734C-3.65107 48.0431 9.56803 50.6429 9.56803 50.6429C9.56803 50.6429 1.50913 55.641 4.91611 66.0231C8.57224 77.1644 18.5299 77.1644 18.5299 77.1644C18.5299 77.1644 11.0555 96.0335 25.9983 99.1822C43.6956 102.911 46.9094 92.677 46.9094 92.677C46.9094 92.677 51.8883 100.345 65.8291 96.1798C84.2509 90.6753 75.2889 78.1652 75.2889 78.1652C75.2889 78.1652 83.3883 80.5647 91.368 73.5355C101.54 64.575 91.368 52.6445 91.368 52.6445C91.368 52.6445 103.064 46.2417 99.2272 35.9734C96.035 27.4298 84.2509 22.6201 84.2509 22.6201C84.2509 22.6201 83.852 2.60885 71.7198 0.289498C61.0792 -1.74471 51.8883 7.60798 51.8883 7.60798C51.8883 7.60798 37.4158 0.347697 28.4939 5.9238Z"
      fill="#EC315E"
    />
  </g>
  <defs>
    <clipPath id="clip0_1033_938">
      <rect width="100" height="100" fill="white" />
    </clipPath>
  </defs>
</svg>

const pathCommands = `M28.4939 5.9238
  C20.1451 11.1417 20.0236 23.621 20.0236 23.621
  C20.0236 23.621 7.07858 20.1181 0.986478 35.9734
  C-3.65107 48.0431 9.56803 50.6429 9.56803 50.6429
  C9.56803 50.6429 1.50913 55.641 4.91611 66.0231
  C8.57224 77.1644 18.5299 77.1644 18.5299 77.1644
  C18.5299 77.1644 11.0555 96.0335 25.9983 99.1822
  C43.6956 102.911 46.9094 92.677 46.9094 92.677
  C46.9094 92.677 51.8883 100.345 65.8291 96.1798
  C84.2509 90.6753 75.2889 78.1652 75.2889 78.1652
  C75.2889 78.1652 83.3883 80.5647 91.368 73.5355
  C101.54 64.575 91.368 52.6445 91.368 52.6445
  C91.368 52.6445 103.064 46.2417 99.2272 35.9734
  C96.035 27.4298 84.2509 22.6201 84.2509 22.6201
  C84.2509 22.6201 83.852 2.60885 71.7198 0.289498
  C61.0792 -1.74471 51.8883 7.60798 51.8883 7.60798
  C51.8883 7.60798 37.4158 0.347697 28.4939 5.9238Z`

const Cloud: ShapeComponent = ({ height, fillColor, onClick }) => (
  <ShapeSVG size={height} onClick={onClick}>
    <path d={pathCommands} fill={fillColor} />
  </ShapeSVG>
)

Cloud.pathCommands = pathCommands

export default Cloud