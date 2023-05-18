// rewrite this data so I can just paste it as JSON format
// const data = {
//   "fields": {
//     "project":
//     {
//       "key": "QUAAP"
//     },
//     "summary": "Test case summary",
//     "description": "Test case description",
//     "issuetype": {
//       "name": "Epic"
//     }
//   }
// }
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const data = {
  fields: {
    project: {
      key: 'QUAAP',
    },
    summary: 'Test case summary',
    description: 'Test case description',
    issuetype: {
      name: 'Epic',
    },
  },
}

// export async function POST(request: NextRequest) {
//   // const session = await getServerSession(authOptions)
//   // ATATT3xFfGF0onPlwcpUxA5B_y4EgLtMR_luyb3Y2mpzE-RGeiakwPunByhSFfTxyb_taz_kYXVpoShdHJlChDDkgFHA-BkrL_vhoduVEDYRnCh03eq-WjK-auHP-gPEySRkDgaMPgR7ZwpmKiwj4lnasWasIoKfqCvyz3pt9kOQmDBhx4aJqYU=FC760976
//   console.log('Jira called')
//   const url = request.nextUrl

//   const req = new NextRequest(
//     'https://quaapp.atlassian.net/rest/api/2/issue/',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Basic ${process.env.JIRA_API_KEY}`,
//         // Add your credentials here
//       },
//       body: JSON.stringify({
//         data,
//       }),
//     }
//   )
//   console.error()
//   // console.trace('tracing req: ', req)
//   // console.log('reqiiii: ', req)

//   return NextResponse.json({ req })
// }

// // POST(req)
// const handler = { POST }
// export default handler

export async function POST(request: NextRequest) {
  console.log('Jira called')

  const req = new NextRequest(
    'https://quaapp.atlassian.net/rest/api/2/issue/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.JIRA_API_KEY}`,
      },
      body: JSON.stringify(data),
    }
  )

  // Send the request to Jira
  const res = await fetch(req)

  // Get the response data
  const resData = await res.json()

  // Return the response data
  return NextResponse.json(resData)
}

export async function GET(request: NextRequest) {
  console.log('Jira called')

  const req = new NextRequest(
    'https://quaapp.atlassian.net/rest/api/2/issue/QUAAP-1',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.JIRA_API_KEY}`,
      },
    }
  )

  // Send the request to Jira
  const res = await fetch(req)

  // Get the response data
  const resData = await res.json()

  // Return the response data
  return NextResponse.json(resData)
}

const handler = { GET, POST }
export default handler
