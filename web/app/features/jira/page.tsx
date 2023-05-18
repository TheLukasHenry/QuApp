import JiraApi from 'jira-client'

const jira = new JiraApi({
  protocol: 'https',
  host: 'quaapp.atlassian.net',
  username: 'Lukas Herajt',
  password: 'xzx1cfp*bkj1FNK3xgc',
  apiVersion: '3',
})

export default async function Page() {
  const issue = await jira.findIssue('QUAAP-1')
  const issue2 = await jira.getIssue('QUAAP-1')
  const issue3 = await jira.listProjects()
  const issue4 = await logIssueName()
  console.log(issue)
  console.log(issue2)
  console.log(issue3)
  console.log(issue4)

  return (
    <div>
      <p>Jira page</p>
    </div>
  )
}

async function logIssueName() {
  try {
    const issue = await jira.findIssue('QUAAP-1')
    console.log(`Status: ${issue.fields.status.name}`)
  } catch (err) {
    console.error(err)
  }
}
