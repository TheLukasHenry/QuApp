'use client'
import Link from 'next/link'

export default function Feature({ feature }: any) {
  const { featureID, featureName } = feature || {}
  return (
    <Link href={`/feature/${featureID || ''}`}>
      <div>
        <div>{featureName}</div>
      </div>
    </Link>
  )
}
