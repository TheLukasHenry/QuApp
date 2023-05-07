// 'use-client'

import Link from 'next/link'
// import CreateTodo from './CreateTodo'
import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'
import { Feature } from '../../generated-api/models/Feature'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import CreateFeature from './CreateFeature'
import FeatureComponent from './Feature'
import FeatureList from './FeaturesList'

const featuresClient = new FeaturesApi()
// Use the API client to make a request

async function getBlob() {
  const res = await fetch('http://localhost:5000/features', {
    cache: 'no-store',
    // next: { revalidate: 10 },
  })
  const data = await res.json()
  return data as any[]
}

async function getFeaturesByCompanyId(companyId: number) {
  const response = await featuresClient.featuresCompanyCompanyIdGet({
    companyId,
  })
  console.log(response)
  return response
}

async function getFeatures() {
  const response = await featuresClient.featuresGet({
    ...{ cache: 'no-store' },
  })
  return response
}

export default async function Features() {
  const features = await getFeatures()

  return (
    <div>
      Features
      <FeatureList features={features} />
      <h3>Create a new Feature</h3>
      <CreateFeature count={features.length} />
    </div>
  )
}
