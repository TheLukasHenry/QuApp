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
  const { addTestCase, testCases, testCase, updateTestCases, testCasesError, testCasesLoading } =
    useTestCases(testCaseId)
  const selectedCase = { ...testCase }

  const { __typename, ...selectedCaseReady } = selectedCase
  // if (testCase) {

  //   delete selectedCase.__typename
  // }
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
        navigate(`/features/${id}`)
      }}
    >
      {(formik) => (
        <div className='container'>
          <h1 className='text-center py-5'>{testCaseId ? 'Update' : 'Add'} test case</h1>
          <Form className='row'>
            <InputField label='Name' name='name' type='text' />
            <InputField label='Duration' name='duration' type='number' />
            <InputField label='Expected result' name='expectedResult' type='textarea' />
            <InputField label='Description' name='description' type='textarea' />
            <InputField label='Operating systems' name='operatingSystems' type='text' />
            <InputField label='Prerequisites' name='prerequisites' type='text' />
            <Button type='submit' className='py-2 px-4 my-4 shadow'>
              Submit
            </Button>
          </Form>
          {testCasesError && <Error>{testCasesError}</Error>}
          {testCasesLoading && <Loading />}
        </div>
      )}
    </Formik>
  )
}

export default AddTestCase
