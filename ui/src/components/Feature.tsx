import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useFeatures } from '../features/features/useFeatures'
import TestCaseCard from './TestCaseCard'

export const Feature: React.FC = () => {
  const { id } = useParams()
  const { feature, featureLoading, featureError } = useFeatures(id)

  const name = feature?.name
  const description = feature?.description
  const testCases = feature?.testCases

  return (
    <div className="container-fluid mt-0 px-5">
      <h1 className="text-center pt-5">Feature: {name}</h1>
      <h5>Description: {description}</h5>
      <Button variant='primary' className="p-3 my-4 shadow">
        <Link className='text-light text-decoration-none' to={`/features/${id}/addTestCase`}>
          Add Test Case
        </Link>{' '}
      </Button>
      <h1 className="text-center my-4">Test Cases</h1>
      <div className='row'>
        {testCases?.map((testCase) => (
          <TestCaseCard key={testCase.id} testCase={testCase} featureId={id} />
        ))}
      </div>
      <p className="text-danger">{featureLoading ? 'Loading' : ''}</p>
       <p className="text-danger">{featureError ? 'Error' : ''}</p>
    </div>
  )
}

export default Feature
