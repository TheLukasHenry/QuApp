import React from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'
import { FeatureType } from './Types'


export type FeatureInput = Partial<FeatureType>


interface Props {
  modalToggle: () => void
  show: boolean
}

export const AddFeatureModal: React.FC<Props> = (props) => {

  const { modalToggle,
     show, 
     } = props

     const [feature, setFeature] = React.useReducer(
      (state: FeatureInput, update: FeatureInput) => ({ ...state, ...update }),
      {},
    )

  const { loading, 
    error, 
    addFeature, 
    updateFeature, 
  } = useFeatures()

  const saveFeature = () => {
    if (feature.id) {
      updateFeature({
        variables: {
          id: feature.id,
          feature,
        },
      })
    } else {
      addFeature({
        variables: {
          feature,
        },
      })
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
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
            value={feature?.name} 
            onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Description:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={feature?.description} 
            onChange={(e) => setFeature({ description: e.currentTarget.value })}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            modalToggle()
            saveFeature()
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddFeatureModal
