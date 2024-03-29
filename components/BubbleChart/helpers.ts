type GetShapePathArgs = {
  whichShape: number
  f?: (n: number) => number
  g?: (n: number) => number
}

export const getShapeViewbox = ({
  whichShape = 1,
}: GetShapePathArgs): string => {
  switch (whichShape) {
    case 1:
      return '24 10 22 22'
    case 2:
      return '40 10 20 22'
    case 3:
      return '58 10 22 22'
    default:
      return ''
  }
}

export const getShapePath = ({
  whichShape = 1,
  f = (n) => n,
  g = (n) => n,
}: GetShapePathArgs): string => {
  switch (whichShape) {
    case 1:
      return [
        `M${f(25.3067)} ${g(13.7123)}`,
        `L${f(27.7855)} ${g(21.4906)}`,
        `L${f(23.6336)} ${g(26.5626)}`,
        `L${f(31.1533)} ${g(26.7769)}`,
        `L${f(34.2927)} ${g(32.2531)}`,
        `L${f(36.3088)} ${g(26.936)}`,
        `L${f(42.9694)} ${g(25.0341)}`,
        `L${f(36.6457)} ${g(20.994)}`,
        `L${f(38.2128)} ${g(12.8152)}`,
        `L${f(32.3522)} ${g(17.6912)}`,
        `L${f(25.3067)} ${g(13.7123)}Z`,
      ].join('')
    case 2:
      return [
        `M${f(49.505)}   ${g(12)}`,
        `L${f(46.4356)}  ${g(19.5648)}`,
        `L${f(40)}       ${g(20.8083)}`,
        `L${f(45.636)}   ${g(25.7824)}`,
        `L${f(44.5545)}  ${g(32)}`,
        `L${f(49.55)}    ${g(29.2021)}`,
        `L${f(55.8416)}  ${g(32)}`,
        `L${f(53.644)}   ${g(24.8497)}`,
        `L${f(60)}       ${g(19.5648)}`,
        `H${f(52.362)}`,
        `L${f(49.505)}   ${g(12)}Z`,
      ].join('')
    case 3:
      return [
        `M${f(77.923)}  ${g(22.991)}`,
        `L${f(71.306)}  ${g(18.21)}`,
        `L${f(71.6298)} ${g(11.663)}`,
        `L${f(65.4556)} ${g(15.961)}`,
        `L${f(59.6758)} ${g(13.423)}`,
        `L${f(61.2152)} ${g(18.897)}`,
        `L${f(56.9896)} ${g(24.386)}`,
        `L${f(64.4764)} ${g(23.876)}`,
        `L${f(68.0779)} ${g(31.384)}`,
        `L${f(69.8923)} ${g(23.9)}`,
        `L${f(77.923)}  ${g(22.9915)}Z`,
      ].join('')
    default:
      return ''
  }
}
