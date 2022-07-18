import React from 'react'
import { Button, Accordion } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useFeatures } from '../features/features/useFeatures'
import { Error } from './Error'
import { Loading } from './Loading'
import { TestCasesAccordionItem } from './TestCasesAccordionItem'
import { Formik, Form } from 'formik'
import { InputField } from './InputField'
import * as Yup from 'yup'

export const TestCasesAccordion: React.FC = () => {
  const { id } = useParams()
  const { updateFeature, feature, featureLoading, featureError } = useFeatures(id)
  const navigate = useNavigate()

  const validate = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  })

  const name = feature?.name
  const description = feature?.description
  const testCases = feature?.testCases

  return (
    <div className='container-fluid mt-0 px-5'>
      <Formik
        enableReinitialize={true}
        initialValues={{
          description: description,
          name: name,
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          updateFeature({ variables: { feature: { ...values, id: Number(id) } } })
        }}
      >
        {(formik) => (
          <div>
            <Form>
              <h1 className='text-center m-3 h1'>Feature</h1>

              <InputField wrapperClasses='h2' label='Feature' name='name' type='text' />
              <InputField wrapperClasses='h5 mt-4' label='Description' name='description' type='textarea' />

              <Button type='submit' className='py-2 px-4 my-4 shadow'>
                Save
              </Button>
            </Form>
          </div>
        )}
      </Formik>
      <h1 className='text-center my-4'>
        Test Cases
        <Button variant='primary' className='px-3 mx-2 shadow' onClick={() => navigate(`/features/${id}/addTestCase`)}>
          +
        </Button>
      </h1>

      <Accordion className='text-white' defaultActiveKey={['0']} flush>
        {testCases?.map((testCase) => (
          <TestCasesAccordionItem key={testCase.id} testCase={testCase} />
        ))}
      </Accordion>
      {featureError && <Error>{featureError}</Error>}
      {featureLoading && <Loading />}
    </div>
  )
}

export default TestCasesAccordion
