import JiraApi from 'jira-client'
import { NextRequest, NextResponse } from 'next/server'

const jira = new JiraApi({
  protocol: 'https',
  host: 'quaapp.atlassian.net',
  username: 'lherajt@gmail.com',
  password: process.env.JIRA_API_KEY,
  apiVersion: '3',
})

export async function POST(request: NextRequest) {
  console.log('Jira called')
  const url = request.nextUrl
  const newIssue = await jira.addNewIssue({
    fields: {
      project: {
        key: 'QUAAP',
      },
      summary: 'Neeeext',
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'Test case description',
                type: 'text',
              },
            ],
          },
        ],
      },
      issuetype: {
        name: 'Epic',
      },
    },
  })

  // Return the new issue data
  return NextResponse.json(newIssue)
  const req = new NextRequest(
    'https://quaapp.atlassian.net/rest/api/2/issue/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.JIRA_ENCODED_TOKEN}`,
        // Add your credentials here
      },
      body: JSON.stringify({
        request,
      }),
    }
  )

  return NextResponse.json({ req })
}

export async function GET(request: NextRequest) {
  console.log('Jira called')

  // Get the issue from Jira
  const issue = await jira.findIssue('QUAAP-1')

  // Return the issue data
  return NextResponse.json(issue)
}

const handler = { GET, POST }
export default handler

// export default async function GET() {
//   const issue = await jira.findIssue('QUAAP-1')
//   const issue2 = await jira.getIssue('QUAAP-1')
//   const issue3 = await jira.listProjects()
//   const issue4 = await logIssueName()
//   console.log(issue)
//   console.log(issue2)
//   console.log(issue3)
//   console.log(issue4)
// }

// async function logIssueName() {
//   try {
//     const issue = await jira.findIssue('QUAAP-1')
//     console.log(`Status: ${issue.fields.status.name}`)
//   } catch (err) {
//     console.error(err)
//   }
// }
