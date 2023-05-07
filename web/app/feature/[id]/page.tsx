// 'use client'

import { FeaturesApi } from '../../../generated-api/apis/FeaturesApi'

const featuresClient = new FeaturesApi()

async function getFeature(id: number) {
  const res = await fetch(
    `http://localhost:5000/features/${id || ''}`,
    {
      next: { revalidate: 10 },
    }
    // { cache: 'no-store' }
  )
  const data = await res.json()
  console.log('data: ', data)
  return data as any
}

function getFeatureById(featureId: any) {
  console.log('New get featureId: ', featureId)
  const response = featuresClient.featuresFeatureIdGet({
    featureId,
  })
  console.log(response)

  return response
}

export default async function Page({ params }: any) {
  console.log('params.id: ', params.id)
  const feature = await getFeature(params.id)
  const featureById = await getFeatureById(params.id)
  console.log('feature: ', feature)
  console.log('featureById: ', featureById)
  return (
    <div>
      Single Feature page
      <div>feature name: {feature.featureName}</div>
      <div>featureById name: {featureById.featureName}</div>
    </div>
  )
}
