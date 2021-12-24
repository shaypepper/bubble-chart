import { Person } from '../ChartCreater/data/dataFormattingReducer'

export function drawWorkerBubble() {}

export function drawGroupingBubble() {}

export function drawBubble(
  d: d3.HierarchyCircularNode<Person>,
  context: CanvasRenderingContext2D,
  height: number,
  width: number,
  idx: number
) {
  if (context === null || context === undefined) return
  const translation = {
    x: (idx ? d.x : 0.5) * width,
    y: (idx ? d.y : 0.5) * height,
  }
  const r = d.r * height
  console.log({ d, translation, r })

  context.fillStyle = 'hsla(0, 0%, 0%, 0.2)'
  context.beginPath()
  context.arc(translation.x, translation.y, r, 0, 2 * Math.PI)
  context.fill()
}

export function drawTextArc(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  d: d3.HierarchyCircularNode<Person>
) {
  console.log({ context, centerX, centerY, radius })
  context.font = '12pt helvetica'
  context.textAlign = 'center'
  context.fillStyle = 'yellow'
  context.strokeStyle = 'blue'
  context.lineWidth = 1

  drawTextAlongArc(context, d.data.Name || '', centerX, centerY, radius)
}

export function drawTextAlongArc(
  context: CanvasRenderingContext2D,
  str: string,
  centerX: number,
  centerY: number,
  radius: number
) {
  let angle = Math.PI * 0.6
  let len = str.length
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
