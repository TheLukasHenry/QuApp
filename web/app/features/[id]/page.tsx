import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'
import UpdateFeature from './UpdateFeature'
// import UpdateFeatureActions from './UpdateFeatureActions'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
// import CreateTestCase from '@/components-client/CreateTestCase'
import TestCasesList from '@/components-server/TestCasesList'

interface Props {
  params: { id: string }
}

const testCasesClient = new TestCasesApi()
const featuresClient = new FeaturesApi()

async function getTestCasesByFeatureId(id: string) {
  const response = await testCasesClient.testCasesFeatureFeatureIdGet(
    {
      featureId: +id,
    },
    // ,
    { cache: 'no-store' }
  )
  return response
}

async function getFeatureById(id: string) {
  const response = await featuresClient.featuresIdGet(
    {
      id: +id,
    },
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
  // console.log('New get params.id: ', params.id)

  const feature = await getFeatureById(params.id)
  const testCases = await getTestCasesByFeatureId(params.id)
  // console.log('testCases: ', testCases)

  // console.log('feature: ', feature)
  return (
    <div>
      <p>features id page</p>
      <UpdateFeature feature={feature} />
      <TestCasesList testCases={testCases} />
      {/* <UpdateFeatureActions feature={feature} putFeature={putFeature} /> */}
    </div>
  )
}
