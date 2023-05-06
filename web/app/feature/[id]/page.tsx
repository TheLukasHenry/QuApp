// 'use client'
async function getFeature(id: string) {
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

export default async function Feature(params: number) {
  console.log('params: ', params)
  const feature = await getFeature('11')
  console.log('feature: ', feature)
  return (
    <div>
      Single Feature page
      <div>feature name: {feature.featureName}</div>
    </div>
  )
}
