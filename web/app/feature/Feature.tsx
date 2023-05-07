'use client'
import { Feature } from '@/generated-api'
import Link from 'next/link'
import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'
import { useRouter } from 'next/navigation'

const featuresClient = new FeaturesApi()

interface FeatureComponentProps {
  feature: Feature
}

async function deleteFeatureById(featureID: number) {
  console.log('Feature deleted:', featureID)
  return await featuresClient.featuresFeatureIdDelete({ featureId: featureID })
}

export default function FeatureComponent({ feature }: FeatureComponentProps) {
  const { featureID, featureName } = feature || {}
  const router = useRouter()
  return (
    <>
      <Link href={`/feature/${featureID || ''}`}>
        <div>
          <div>{featureName}</div>
        </div>
      </Link>
      <button
        onClick={async () => {
          await deleteFeatureById(featureID!)
          router.refresh()
        }}
      >
        Delete
      </button>
    </>
  )
}
