// 'use client'
import { Feature } from '@/generated-api'
import Link from 'next/link'

interface FeatureComponentProps {
  feature: Feature
}

export default function FeatureComponent({ feature }: FeatureComponentProps) {
  const { featureID, featureName } = feature || {}
  return (
    <Link href={`/feature/${featureID || ''}`}>
      <div>
        <div>{featureName}</div>
      </div>
    </Link>
  )
}
