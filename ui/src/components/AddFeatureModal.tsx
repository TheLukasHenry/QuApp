import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { Button, Modal, CloseButton } from 'react-bootstrap'
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

  const { addFeature, updateFeature, feature, featureError, featureLoading } = useFeatures(selectedId)

  const validate = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  })

  const saveFeature = (values: any) => {
    if (selectedId) {
      updateFeature({ variables: { feature: { ...values, id: selectedId } } })
    } else {
      addFeature({ variables: { feature: values } })
    }
  }

  return (
    <Modal onHide={modalToggle} show={show}>
      <Modal.Header>
        <Modal.Title>{selectedId ? 'Update' : 'Add'} Feature</Modal.Title>
        <CloseButton onClick={modalToggle} variant='white' />
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
            saveFeature(values)
            modalToggle()
          }}
        >
          {(formik) => (
            <div>
              <Form>
                <InputField label='Name' name='name' type='text' wrapperClasses='h2' active='focused' />
                <InputField
                  label='Description'
                  name='description'
                  type='textarea'
                  wrapperClasses='h2'
                  active='active'
                />
                <Button type='submit' className='py-2 px-4 my-4 shadow'>
                  {selectedId ? 'Update' : 'Add'}
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
