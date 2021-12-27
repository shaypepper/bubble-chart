import { ColorMap } from '../ChartCreater/data/dataFormattingReducer'

export const getBubbleFillColor = (
  isWorker: boolean,
  assessment: string | number | Date,
  colorMap: ColorMap
) => {
  if (!isWorker) {
    return 'rgba(50,50,50, 0.2)'
  } else if (typeof assessment !== 'string') {
    return `hsl(${assessment}, 50%, 50%)`
  } else {
    return colorMap[assessment]
  }
}

export const getTextcolor = (
  isWorker: boolean,
  assessment: string | number | Date
) => {
  if (!isWorker) {
    return 'black'
  } else if (typeof assessment !== 'string') {
    return `hsl(${assessment}, 100%, 100%)`
  } else {
    return (
      {
        '1': 'white',
        '2': 'white',
        '3': 'black',
        '4': 'white',
        '5': 'white',
        '9': 'black',
      }[assessment] || 'white'
    )
  }
}

export function downloadURI(uri: string, name: string) {
  var link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
