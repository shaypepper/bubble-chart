import { DSVRowArray } from 'd3'
import { colors } from '../shared/tokens/colors'
import { StarOptions } from './data/types'

export const exampleColumnMap = {
  uniqueIdentifier: 'Issue',
  displayName: 'Issue',
  primaryGrouping: 'Category',
  secondaryGrouping: 'SubCategory',
}

export const exampleStarOptions = [
  new StarOptions(
    'IssueType',
    colors.yellow.default,
    `Don't miss`,
    'Try this out',
    true
  ),
  new StarOptions(
    'IssueType',
    colors.yellow.default,
    `Don't miss`,
    'Try this out',
    true
  ),
  new StarOptions(
    'IssueType',
    colors.yellow.default,
    `Don't miss`,
    'Try this out',
    true
  ),
]

enum BubbleCategory {
  PLATFORM = 'Platform',
  QUALIFICATIONS = 'Qualifications',
}

enum BubbleSubCategory {
  UNIT_COUNCIL = 'Unit Chair Role',
  BARGAINING = 'Bargaining',
  ORGANIZING = 'Organizing',
  LEADERSHIP = 'Leadership positions',
}

export const exampleData: DSVRowArray = Object.assign(
  [
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
      Text: `I have respect for the weight of the power this position holds. I do not take it lightly that I will have blind spots. This requires the humility to accept criticism and correct course when needed. It also meaning bringing others into decisions at every opportunity.`,
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.UNIT_COUNCIL,
      Issue: 'Fearlessness',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: `We know who we are. We know what we've built together as a union. We know what we are capable of. The unit chair should walk in that confidence when interacting with management, or on behalf of the unit.`,
    },
    {
      Category: BubbleCategory.PLATFORM,
      SubCategory: BubbleSubCategory.BARGAINING,
      Issue: 'Transparency',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: `The process of writing our contract should be as inclusive and open as possible. I stand with the Bargaining Committee's choices regarding open bargaining and the rare Article Committee structure we are using.`,
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'Member data chair',
      IssueType: `Don't miss`,
      BackgroundColor: 'Black',
      Text: 'My proudest work has been as member data chair. Before and after the election, I have been a proponent for using data to make our union stronger. We can only build power if we know what we each want from our contract, and know how far we are willing to go to get it. I have also established data privacy norms for the union.',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: BubbleSubCategory.LEADERSHIP,
      Issue: 'Within NYT',
      IssueType: 'Top issue',
      BackgroundColor: 'Black',
      Text: 'I was inaugural lead organizer for the JS+Web CoP. I also was part of WiT leadership from 2020-2021. Lastly, I was chosen for the sponsorship program, which allowed me to meet (and challenge!) members of leadership throughout 2021. i am not confident to be direct and firm with management, while maintaining productive relationships.',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Skills',
      Issue: 'Spreadsheets',
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
      IssueType: `Don't miss`,
      BackgroundColor: 'Black',
      Text: '',
    },
    {
      Category: BubbleCategory.QUALIFICATIONS,
      SubCategory: 'Traits',
      Issue: 'Conviction',
      IssueType: `Don't miss`,
      BackgroundColor: 'Black',
      Text: '',
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
