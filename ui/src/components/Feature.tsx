import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useFeatures } from '../features/features/useFeatures'
import TestCaseCard from './TestCaseCard'
import { Error } from './Error'
import { Loading } from './Loading'

export const Feature: React.FC = () => {
  const { id } = useParams()
  const { feature, featureLoading, featureError, modalToggle } = useFeatures(id)

  const name = feature?.name
  const description = feature?.description
  const testCases = feature?.testCases

  return (
    <div className='container-fluid mt-0 px-5'>
      <h1 className='text-center pt-5'>Feature: {name}</h1>
      <h5>Description: {description}</h5>
      <Button
        onClick={() => {
          modalToggle(feature?.id)
        }}
      >
        Edit Feature
      </Button>
      <h1 className='text-center my-4'>Test Cases</h1>

      <Button variant='primary' className='p-3 my-4 shadow'>
        <Link className='text-light text-decoration-none' to={`/features/${id}/addTestCase`}>
          Add Test Case
        </Link>{' '}
      </Button>

      <div className='row'>
        {testCases?.map((testCase) => (
          <TestCaseCard key={testCase.id} testCase={testCase} featureId={id} />
        ))}
      </div>
      {featureError && <Error >
          {featureError}
          </Error>}
      {featureLoading && <Loading />}
    </div>
  )
}

export default Feature
