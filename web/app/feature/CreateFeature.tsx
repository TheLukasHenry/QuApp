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
    try {
      const response = await featuresClient.featuresPost({
        createFeatureInput: { featureName, companyID: companyID ?? 0 },
      })
      console.log('response: ', response)
      setFeatureName(new Date().toISOString())
      setCompanyID(1)
      router.refresh()
    } catch (e) {
      console.log('e: ', e)
    }
    console.log('count: ', count)
    // await featuresClient.featuresPostRaw({
    //   createFeatureInput: { featureName, companyID: companyID ?? 0 },
    // })

    // return response
  }

  return (
    <form

    // onSubmit={createFeature}
    >
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

// async function createFeature(feature: Feature) {
//   const response = await featuresClient.featuresPost({ feature })
//   const [featureName, setFeatureName] = useState('')
//   console.log('Feature posted:', response)
//   setFeatureName('')

//   router.refresh()
//   return response
// }

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function CreateNote() {
//   const [title, setTitle] = useState('')

//   const router = useRouter()

// const create = async () => {
// await fetch('https://jsonplaceholder.typicode.com/todos', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     title,
//     completed: false,
//   }),
// })
//   setTitle('')

//   router.refresh()
// }

//   return (
//     <form onSubmit={create}>
//       <h3>Create a new Note</h3>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button type="submit">Create note</button>
//     </form>
//   )
// }
