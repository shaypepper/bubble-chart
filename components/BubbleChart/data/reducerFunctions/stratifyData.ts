import { csvParse, DSVRowArray, stratify } from 'd3'
import { Grouping, Groupings, Node } from '../types'
import { State } from '../dataFormattingReducer'

export function stratifyData(state: State): State {
  let { workersData, groupingsData: rawGroupingsData } = state

  let groupingsData = rawGroupingsData

  if (!groupingsData) {
    const fauxCsv: DSVRowArray<string> = csvParse(
      `${workersData?.columnMap.uniqueIdentifier},${workersData?.columnMap.displayName},${workersData?.columnMap.grouping}\n,,\n`
    )
    groupingsData = new Groupings(
      fauxCsv,
      workersData?.columnMap || {
        uniqueIdentifier: 'uniqueIdentifier',
        displayName: 'displayName',
        grouping: 'grouping',
      }
    )
  }

  const workerGroupings = workersData?.groupings || new Set()
  const parentGroupings = groupingsData?.groupings || new Set()

  const uniqueIdentifier = groupingsData?.columnMap.uniqueIdentifier || ''
  const displayName = groupingsData?.columnMap.displayName || ''
  const grouping = groupingsData?.columnMap.grouping || ''

  if (groupingsData.groupings.has('')) {
    groupingsData.list.find((g) => {
      if (!g.grouping && g.id !== 'allGroups') {
        g.rawData[grouping] = 'allGroups'
      }
    })
  }

  if (workersData?.groupings.has('')) {
    workersData.list.find((g) => {
      if (!g.grouping && g.id !== 'allGroups') {
        g.rawData[grouping] = 'allGroups'
      }
    })
  }

  for (let groupingId of [...workerGroupings, ...parentGroupings]) {
    if (
      groupingsData?.ids.has(groupingId) ||
      !groupingId ||
      groupingId === 'allGroups'
    )
      continue
    groupingsData?.list.push(
      new Grouping(
        {
          [grouping || '*']: 'allGroups',
          [uniqueIdentifier || '**']: groupingId,
          [displayName || '***']: groupingId,
        },
        groupingsData
      )
    )
  }

  if (!groupingsData.ids.has('allGroups')) {
    groupingsData?.list.push(
      new Grouping(
        {
          [grouping || '*']: '',
          [uniqueIdentifier || '**']: 'allGroups',
          [displayName || '***']: 'allGroups',
        },
        groupingsData
      )
    )
  }

  const strat = stratify<Node>()
    .id((d) => `${d?.id}`)
    .parentId((d) => `${d?.grouping}`)
  if (!state.workersData) {
    return state
  }

  const wtf = [...state.workersData.list, ...(groupingsData?.list || [])]
  let stratifiedData
  try {
    stratifiedData = strat(wtf)
      // const stratifiedData = strat([...state.workersData])
      .sum(() => 1)
      .sort((a, b) => (b?.value || 0) - (a?.value || 0))
  } catch (err) {
    if (typeof err !== 'object') {
      return { ...state }
    }
  }
  return { ...state, stratifiedData }
}

export default stratifyData
