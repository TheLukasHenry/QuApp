import React, { useEffect } from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { useFeatures } from '../features/features/useFeatures'
import { FeatureType } from './Types'

export type FeatureInput = Partial<FeatureType>

interface Props {
  modalToggle: () => void
  show: boolean
  id?: number
  passedFeature?: FeatureType
}

export const AddFeatureModal: React.FC<Props> = (props) => {
  const { modalToggle, show, id, passedFeature } = props

  const [feature, setFeature] = React.useReducer(
    (state: FeatureInput, update: FeatureInput) => ({ ...state, ...update }),
    {},
  )

  const { loading, error, addFeature, updateFeature } = useFeatures()

 useEffect(() => {
   if(passedFeature?.id) {
      setFeature(passedFeature)
   }
   else {
     setFeature({id: undefined, name: undefined, description: undefined, testCases: undefined})
   }
  }, [passedFeature?.id])


  const saveFeature = () => {
    if (feature.id) {
      updateFeature({
        variables: {
          feature:{
            id: feature.id,
            name: feature.name,
            description: feature.description,
          },
        },
      })
    } else {
      addFeature({
        variables: {
          feature:{
            name: feature.name,
            description: feature.description,
          },
        },
      })
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

 
  return (
    <Modal show={show} onHide={modalToggle}>
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
      </Modal.Footer>
    </Modal>
  )
}

export default AddFeatureModal
