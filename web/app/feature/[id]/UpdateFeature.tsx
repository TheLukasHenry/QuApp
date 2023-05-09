'use client'

import { useRouter } from 'next/navigation'
import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'
import React from 'react'

type UpdateFeatureProps = {
  feature: Feature
}

export default function UpdateFeature({ feature }: UpdateFeatureProps) {
  const { featureID, featureName, companyID } = feature || {}
  const [currentFeatureName, setCurrentFeatureName] =
    React.useState(featureName)
  const featuresClient = new FeaturesApi()

  const router = useRouter()

  async function putFeature(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const body: Feature = {
      featureName: formData.get('featureName') as string,
      companyID: Number(formData.get('companyID')),
      featureID,
    }
    const response = await featuresClient.featuresPut({ feature: body })
    setCurrentFeatureName(body.featureName)
    console.log('Feature updated:', response)
    router.refresh()
  }

  return (
    <div>
      Single Feature page
      <form onSubmit={putFeature}>
        <div>feature name: {currentFeatureName}</div>
        <label htmlFor="featureName">Name</label>
        <input
          type="text"
          name="featureName"
          defaultValue={featureName ?? ''}
        />
        <label htmlFor="companyID">companyID</label>
        <input type="text" name="companyID" defaultValue={companyID ?? ''} />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
