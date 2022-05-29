import React, { useContext, useEffect } from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'
import { FeatureType } from './Types'
import { Error } from './Error'
import { Loading } from './Loading'
import { FeatureContext } from '../App'

export type FeatureInput = Partial<FeatureType>

interface Props {
  // id?: number
}

export const AddFeatureModal: React.FC<Props> = () => {
  const { modalToggle, show, selectedId } = useContext(FeatureContext)


  const {
    addFeature,
    updateFeature,
    feature: passedFeature,
    featureError,
    featureLoading,
  } = useFeatures(selectedId)
  const [feature, setFeature] = React.useReducer(
    (state: FeatureInput, update: FeatureInput) => ({ ...state, ...update }),
    {},
  )

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
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Name:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={feature?.name || ''}
            onChange={(e) => setFeature({ name: e.currentTarget.value })}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>Description:</InputGroup.Text>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            value={feature?.description || ''}
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
          {selectedId ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>

      {featureError && <Error >
          {featureError}
          </Error>}
      {featureLoading && <Loading />}
    </Modal>
  )
}

export default AddFeatureModal
