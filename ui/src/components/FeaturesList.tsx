import React, { useState } from 'react'
import FeatureCard from './FeatureCard'
import AddFeatureModal  from './AddFeatureModal'
import { Button } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'

export const FeaturesList: React.FC = () => {
  const [show, setShow] = useState(false)
  const [selectedFeatureId, setSelectedFeatureId] = useState<number | undefined>(undefined)

  const modalToggle = () => setShow(!show)

  const { loading, error, features } = useFeatures()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {JSON.stringify(error)}</p>

  return (
    <div className='container mt-5'>
      <h1 className='text-center m-5'>Features</h1>
      <Button
        onClick={() => {
          setSelectedFeatureId(undefined)
          setShow(true)
        }}
      >
        Add Feature
      </Button>

      <div className={'row'}>
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} setShow={setShow}/>
        ))}
      </div>

          <AddFeatureModal 
            modalToggle={modalToggle}
            show={show}
          />
    </div>
  )
}

export default FeaturesList
