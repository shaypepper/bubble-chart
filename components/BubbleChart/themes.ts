export type BubbleTheme = {
  textColor: string
  fillColor: string
}

export type ChartTheme = {
  leaf: BubbleTheme
  group: BubbleTheme
  font: string
}

export const wirecutterTheme: ChartTheme = {
  leaf: {
    fillColor: 'hsl(226, 100%, 69%)',
    textColor: 'hsl(226, 100%, 100%)',
  },
  group: {
    fillColor: 'hsla(226, 100%, 69%, 0.2)',
    textColor: 'hsl(226, 100%, 0%)',
  },
  font: 'Monaco',
}
