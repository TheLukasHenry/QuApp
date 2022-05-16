import React, { useEffect } from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'
import { FeatureType } from './Types'

export type FeatureInput = Partial<FeatureType>

interface Props {
  modalToggle: () => void
  id?: number
  show: boolean
}

export const AddFeatureModal: React.FC<Props> = (props) => {
  const { modalToggle, id, show } = props

  const { loading, error, addFeature, updateFeature, feature: passedFeature } = useFeatures(id?.toString())
  const [feature, setFeature] = React.useReducer(
    (state: FeatureInput, update: FeatureInput) => ({ ...state, ...update }),
    {},
  )

  useEffect(() => {
    if (id) {
      setFeature({ ...passedFeature })
    } else {
      setFeature({ name: '', description: '', id: undefined, testCases: [] })
    }
  }, [id, passedFeature])

  const saveFeature = () => {
    if (id) {
      updateFeature({
        variables: {
          feature: {
            id: id,
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
    <Modal
      onHide={modalToggle}
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title>{id ? 'Update' : 'Add'} Feature</Modal.Title>
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
          {id ? 'Update' : 'Add'}
        </Button>
        <p className='text-danger'>{loading ? 'Feature loading' : ''}</p>
        <p className='text-danger'>{error ? 'Feature error' : ''}</p>
      </Modal.Footer>
    </Modal>
  )
}

export default AddFeatureModal
