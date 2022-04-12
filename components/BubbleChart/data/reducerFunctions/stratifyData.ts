import { csvParse, stratify } from 'd3'
import { Grouping, Groupings } from '../../types'
import { State } from '../dataFormattingReducer'

export function stratifyData(state: State): State {
  let { workersData, groupingsData: rawGroupingsData } = state

  let groupingsData = rawGroupingsData

  if (!groupingsData) {
    const fauxCsv = csvParse(
      `${workersData?.columnMap.uniqueIdentifier},${workersData?.columnMap.displayName},${workersData?.columnMap.grouping}\n`
    )
    groupingsData = new Groupings(
      fauxCsv,
      state.chartOptions,
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
    console.log('there was no allGroups')
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
  console.log(wtf.filter((d) => d.id === undefined))
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

    console.log({
      groupingsData: groupingsData.list.filter((g) => g.id === 'allGroups'),
      workersData: workersData?.list.filter((g) => g.id === 'Company'),
    })
  }
  return { ...state, stratifiedData }
}

export default stratifyData
