// 'use-client'

import Link from 'next/link'
// import CreateTodo from './CreateTodo'
import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'
import { Feature } from '../../generated-api/models/Feature'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import CreateFeature from './CreateFeature'

const featuresClient = new FeaturesApi()
// Use the API client to make a request
async function getFeatures() {
  const response = await featuresClient.featuresGet()
  console.log(response)
  return response
}

async function getFeaturesByCompanyId(companyId: number) {
  const response = await featuresClient.featuresCompanyCompanyIdGet({
    companyId,
  })
  console.log(response)
  return response
}

// Delete feature by featureId
async function deleteFeatureById(featureId: number) {
  await featuresClient.featuresFeatureIdDelete({ featureId })
  console.log('Feature deleted:', featureId)
}

// Post a feature

// Put a feature
async function putFeature(feature: Feature) {
  const response = await featuresClient.featuresPut({ feature })
  console.log('Feature updated:', response)
  return response
}

async function getBlob() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10',

    { cache: 'no-store' }
  )
  const data = await res.json()
  return data as any[]
}

export default async function Todos() {
  const todos = await getBlob()
  const features = await getFeatures()
  // const router = useRouter()

  // const [featureName, setFeatureName] = useState('')
  return (
    <div>
      Features
      {features.map((feature) => {
        return <Feature key={feature.featureID} feature={feature} />
      })}
      <h3>Create a new Feature</h3>
      <CreateFeature />
    </div>
  )
}

function Todo({ todo }: any) {
  const { id, title, userId } = todo || {}
  return (
    <Link href={`/todos/${id}`}>
      <div>
        <div>
          {title}, {userId}
        </div>
      </div>
    </Link>
  )
}

function Feature({ feature }: any) {
  const { featureId, featureName } = feature || {}
  return (
    <Link href={`/todos/${featureId}`}>
      <div>
        <div>{featureName}</div>
      </div>
    </Link>
  )
}
