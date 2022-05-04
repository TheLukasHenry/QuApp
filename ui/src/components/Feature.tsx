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

  if (featureLoading) return <p>Loading...</p>
  if (featureError) return <p>Error :(</p>

  return (
    <>
      <h1>Feature: {name}</h1>
      <h3>Description: {description}</h3>
      <Button variant='primary'>
        <Link className='text-light text-decoration-none' to={`/features/${id}/addTestCase`}>
          Add Test Case
        </Link>{' '}
      </Button>
      <h1>Test Cases:</h1>
      <div className='row'>
        {testCases?.map((testCase) => (
          <TestCaseCard key={testCase.id} testCase={testCase} featureId={id} />
        ))}
      </div>
    </>
  )
}

export default Feature
