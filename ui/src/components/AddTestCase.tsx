import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useFeatures } from '../features/features/useFeatures'
import { TestCase } from './Types'

export type TestCaseInput = Partial<TestCase>


export const Feature: React.FC = () => {
  const { id
    , testCaseId
 } = useParams()
  

  const navigate = useNavigate()
  const { addTestCaseLoading, addTestCaseError, addTestCase, testCases, updateTestCases, updateTestCaseError, updateTestCaseLoading } = useFeatures(id)

  let selectedCase:any = testCaseId ? testCases?.find(tc => tc.id === Number(testCaseId)) : {}
  const {__typename, feature, ...selectedCaseReady} = selectedCase
  console.log("selectedCase: ", selectedCase)
  console.log('testCaseId: ', testCaseId)
  console.log('selectedCaseReady: ', selectedCaseReady)

const [testCase, setTestCase] = React.useReducer(
    (state: TestCaseInput, update: TestCaseInput) => ({ ...state, ...update }),
    // {feature: Number(id), ...selectedCase}
    // testCaseId ?{ ...selectedCase} : {feature: Number(id)}
    testCaseId ?{ ...selectedCaseReady} : {feature: Number(id)}

  )



  const saveTestCase = () => {
    if (testCaseId) {
        console.log('update fired, test case passed: ', testCase)
        console.log('test case name: ', testCase.name)
      updateTestCases({
        variables: 
        {
            testCase,
            // feature: Number(id)

            // id: testCaseId
        },
      })
    } else {
        console.log('add fired')

      addTestCase({
        variables: {
            testCase,
            // feature: Number(id)

        },
      })
    }
  }

  if (addTestCaseLoading) return <p>Loading...</p>
  if (addTestCaseError) return <p>Error :(</p>
  if (updateTestCaseLoading) return <p>Loading...</p>
  if (updateTestCaseError) return <p>Error :(, { updateTestCaseError}</p>

  return (
    <>
      <h1>New test case:</h1>
      <Form>
        <Form.Group 
        className='mb-3' 
        >
          <Form.Label>Name:</Form.Label>
          <Form.Control 
          type='text' 
          placeholder='Name'
          value={testCase?.name} 
            onChange={(e) => setTestCase({ name: e.currentTarget.value })}
             />
        </Form.Group>
        <Form.Group 
        className='mb-3' 
        >
          <Form.Label>Duration:</Form.Label>
          <Form.Control 
          type='number' 
          placeholder='Duration'
          value={Number(testCase?.duration)} 
            onChange={(e) => setTestCase({ duration: Number(e.currentTarget.value) })}
             />
        </Form.Group>
        <Form.Group 
        className='mb-3' 
        >
          <Form.Label>Expected result:</Form.Label>
          <Form.Control 
          type='text' 
          placeholder='Expected result' 
          value={testCase?.expectedResult} 
            onChange={(e) => setTestCase({ expectedResult: e.currentTarget.value })}
            />
        </Form.Group>
        <Form.Group 
        className='mb-3' 
        >
          <Form.Label>Description:</Form.Label>
          <Form.Control 
          type='text' 
          placeholder='Description' 
          value={testCase?.description} 
            onChange={(e) => setTestCase({ description: e.currentTarget.value })}
            />
        </Form.Group>
        <Form.Group 
        className='mb-3' 
        >
          <Form.Label>Operating Systems:</Form.Label>
          <Form.Control 
          type='text' 
          placeholder='Operating Systems' 
          value={testCase?.operatingSystems} 
            onChange={(e) => setTestCase({ operatingSystems: e.currentTarget.value })}
            />
        </Form.Group>
        <Form.Group 
        className='mb-3' 
        >
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
            console.log('testCase: ', testCase)
            saveTestCase()
            // addTestCase({
            //     variables: {
            //         testCase
            //     },
            // })
            // updateTestCases({
            //     variables: {
            //         testCase,
        
            //     },
            //   })
            navigate(`/features/${id}`)
          }}
        >
            {/* add */}
          {testCaseId ? 'Update' : 'Add'}
        </Button>

      </Form>
    </>
  )
}

export default Feature
