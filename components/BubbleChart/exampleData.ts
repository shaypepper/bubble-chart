import { DSVRowArray } from 'd3'

export const exampleColumnMap = {
  uniqueIdentifier: 'Issue',
  displayName: 'Issue',
  primaryGrouping: 'Category',
  secondaryGrouping: 'SubCategory',
}

export const exampleStarOptions = []

// [
//   new StarOptions(),
//   new StarOptions('IssueType', 'blue', 'Top Issue', 'Try this out', true),
//   new StarOptions(),
// ]

export const exampleData: DSVRowArray = Object.assign(
  [
    {
      Category: 'Positions',
      SubCategory: 'Bargaining',
      Issue: 'Respect',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Positions',
      SubCategory: 'Bargaining',
      Issue: 'Winning',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Positions',
      SubCategory: 'Organizing',
      Issue: 'Respect',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Positions',
      SubCategory: 'Organizing',
      Issue: 'Power',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Positions',
      SubCategory: 'Unit Council',
      Issue: 'Humility',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Positions',
      SubCategory: 'Unit Council',
      Issue: 'Fearlessness',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Positions',
      SubCategory: 'Transparency',
      Issue: 'Power',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Leadership',
      Issue: 'JS+Web CoP',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Leadership',
      Issue: 'Women in tech',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Leadership',
      Issue: 'Sponsorship',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Skills',
      Issue: 'Data',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Skills',
      Issue: 'Organizing',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Traits',
      Issue: 'Empathy',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: 'Qualifications',
      SubCategory: 'Traits',
      Issue: 'Kindness',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
  ],
  {
    columns: ['Issue', 'Category', 'TopIssue', 'BackgroundColor', 'IssueType'],
  }
)
