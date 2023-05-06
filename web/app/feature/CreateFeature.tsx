'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Feature } from '@/generated-api/models/Feature'
import { CreateFeatureInput } from '@/generated-api/models/CreateFeatureInput'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'

export default function CreateFeature({ count = 1 }) {
  const [companyID, setCompanyID] = useState<Feature['companyID'] | undefined>(
    1
  )
  const [featureName, setFeatureName] = useState<Feature['featureName']>(
    new Date().toISOString()
  )

  const featuresClient = new FeaturesApi()

  const router = useRouter()

  async function createFeature() {
    const response = await featuresClient.featuresPost({
      createFeatureInput: { featureName, companyID: companyID ?? 0 },
    })

    setFeatureName(new Date().toISOString())
    setCompanyID(1)
    router.refresh()
  }

  return (
    <form>
      <h3>Create a new Feature</h3>
      <p>count: {count}</p>
      <input
        type="text"
        value={featureName}
        onChange={(e) => setFeatureName(e.target.value)}
        placeholder="Feature name"
      />
      <input
        type="number"
        value={companyID !== undefined ? companyID : ''}
        onChange={(e) => setCompanyID(+e.target.value || 1)}
        placeholder="Company id"
      />

      <button type="button" onClick={createFeature}>
        Create Feature
      </button>
    </form>
  )
}
