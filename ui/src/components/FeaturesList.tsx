import React, { useState } from 'react'
import Feature from './Feature'
import AddFeatureModal  from './AddFeatureModal'
import { Button } from 'react-bootstrap'
import { FeatureType } from './Types'
import { useFeatures } from '../features/features/useFeatures'

export type Feature = {
  id: string
  name: string
  description: string
}

export type FeatureInput = Partial<Feature>

type FeatureData = {
  features: Feature[]
}

export const FeaturesList: React.FC = () => {


  const [show, setShow] = useState(false)

  const modalToggle = () => setShow(!show)

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
    <div className='container mt-5'>
      <h1 className='text-center m-5'>Features</h1>
      <Button onClick={() => {
        setShow(true)
      }}
      
      >Add Feature</Button>


      <div className={'row'}>
        {features.map((feature) => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </div>

          <AddFeatureModal 
            modalToggle={modalToggle}
            show={show}

          />
    </div>
  )
}

const defaultFeatures = [
  {
    id: 1,
    name: 'bob',
    testCases: [],
  },
  {
    id: 2,
    name: 'Lukas Test Feature',
    testCases: [],
  },
  {
    id: 3,
    name: 'Lukas Test Feature2',
    testCases: [
      {
        id: 2,
        name: 'new test case',
        description: '',
        duration: 0,
        expectedResult: '',
        operatingSystems: '',
        prerequisites: '',
        testSteps: [
          {
            id: 4,
            name: 'second test step',
          },
        ],
      },
    ],
  },
]

const newFeature: FeatureType = {
  id: 5,
  name: '',
  testCases: [
    {
      id: 2,
      name: 'new test case',
      description: '',
      duration: 0,
      expectedResult: '',
      operatingSystems: '',
      prerequisites: '',
      testSteps: [
        {
          id: 4,
          name: 'second test step',
        },
      ],
    },
  ],
}

export default FeaturesList
