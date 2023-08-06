import { stratify } from 'd3'
import { State } from '../dataFormattingReducer'
import { Grouping, Value, Worker, Workers } from '../types'

export function stratifyData(state: State): State {
  let { workersData } = state

  const mappedGroupings: Grouping[] = createGroups(
    workersData?.uniqueGroupingValues || [],
    [],
    workersData
  )
  console.log({ mappedGroupings })

  const strat = stratify<Worker | Grouping>()
    .id((d) => `${d?.id}`)
    .parentId((d) => d?.grouping)
  if (!state.workersData) {
    return state
  }

  const wtf: (Worker | Grouping)[] = [
    ...state.workersData.list,
    ...mappedGroupings,
    { id: 'allGroups', displayName: '', grouping: '', nodeType: 'grouping' },
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

function createGroups(
  nestedGroups: { values: Value[]; colName: string }[],
  parentGroupingValues: { value: Value; colName: string }[],
  workersData: Workers | undefined
) {
  if (!workersData) {
    return []
  }
  const currentGrouping = nestedGroups[0]
  const newNestedGroups = nestedGroups.slice(1)
  const parentGroupingsId = parentGroupingValues
    .map((pg) => pg.value)
    .join(' - ')

  if (nestedGroups.length === 1) {
    return [
      ...currentGrouping.values
        .map(
          (gv): Grouping => ({
            id: parentGroupingsId
              ? `g: ${parentGroupingsId} - ${gv}`
              : `g: ${gv}`,
            grouping:
              parentGroupingValues.length === 0
                ? 'allGroups'
                : `g: ${parentGroupingsId}`,
            displayName: `${
              parentGroupingValues.length >= 2
                ? `${currentGrouping.colName}: `
                : ''
            } ${gv}`,
            nodeType: 'grouping',
          })
        )
        .filter((g) =>
          [...workersData?.uniqueGroupings].find((ug) =>
            `${ug}`.startsWith(g.id)
          )
        ),
    ]
  }

  const groupingList: Grouping[] = []

  currentGrouping?.values.forEach((groupingValue) => {
    if (parentGroupingValues.length === 0) {
      groupingList.push({
        id: `g: ${groupingValue}`,
        grouping: 'allGroups',
        displayName: `${groupingValue}`,
        nodeType: 'grouping',
      })
    } else {
      groupingList.push({
        id: `g: ${parentGroupingsId} - ${groupingValue}`,
        grouping: `g: ${parentGroupingsId}`,
        displayName: `${groupingValue}`,
        nodeType: 'grouping',
      })
    }

    groupingList.push(
      ...createGroups(
        newNestedGroups,
        [...parentGroupingValues, { value: groupingValue, ...currentGrouping }],
        workersData
      )
    )
  })

  return groupingList.filter((g) =>
    [...workersData?.uniqueGroupings].find((ug) => `${ug}`.startsWith(g.id))
  )
}
