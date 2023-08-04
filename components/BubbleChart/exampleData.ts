import { DSVRowArray } from 'd3'
import { StarOptions } from './data/types'

export const exampleColumnMap = {
  uniqueIdentifier: 'Issue',
  displayName: 'Issue',
  primaryGrouping: 'Category',
  secondaryGrouping: 'SubCategory',
}

export const exampleStarOptions = [
  new StarOptions(),
  new StarOptions('IssueType', 'blue', 'Top Issue', 'Try this out', true),
  new StarOptions(),
]

export const exampleData: DSVRowArray = Object.assign(
  [
    {
      Issue: 'Bargaining',
      Category: 'Our union',
      SubCategory: 'Our union',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Issue: 'Bargaining',
      Category: 'Our union',
      SubCategory: 'Our union',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Issue: 'Bargaining',
      Category: 'Our union',
      SubCategory: 'Our union',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Issue: 'Bargaining',
      Category: 'Our union',
      SubCategory: 'Our union',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
  ],
  {
    columns: ['Issue', 'Category', 'TopIssue', 'BackgroundColor', 'IssueType'],
  }
)
