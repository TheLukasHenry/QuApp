import { Form, Formik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as Yup from 'yup'
import { FeatureContext } from '../App'
import { useFeatures } from '../features/features/useFeatures'
import { Error } from './Error'
import { InputField } from './InputField'
import { Loading } from './Loading'
import { FeatureType } from './Types'

export type FeatureInput = Partial<FeatureType>

interface Props {
  // id?: number
}

export const AddFeatureModal: React.FC<Props> = () => {
  const { modalToggle, show, selectedId } = useContext(FeatureContext)

  const { addFeature, updateFeature, feature: passedFeature, featureError, featureLoading } = useFeatures(selectedId)
  const [feature, setFeature] = React.useReducer(
    (state: FeatureInput, update: FeatureInput) => ({ ...state, ...update }),
    {},
  )

  const validate = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  })

  useEffect(() => {
    if (selectedId) {
      setFeature({ ...passedFeature })
    } else {
      setFeature({ name: '', description: '', id: undefined, testCases: [] })
    }
  }, [selectedId, passedFeature])

  const saveFeature = () => {
    if (selectedId) {
      updateFeature({
        variables: {
          feature: {
            id: selectedId,
            description: feature.description,
            name: feature.name,
          },
        },
      })
    } else {
      addFeature({
        variables: {
          feature: {
            name: feature.name,
            description: feature.description,
          },
        },
      })
    }
  }

  return (
    <Modal onHide={modalToggle} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedId ? 'Update' : 'Add'} Feature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={{
            description: selectedId ? feature?.description : '',
            name: selectedId ? feature?.name : '',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            selectedId
              ? updateFeature({ variables: { feature: { ...values, id: selectedId } } })
              : addFeature({ variables: { feature: values } })
            modalToggle()
          }}
        >
          {(formik) => (
            <div className='container'>
              <Form className='row'>
                <InputField label='Name' name='name' type='text' />
                <InputField label='Description' name='description' type='textarea' />
                <Button type='submit' className='py-2 px-4 my-4 shadow'>
                  Submit
                </Button>
              </Form>
            </div>
          )}
        </Formik>
      </Modal.Body>
      {featureError && <Error>{featureError}</Error>}
      {featureLoading && <Loading />}
    </Modal>
  )
}

export default AddFeatureModal
