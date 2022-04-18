import { stratify } from 'd3'
import { State } from '../dataFormattingReducer'
import { Grouping, Worker } from '../types'

export function stratifyData(state: State): State {
  let { workersData } = state
  const primaryGroupings = [...new Set(workersData?.primaryGroupings)] || []
  const secondaryGroupings = [...new Set(workersData?.secondaryGroupings)] || []

  const mappedGroupings = primaryGroupings.reduce((memo: any[], g1) => {
    return [
      ...memo,
      ...secondaryGroupings
        .map((g2) => ({
          id: `g: ${g1} - ${g2}`,
          grouping: `g: ${g1}`,
          displayName: g2,
        }))
        .filter((g) => workersData?.groupings?.has(g.id)),
      {
        id: `g: ${g1}`,
        grouping: 'allGroups',
        displayName: g1,
      },
    ]
  }, [])

  const strat = stratify<Worker | Grouping>()
    .id((d) => `${d?.id}`)
    .parentId((d) => d?.grouping)
  if (!state.workersData) {
    return state
  }

  const wtf = [
    ...state.workersData.list,
    ...mappedGroupings,
    { id: 'allGroups', displayName: '', grouping: '' },
  ]
  let stratifiedData
  try {
    stratifiedData = strat(wtf)
      // const stratifiedData = strat([...state.workersData])
      .sum(() => 1)
      .sort((a, b) => (b?.value || 0) - (a?.value || 0))
  } catch (err) {
    console.log(err)
    if (typeof err !== 'object') {
      return { ...state }
    }
  }

  return { ...state, stratifiedData }
}

export default stratifyData
