import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { useFeatures } from '../features/features/useFeatures'
import { useTestCases } from '../testCases/useTestCases'
import { TestCase } from './Types'

export type TestCaseInput = Partial<TestCase>

export const Feature: React.FC = () => {
  const { id, testCaseId } = useParams()

  const navigate = useNavigate()
  const {
    addTestCaseLoading,
    addTestCaseError,
    addTestCase,
    testCases,
    updateTestCases,
    updateTestCaseError,
    updateTestCaseLoading,
  } = useTestCases(id)

  let selectedCase: any = testCaseId ? testCases?.find((tc) => tc.id === Number(testCaseId)) : {}
  const { __typename, feature, ...selectedCaseReady } = selectedCase

  const [testCase, setTestCase] = React.useReducer(
    (state: TestCaseInput, update: TestCaseInput) => ({ ...state, ...update }),
    testCaseId ? { ...selectedCaseReady } : { feature: Number(id) },
  )

  const saveTestCase = () => {
    if (testCaseId) {
      updateTestCases({
        variables: {
          testCase,
        },
      })
    } else {
      addTestCase({
        variables: {
          testCase,
        },
      })
    }
  }

  return (
    <>
      <h1>{testCaseId ? 'Update' : 'Add'} test case:</h1>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Name'
            value={testCase?.name}
            onChange={(e) => setTestCase({ name: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Duration'
            value={Number(testCase?.duration)}
            onChange={(e) => setTestCase({ duration: Number(e.currentTarget.value) })}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Expected result:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Expected result'
            value={testCase?.expectedResult}
            onChange={(e) => setTestCase({ expectedResult: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            value={testCase?.description}
            onChange={(e) => setTestCase({ description: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Operating Systems:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Operating Systems'
            value={testCase?.operatingSystems}
            onChange={(e) => setTestCase({ operatingSystems: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Prerequisites:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Prerequisites'
            value={testCase?.prerequisites}
            onChange={(e) => setTestCase({ prerequisites: e.currentTarget.value })}
          />
        </Form.Group>

        <Button
          variant='primary'
          onClick={() => {
            saveTestCase()
            navigate(`/features/${id}`)
          }}
        >
          {testCaseId ? 'Update' : 'Add'}
        </Button>
       <p>{updateTestCaseLoading ? 'Loading' : ''}</p>
       <p>{updateTestCaseError ? 'Error' : ''}</p>
       <p>{addTestCaseLoading ? 'Loading' : ''}</p>
       <p>{addTestCaseError ? 'Error' : ''}</p>
      </Form>
    </>
  )
}

export default Feature
