import { FeaturesApi } from '../../../generated-api/apis/FeaturesApi'

const featuresClient = new FeaturesApi()

async function getFeatureById(featureId: any) {
  console.log('New get featureId: ', featureId)
  const response = await featuresClient.featuresFeatureIdGet({
    featureId,
    ...{ cache: 'no-store' },
  })
  console.log(response)

  return response
}

export default async function Page({ params }: any) {
  console.log('params.id: ', params.id)
  const feature = await getFeatureById(params.id)

  console.log('feature: ', feature)
  return (
    <div>
      Single Feature page
      <div>feature name: {feature.featureName}</div>
    </div>
  )
}
