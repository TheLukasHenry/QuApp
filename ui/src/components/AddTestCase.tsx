import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTestCases } from '../testCases/useTestCases'
import { TestCase } from './Types'
import { Error } from './Error'
import { Loading } from './Loading'

export type TestCaseInput = Partial<TestCase>

export const Feature: React.FC = () => {
  const { id, testCaseId } = useParams()

  const navigate = useNavigate()
  const {
    addTestCase,
    testCases,
    updateTestCases,
    testCasesError,
    testCasesLoading,
  } = useTestCases(id)

  let selectedCase: any = testCaseId ? testCases?.find((tc: any) => tc.id === Number(testCaseId)) : {}
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
    <div className='px-5 container'>
      <h1 className='text-center py-5'>{testCaseId ? 'Update' : 'Add'} test case</h1>
      <Form className='row'>
        <Form.Group className='mb-3 col-lg-6'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Name'
            value={testCase?.name}
            onChange={(e) => setTestCase({ name: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3 col-lg-6'>
          <Form.Label>Duration:</Form.Label>
          <div className='d-flex'>
            <Form.Control
              type='number'
              placeholder='Duration'
              value={Number(testCase?.duration)}
              onChange={(e) => setTestCase({ duration: Number(e.currentTarget.value) })}
              className='w-75'
            />
            <Form.Select className='w-25' aria-label='Default select example'>
              <option>Select time unit</option>
              <option value='sec'>sec</option>
              <option value='min'>min</option>
              <option value='h'>h</option>
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group className='mb-3 col-lg-6'>
          <Form.Label>Expected result:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder='Expected result'
            value={testCase?.expectedResult}
            onChange={(e) => setTestCase({ expectedResult: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3 col-lg-6'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder='Description'
            value={testCase?.description}
            onChange={(e) => setTestCase({ description: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3 col-lg-6'>
          <Form.Label>Operating Systems:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Operating Systems'
            value={testCase?.operatingSystems}
            onChange={(e) => setTestCase({ operatingSystems: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group className='mb-3 col-lg-6'>
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
        {testCasesError && <Error >
          {testCasesError}
          </Error>}
      {testCasesLoading && <Loading />}

      </Form>
    </div>
  )
}

export default Feature
