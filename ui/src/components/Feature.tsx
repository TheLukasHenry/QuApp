import React from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

// LukasChange
import { useFeatures } from '../features/features/useFeatures'
import { TestCase } from './Types'

export type TestCaseInput = Partial<TestCase>


export const Feature: React.FC = () => {

  const { id } = useParams()
  const { feature } = useFeatures(id)
  const [show, setShow] = React.useState(false)
  const modalToggle = () => setShow(!show)

// Create testCase
  const [testCase, setTestCase] = React.useReducer(
    (state: TestCaseInput, update: TestCaseInput) => ({ ...state, ...update }),
    {},
  )

  // const { loading, error, addFeature, updateFeature } = useFeatures()

  // const saveFeature = () => {
  //   if (feature.id) {
  //     updateFeature({
  //       variables: {
  //         id: feature.id,
  //         feature,
  //       },
  //     })
  //   } else {
  //     addFeature({
  //       variables: {
  //         feature,
  //       },
  //     })
  //   }
  // }

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>


  const name = feature?.name
  const description = feature?.description
  const testCases = feature?.testCases

  return (
    <>
    <h1>
      Test Cases
    </h1>
      <div>
        {id}
      </div>
      <h1>{name}</h1>
      <h3>{description}</h3>
      {/* <h3>{testCases}</h3> */}

      <Button
      onClick={modalToggle}
      >
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
            <p>{testCase.testSteps}</p>
          </div>
            ))}
      </p>

      <Modal show={show} onHide={modalToggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add Feature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Name:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={testCase?.name} 
            // onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Description:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={testCase?.description} 
            // onChange={(e) => setFeature({ description: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Duration:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={testCase?.duration} 
            // onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Expected Result:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={testCase?.expectedResult} 
            // onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Operating Systems:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={testCase?.operatingSystems} 
            // onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Prerequisites:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={testCase?.prerequisites} 
            // onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            modalToggle()
            // saveFeature()
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default Feature

