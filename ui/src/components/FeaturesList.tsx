import React from 'react'
import { Button } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'
import { Error } from './Error'
import FeatureCard from './FeatureCard'
import { Loading } from './Loading'

export const FeaturesList: React.FC = () => {
  const { features, featureError, featureLoading, modalToggle } = useFeatures()

  return (
    <div className='container mt-5'>
      <h1 className='text-center m-3 mb-5 h1'>
        Features
        <Button
          onClick={() => {
            modalToggle()
          }}
          className='px-3 mx-2 h-3 shadow'
        >
          +
        </Button>
      </h1>

      <div className={'row'}>
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
      {featureError && <Error>{featureError}</Error>}
      {featureLoading && <Loading />}
    </div>
  )
}

export default FeaturesList
