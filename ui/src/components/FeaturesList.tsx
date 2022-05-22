import React from 'react'
import FeatureCard from './FeatureCard'
import AddFeatureModal from './AddFeatureModal'
import { Button } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'

export const FeaturesList: React.FC = () => {
  const { loading, error, features, modalToggle, show } = useFeatures()

  return (
    <div className='container mt-5'>
      <h1 className='text-center m-5'>Features</h1>
      <Button
        onClick={() => {
          modalToggle()
        }}
        className='p-3 my-4 shadow'
      >
        Add Feature
      </Button>

      <div className={'row'}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
          />
        ))}
      </div>

      { show ? <AddFeatureModal modalToggle={modalToggle} show={show}/> : null }
    </div>
  )
}

export default FeaturesList
