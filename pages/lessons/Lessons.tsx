import * as React from 'react'
import { DataForPowerPages } from '../../components/shared/components/Header'
import { latoFont } from '../../components/shared/tokens/fonts'
import Layout from '../../components/shared/components/Layout'

const Lessons = () => {
  return (
    <Layout currentPage={DataForPowerPages.LESSONS}>
      <div
        style={{ fontFamily: latoFont, maxWidth: '1040px', padding: '40px' }}
      >
        <h1>Lessons on leveraging data for your union</h1>
        <p>Coming soon! A few teasers in the meantime</p>
        <ul>
          <li>
            Use a bubble chart to...
            <ul>
              <li>Visually map your leadership identification process</li>
              <li>Track progress in your underground campaign</li>
              <li>
                Predict your success as you transition from verbal support to
                signing cards
              </li>
              <li>
                Inspire your co-workers to take public actions once the boss
                knows you&apos;re unionizing!{' '}
              </li>
              <li>Ensure broad participation in bargaining surveys</li>
              <li>
                Know where to look when your petitions are only getting &lt;15%
                of the unit
              </li>
              <li>
                Keep good records on unit engagement throughout a contract
                campaign
              </li>
            </ul>
          </li>
          <li>
            Get the most out of Google Sheets for your organizing
            <ul>
              <li>
                Arrange your sheet to encourage engagement and good
                note-keeping. Keep it simple but intentional!{' '}
              </li>
              <li>Use dashboards to keep organizers motivated</li>
              <li>
                Filter views can do everything you hoped they would do. (Just be
                careful)
              </li>
              <li>
                Use columns to keep organizers on top of the most pressing work
                to be done
              </li>
              <li>
                Use your spreadsheet to encourage best practices you learned in
                Stewards Training!
              </li>
              <li>
                Keep your sheets performant for your friends who like to use
                their phones
              </li>
              <li>
                Make your assessments meaningful and specific so the chart can
                give texture beyond a statistic{' '}
              </li>
            </ul>
          </li>
          <li>
            Prepping your data for the Bubble Chart
            <ul>
              <li>Get a full employee list with all of your basics</li>
              <li>
                Keep your data up-to-date, but it&apos;s okay to work with what
                you have
              </li>

              <li>
                Getting to a simple true/false flag isn&apos;t always simple,
                but often helpful!
              </li>
              <li>Use bins to make data ranges easier to work with</li>
            </ul>
          </li>
          <li>
            Tips and tricks for using this tool
            <ul>
              <li>
                Color is like a good moisturizer or a pigmented eyeshadow. A
                little bit goes a long way.
              </li>
              <li>
                Think outside of the box when grouping employees. You don&apos;t
                just have to organize by the company&apos;s org chart.
              </li>
              <li>
                Combine columns to provide more granularity and specificity in
                your groupings
              </li>
              <li>Always include the point person. Always.</li>
              <li>
                Is there a feature missing? You can probably use google sheets
                to get your data the way you need it before importing it here!
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default Lessons
