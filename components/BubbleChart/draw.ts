import { Person } from '../ChartCreater/data/dataFormattingReducer'

export function drawWorkerBubble() {}

export function drawGroupingBubble() {}

export function drawBubble(
  d: d3.HierarchyCircularNode<Person>,
  context: CanvasRenderingContext2D,
  chartDimensions,
  idx: number
) {
  if (context === null || context === undefined) return
  const { height, width } = chartDimensions

  const translation = {
    x: (idx ? d.x : 0.5) * width,
    y: (idx ? d.y : 0.5) * height,
  }
  const r = d.r * height
  const textR = d.children ? r : r * 0.8

  drawCircle(context, translation, r)
  drawTextAlongArc(context, d.data.Name, translation.x, translation.y, textR)
}

export function drawCircle(context: CanvasRenderingContext2D, translation, r) {
  // context.fillStyle = 'hsla(0, 0%, 0%, 0.4)'
  context.fillStyle = 'white'
  context.strokeStyle = 'yellow'
  context.beginPath()
  context.arc(translation.x, translation.y, r, 0, 2 * Math.PI)
  context.fill()
}

export function drawTextAlongArc(
  context: CanvasRenderingContext2D,
  str: string,
  centerX: number,
  centerY: number,
  radius: number
) {
  const fontSize = Math.min(Math.sqrt(radius) * 1.5, 50)
  context.font = `${fontSize}pt monaco`
  context.textAlign = 'center'
  context.fillStyle = 'grey'
  context.strokeStyle = 'green'
  context.lineWidth = 1

  let len = str.length
  let angle = Math.PI * (len / Math.pow(fontSize, 1.2))
  // let angle = Math.PI * ((radius * len) / (400 * fontSize))
  context.save()
  context.translate(centerX, centerY)
  context.rotate((-1 * angle) / 2)
  context.rotate((-1 * (angle / len)) / 2)
  for (let n = 0; n < len; n++) {
    context.rotate(angle / len)
    context.save()
    context.translate(0, -1 * radius)
    context.fillText(str[n], 0, 0)
    context.restore()
  }
  context.restore()

  context.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI, false)
  context.stroke()
}
