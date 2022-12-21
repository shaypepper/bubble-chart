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
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.BARGAINING,
      Issue: 'Winning',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: 'Organizing',
      Issue: 'Respect',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: 'Organizing',
      Issue: 'Power',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.UNIT_COUNCIL,
      Issue: 'Humility',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.UNIT_COUNCIL,
      Issue: 'Fearlessness',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.UNIT_COUNCIL,
      Issue: 'Transparency',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'JS+Web CoP',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'Women in tech',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
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
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Skills',
      Issue: 'Organizing',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Traits',
      Issue: 'Empathy',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
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
