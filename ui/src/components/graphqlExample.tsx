import { useQuery } from '@apollo/client'
import React from 'react'
import { FEATURES } from '../features/features/features.graphql'
import { useFeatures } from '../features/features/useFeatures'
import { FeatureType } from './Types'


export type FeatureInput = Partial<FeatureType>

type FeatureData = {
  features: FeatureType[]
}



const GraphqlExample = () => {

  const {
    loading,
        error,
        features,
        addFeature,
        updateFeature,
        removeFeature,
  } = useFeatures()

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
      {features.map(({ id, name, description }: FeatureType) => (
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
