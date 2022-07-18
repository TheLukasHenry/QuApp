import React from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { TestCase } from './Types'
import { useTestCases } from '../testCases/useTestCases'
import { Formik, Form } from 'formik'
import { InputField } from './InputField'
import * as Yup from 'yup'
import { Error } from './Error'
import { Loading } from './Loading'

interface Props {
  testCase: TestCase
}

export const TestCasesAccordionItem: React.FC<Props> = (props) => {
  const { testCase } = props
  const { updateTestCases, testCasesError, testCasesLoading } = useTestCases()

  const validate = Yup.object({
    name: Yup.string().required('Name is required'),
    duration: Yup.number().required('Duration is required'),
    expectedResult: Yup.string().required('Expected result is required'),
    description: Yup.string().required('Description is required'),
    operatingSystems: Yup.string().required('Operating systems is required'),
    prerequisites: Yup.string().required('Prerequisites is required'),
  })

  return (
    <Accordion.Item eventKey={String(testCase.id)}>
      <Accordion.Header>
        <p>{testCase.name}</p>
        <p>Test steps: </p>
      </Accordion.Header>
      <Formik
        initialValues={
          testCase || {
            name: '',
            duration: 0,
            expectedResult: '',
            description: '',
            operatingSystems: '',
            prerequisites: '',
          }
        }
        validationSchema={validate}
        enableReinitialize
        onSubmit={(values) => {
          updateTestCases({
            variables: {
              testCase: {
                name: values.name,
                duration: values.duration,
                expectedResult: values.expectedResult,
                description: values.description,
                operatingSystems: values.operatingSystems,
                prerequisites: values.prerequisites,
                id: testCase.id,
              },
            },
          })
        }}
      >
        {(formik) => (
          <Accordion.Body className='container'>
            <Form className='row'>
              <InputField wrapperClasses='col-md-6 col-lg-4 pr-3 mb-4' name='name' type='text' label='Name' />

              <InputField
                wrapperClasses='col-md-6 col-lg-4 mb-4'
                name='expectedResult'
                label='Expected result'
                type='text'
              />

              <InputField
                wrapperClasses='col-md-6 col-lg-4 mb-4'
                name='description'
                label='Description'
                type='textarea'
              />

              <InputField
                wrapperClasses='col-md-6 col-lg-4 mb-4'
                name='operatingSystems'
                label='Operating systems'
                type='text'
              />

              <InputField
                wrapperClasses='col-md-6 col-lg-4 mb-4'
                name='prerequisites'
                label='Prerequisites'
                type='text'
              />

              <InputField wrapperClasses='col-md-6 col-lg-4 mb-4' name='duration' label='Duration' type='number' />

              <Button type='submit' className='col-md-3 my-4'>
                Save
              </Button>
            </Form>
            {testCasesError && <Error>{testCasesError}</Error>}
            {testCasesLoading ? <Loading /> : ''}
          </Accordion.Body>
        )}
      </Formik>
    </Accordion.Item>
  )
}

export default TestCasesAccordionItem
