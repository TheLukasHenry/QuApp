import React, { useState } from 'react'
import Feature from './Feature'
import AddFeatureModal  from './AddFeatureModal'
import { Button } from 'react-bootstrap'
import { FeatureType } from './Types'

export const FeaturesList: React.FC = () => {
  const [featuresArray, setFeaturesArray] = useState(defaultFeatures)

  const [show, setShow] = useState(false)

  const modalToggle = () => setShow(!show)



  return (
    <div className='container mt-5'>
      <h1 className='text-center m-5'>Features</h1>
      <Button onClick={() => {
        setShow(true)
      }}
      
      >Add Feature</Button>


      <div className={'row'}>
        {featuresArray.map((feature) => (
          <Feature key={feature.id} {...feature} />
        ))}
      </div>

          <AddFeatureModal 
            modalToggle={modalToggle}
            show={show}
            setFeaturesArray={setFeaturesArray}
            featuresArray={featuresArray}
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
