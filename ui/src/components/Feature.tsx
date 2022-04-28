import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useFeatures } from '../features/features/useFeatures'


export const Feature: React.FC = () => {

  const { id } = useParams()
  const { feature, featureLoading,
    featureError, removeTestCase
  } = useFeatures(id)




  const name = feature?.name
  const description = feature?.description
  const testCases = feature?.testCases


  if (featureLoading) return <p>Loading...</p>
  if (featureError) return <p>Error :(</p>

  return (
    <>
   
      <h1>{name}</h1>
      <h3>{description}</h3>

      
      <Button variant='primary'>
            <Link 
            className='text-light text-decoration-none' 
            to={`/features/${id}/addTestCase`}
            >
              Add Test Case
            </Link>{' '}
          </Button>
      <h1>Test Cases:</h1>
      <p>
        {testCases?.map((testCase) => (
          <div key={testCase.id} className="m-4">
            
            <h4>{testCase.name} id: {testCase.id}</h4>
            <p>{testCase.description}</p>
            <p>{testCase.duration}</p>
            <p>{testCase.expectedResult}</p>
            <p>{testCase.operatingSystems}</p>
            <p>{testCase.prerequisites}</p>
            <Button
            onClick={() => {
              console.log('testCaseId: ', testCase.id)
              removeTestCase({ variables: { testCaseId: `${testCase.id}` } })
            }}
            >Delete</Button>
            <Button variant='primary'>
            <Link 
            className='text-light text-decoration-none' 
            to={`/features/${id}/addTestCase/${testCase?.id}`}
            >
              Edit
            </Link>{' '}
          </Button>
          </div>
            ))}
      </p>

      
    </>
  )
}

export default Feature

