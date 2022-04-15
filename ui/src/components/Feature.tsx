import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useFeatures } from '../features/features/useFeatures'


export const Feature: React.FC = () => {

  const { id } = useParams()

  const { feature } = useFeatures(id)

  const name = feature?.name
  const description = feature?.description
  const testCases = feature?.testCases

  return (
    <>
      <div>
        {id}
      </div>
      <h1>{name}</h1>
      <h3>{description}</h3>
      <Button>
        Add test case
      </Button>
      <p>
        {testCases?.map((testCase) => (
          <div key={testCase.id}>
            <h4>{testCase.name}</h4>
            <p>{testCase.description}</p>
            <p>{testCase.duration}</p>
            <p>{testCase.expectedResult}</p>
            <p>{testCase.operatingSystems}</p>
            <p>{testCase.prerequisites}</p>
          </div>
            ))}
      </p>

      
    </>
  )
}

export default Feature

