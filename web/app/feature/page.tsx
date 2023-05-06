// 'use-client'

import Link from 'next/link'
// import CreateTodo from './CreateTodo'
import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'
import { Feature } from '../../generated-api/models/Feature'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import CreateFeature from './CreateFeature'
import FeatureComponent from './Feature'

const featuresClient = new FeaturesApi()
// Use the API client to make a request
async function getFeatures() {
  const response = await featuresClient.featuresGet()
  console.log(response)
  return response
}

async function getBlob() {
  const res = await fetch(
    'http://localhost:5000/features',

    { cache: 'no-store' }
  )
  const data = await res.json()
  console.log('data: ', data)
  return data as any[]
}

async function getFeaturesByCompanyId(companyId: number) {
  const response = await featuresClient.featuresCompanyCompanyIdGet({
    companyId,
  })
  console.log(response)
  return response
}

// Delete feature by featureID
async function deleteFeatureById(featureID: number) {
  await featuresClient.featuresFeatureIdDelete({ featureId: featureID })
  console.log('Feature deleted:', featureID)
}

// Post a feature

// Put a feature
async function putFeature(feature: Feature) {
  const response = await featuresClient.featuresPut({ feature })
  console.log('Feature updated:', response)
  return response
}

export default async function Features() {
  const features = await getBlob()
  const featuresByCompanyId = await getFeaturesByCompanyId(2)
  console.log('featuresByCompanyId: ', featuresByCompanyId)
  // const router = useRouter()

  // const [featureName, setFeatureName] = useState('')
  return (
    <div>
      Features
      {features.map((feature) => {
        return <FeatureComponent key={feature.featureID} feature={feature} />
      })}
      <h3>Create a new Feature</h3>
      <CreateFeature count={features.length} />
    </div>
  )
}
