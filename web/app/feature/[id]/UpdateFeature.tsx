'use client'

import { useRouter } from 'next/navigation'
import { Feature } from '@/generated-api/models/Feature'
import { FeaturesApi } from '@/generated-api/apis/FeaturesApi'

type UpdateFeatureProps = {
  feature: Feature
}

export default function UpdateFeature({ feature }: UpdateFeatureProps) {
  const { featureID, featureName, companyID } = feature || {}

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
    console.log('body: ', body)
    const response = await featuresClient.featuresPut({ feature: body })
    console.log('Feature updated:', response)
    router.refresh()
    return response
  }

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={putFeature}>
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
