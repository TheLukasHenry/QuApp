import { useQuery } from '@apollo/client'
import React from 'react'
import { FEATURES } from '../features/features/features.graphql'
import { useAddFeature, useRemoveFeature, useUpdateFeature } from '../features/features/features.hooks'

export type Feature = {
  id: string
  name: string
  description: string
}

export type FeatureInput = Partial<Feature>

type FeatureData = {
  features: Feature[]
}

export const useFeatures = () => {
  const { data, loading, error } = useQuery<FeatureData>(FEATURES)

  return {
    data,
    loading,
    error,
  }
}

const GraphqlExample = () => {
  const { loading, error, data } = useQuery<FeatureData>(FEATURES)
  const { addFeature, loading: addFeatureLoading, error: addFeatureError } = useAddFeature()
  const { updateFeature, loading: updateFeatureLoading, error: updateFeatureError } = useUpdateFeature()
  const { removeFeature, loading: deleteFeatureLoading, error: deleteFeatureError } = useRemoveFeature()

  const [feature, setFeature] = React.useReducer(
    (state: FeatureInput, update: FeatureInput) => ({ ...state, ...update }),
    {},
  )

  const saveFeature = () => {
    if (feature.id) {
      updateFeature({
        variables: {
          id: feature.id,
          feature,
        },
      })
    } else {
      addFeature({
        variables: {
          feature,
        },
      })
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div style={{ backgroundColor: 'white', color: 'black', padding: 10 }}>
      {data?.features.map(({ id, name, description }: Feature) => (
        <div key={id} style={{ border: '1px solid #ccc' }}>
          <h2>{name}</h2>
          <p>{description}</p>
          <button
            onClick={() => {
              console.log('id', id, typeof id)
              removeFeature({ variables: { id: `${id}` } })
            }}
          >
            delete feature
          </button>
        </div>
      ))}
      <div>
        <h1>new feature</h1>
        Name: <input value={feature?.name} onChange={(e) => setFeature({ name: e.currentTarget.value })} />
        <br />
        Description:{' '}
        <input value={feature?.description} onChange={(e) => setFeature({ description: e.currentTarget.value })} />
        <br />
        <button onClick={() => setFeature({})}>reset</button>
        <button onClick={() => saveFeature()}>new feature</button>
      </div>
    </div>
  )
}

export default GraphqlExample
