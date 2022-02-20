export type BubbleTheme = {
  textColor: string
  fillColor: string
}

export type HSLColor = {
  h: number
  s: number
  l: number
}

export type ChartTheme = {
  leaf: {
    default: BubbleTheme
    categorical?: BubbleTheme[]
    numeric: {
      min: HSLColor
      max: HSLColor
    }
  }
  group: BubbleTheme
  font: string
}

// export const timesGuildTheme: ChartTheme = {
//   leaf: {
//     default: {
//       fillColor: 'hsl(226, 100%, 69%)',
//       textColor: 'hsl(226, 100%, 100%)',
//     },
//   },
//   group: {
//     fillColor: 'hsla(226, 100%, 69%, 0.2)',
//     textColor: 'hsl(226, 100%, 0%)',
//   },
//   font: 'Monaco',
// }

export const timesGuildTheme: ChartTheme = {
  leaf: {
    default: {
      fillColor: 'hsl(226, 100%, 69%)',
      textColor: 'hsl(226, 100%, 100%)',
    },
    categorical: [
      {
        fillColor: 'hsl(226, 60%, 40%)',
        textColor: 'white',
      },
      {
        fillColor: 'hsl(103, 60%, 40%)',
        textColor: 'white',
      },
      {
        fillColor: 'hsl(12, 60%, 40%)',
        textColor: 'white',
      },
      {
        fillColor: 'hsl(57, 60%, 40%)',
        textColor: 'white',
      },
      {
        fillColor: 'hsl(178, 60%, 40%)',
        textColor: 'white',
      },
    ],
    numeric: {
      min: {
        fillColor: {
          h: 1,
          s: 50,
          l: 40,
        },
      },

      max: {
        fillColor: {
          h: 150,
          s: 50,
          l: 40,
        },
      },
    },
  },
  group: {
    fillColor: 'hsla(226, 100%, 69%, 0.2)',
    textColor: 'hsl(226, 100%, 0%)',
  },
  font: 'Monaco',
}

export enum Themes {
  WIRECUTTER = 'wirecutter',
}

export enum TimesStatuses {
  OC = '1. OC',
  OUTREACH = '2. Doing outreach',
  PUBLIC = '2. Showing public support',
  SIGNED = '3. Has signed, not public',
  INTERESTED = '3. Not signed, interested',
  NEUTRAL = '3. Not signed, neutral',
  NOT_INTERESTED = '4. Not interested',
  LEAVE_ALONE = '4. Leave alone for now',
  ANTI_UNION = '5. Anti-union',
  UNASSESSED = '999. Unassessed',
  UNRESPONSIVE = '999. Not responsive',
}

export enum Colors {
  BLACK = 'black',
  WHITE = 'white',
  BURGUNDY = '#b32d2d',
  RED = '#ff4040',
  PINK = 'pink',
  GREY = 'lightgrey',
  MUSTARD = 'gold',
}

// colors = {
//   '1. OC': '#b32d2d',
//   '2. Doing outreach': '#b32d2d',
//   '2. Showing public support': '#ff4040',
//   '3. Has signed, not public': '#ffbdbd',
//   '3. Not signed, interested': 'lavender',
//   '3. Not signed, neutral': 'lavender',
//   '4. Not interested': 'dimgrey',
//   '4. Leave alone for now': 'dimgrey',
//   '5. Anti-union': 'dimgrey',
//   '999. Unassessed': 'white',
//   '999. Not responsive': 'white',
//   "Something's weird": 'black',
// }

// text_colors = {
//   '1. OC': 'white',
//   '2. Doing outreach': 'white',
//   '2. Showing public support': 'white',
//   '3. Has signed, not public': 'black',
//   '3. Not signed, interested': 'black',
//   '3. Not signed, neutral': 'black',
//   '4. Not interested': 'black',
//   '4. Leave alone for now': 'black',
//   '5. Anti-union': 'black',
//   '999. Unassessed': 'black',
//   '999. Not responsive': 'black',
//   "Something's weird": 'black',
// }

export const timesStatusMap = {
  [TimesStatuses.OC]: { fillColor: Colors.BURGUNDY, textColor: Colors.WHITE },
  [TimesStatuses.OUTREACH]: {
    fillColor: Colors.BURGUNDY,
    textColor: Colors.WHITE,
  },
  [TimesStatuses.PUBLIC]: { fillColor: Colors.RED, textColor: Colors.WHITE },
  [TimesStatuses.SIGNED]: { fillColor: Colors.PINK, textColor: Colors.BLACK },
  [TimesStatuses.INTERESTED]: {
    fillColor: Colors.PINK,
    textColor: Colors.BLACK,
  },
  [TimesStatuses.NEUTRAL]: { fillColor: Colors.PINK, textColor: Colors.BLACK },
  [TimesStatuses.NOT_INTERESTED]: {
    fillColor: Colors.GREY,
    textColor: Colors.BLACK,
  },
  [TimesStatuses.LEAVE_ALONE]: {
    fillColor: Colors.GREY,
    textColor: Colors.BLACK,
  },
  [TimesStatuses.ANTI_UNION]: {
    fillColor: Colors.GREY,
    textColor: Colors.BLACK,
  },
  [TimesStatuses.UNASSESSED]: {
    fillColor: Colors.MUSTARD,
    textColor: Colors.BLACK,
  },
  [TimesStatuses.UNRESPONSIVE]: {
    fillColor: Colors.MUSTARD,
    textColor: Colors.BLACK,
  },
}
