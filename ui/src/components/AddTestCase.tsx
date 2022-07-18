import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTestCases } from '../testCases/useTestCases'
import { TestCase } from './Types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputField } from './InputField'
import { Error } from './Error'
import { Loading } from './Loading'

export type TestCaseInput = Partial<TestCase>

export const AddTestCase: React.FC = () => {
  const { id, testCaseId } = useParams()

  const navigate = useNavigate()
  const { addTestCase, testCase, updateTestCases, testCasesError, testCasesLoading } = useTestCases(testCaseId)
  const selectedCase = { ...testCase }
  const { __typename, ...selectedCaseReady } = selectedCase
  const validate = Yup.object({
    name: Yup.string().required('Name is required'),
    duration: Yup.number().required('Duration is required'),
    expectedResult: Yup.string().required('Expected result is required'),
    description: Yup.string().required('Description is required'),
    operatingSystems: Yup.string().required('Operating systems is required'),
    prerequisites: Yup.string().required('Prerequisites is required'),
  })

  return (
    <Formik
      initialValues={
        selectedCaseReady || {
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
        testCaseId
          ? updateTestCases({ variables: { testCase: values } })
          : addTestCase({ variables: { testCase: { feature: Number(id), ...values } } })
        navigate(`/features/accordion/${id}`)
      }}
    >
      {(formik) => (
        <Form className='row px-5 mx-3'>
          <h1 className='text-center py-5'>{testCaseId ? 'Update' : 'Add'} test case</h1>

          <InputField wrapperClasses='col-md-6 col-lg-4 mb-4' name='name' type='text' label='Name' active='focused' />

          <InputField
            wrapperClasses='col-md-6 col-lg-4 mb-4'
            name='expectedResult'
            label='Expected result'
            type='text'
            active='active'
          />

          <InputField
            wrapperClasses='col-md-6 col-lg-4 mb-4'
            name='description'
            label='Description'
            type='textarea'
            active='active'
          />

          <InputField
            wrapperClasses='col-md-6 col-lg-4 mb-4'
            name='operatingSystems'
            label='Operating systems'
            type='text'
            active='active'
          />

          <InputField
            wrapperClasses='col-md-6 col-lg-4 mb-4'
            name='prerequisites'
            label='Prerequisites'
            type='text'
            active='active'
          />

          <InputField
            wrapperClasses='col-md-6 col-lg-4 mb-4'
            name='duration'
            label='Duration'
            type='number'
            active='active'
          />

          <Button type='submit' className='py-2 px-4 my-4 shadow'>
            Add
          </Button>
          {testCasesError && <Error>{testCasesError}</Error>}
          {testCasesLoading && <Loading />}
        </Form>
      )}
    </Formik>
  )
}

export default AddTestCase
