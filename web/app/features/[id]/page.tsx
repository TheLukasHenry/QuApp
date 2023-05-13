import { FeaturesApi } from '../../../generated-api/apis/FeaturesApi'
import UpdateFeature from './UpdateFeature'
import UpdateFeatureActions from './UpdateFeatureActions'

interface Props {
  params: { id: string }
}

const featuresClient = new FeaturesApi()

async function getFeatureById(id: string) {
  const response = await featuresClient.featuresIdGet(
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
  console.log('response: ', response)
  return response
}

export default async function Page({ params }: Props) {
  console.log('New get params.id: ', params.id)

  const feature = await getFeatureById(params.id)

  console.log('feature: ', feature)
  return (
    <div>
      <UpdateFeature feature={feature} />
      {/* <UpdateFeatureActions feature={feature} putFeature={putFeature} /> */}
    </div>
  )
}
