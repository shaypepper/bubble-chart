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

enum BubbleCategory {
  PLATFORM = 'Platform',
  QUALIFICATIONS = 'Qualifications',
}

enum BubbleSubCategory {
  UNIT_COUNCIL = 'Unit Council',
  BARGAINING = 'Bargaining',
  ORGANIZING = 'Organizing',
  LEADERSHIP = 'Leadership positions',
}

export const exampleData: DSVRowArray = Object.assign(
  [
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.BARGAINING,
      Issue: 'Respect',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },

    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.ORGANIZING,
      Issue: 'Respect',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: `The collective actions we take come out of the relationships we are building with each other. If someone does not feel like they are contributing to the greater effort, that they are being ignored or that they are being kept from contributing, why would they join a walk out or sign a petition? That comes out of strong relationships and respect between stewards and our co-workers.`,
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.BARGAINING,
      Issue: 'Power',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: `We will only win big things when we are backing each other, and we are not backing down. The newsroom has been rewarded with marathon bargaining sessions and a saved pension in response to their walk out. Wirecutter got the raises they asked for after their walk out. Contracts are won through power shown by action.`,
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.UNIT_COUNCIL,
      Issue: 'Humility',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.UNIT_COUNCIL,
      Issue: 'Fearlessness',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.BARGAINING,
      Issue: 'Transparency',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'JS+Web CoP',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'Member data chair',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'Sponsorship',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Skills',
      Issue: 'Data',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Skills',
      Issue: 'Organizing',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Traits',
      Issue: 'Empathy',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Traits',
      Issue: 'Quirk',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: '  ',
    },
  ],
  {
    columns: ['Issue', 'Category', 'TopIssue', 'BackgroundColor', 'IssueType'],
  }
)
