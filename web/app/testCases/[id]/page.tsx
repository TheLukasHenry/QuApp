import { UpdateTestCaseInput } from '@/generated-api/models/UpdateTestCaseInput'
import { TestCasesApi } from '../../../generated-api/apis/TestCasesApi'
import UpdateTestCase from './UpdateTestCase'
import { TestCase } from '@/generated-api'
// import UpdateTestCaseActions from './UpdateTestCaseActions'

interface Props {
  params: { id: number }
}

const testCasesClient = new TestCasesApi()

async function getTestCaseById(id: number) {
  console.log('id: ', id)
  const response = await testCasesClient.testCasesIdGet(
    {
      id: +id,
    },
    // ,

    // {
    //   next: {
    //     revalidate: 0,
    //   },
    // }
    { cache: 'no-store' }
  )
  return response
}

export default async function Page({ params }: Props) {
  console.log('New get params.id: ', params.id)

  const testCase: TestCase = await getTestCaseById(params.id)
  // const input: UpdateTestCaseInput = {...testCase}

  console.log('testCase: ', testCase)
  return (
    <div className="pt-32">
      id page here
      <UpdateTestCase testCase={testCase} />
      {/* <UpdateTestCaseActions testCase={testCase} putTestCase={putTestCase} /> */}
    </div>
  )
}
