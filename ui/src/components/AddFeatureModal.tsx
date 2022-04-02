import React from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { FeatureType } from './Types'


interface Props {
    modalToggle: () => void
    show: boolean
    featuresArray: FeatureType[]
    setFeaturesArray: (featuresArray: FeatureType[]) => void
}

export const AddFeatureModal: React.FC<Props> = (props) => {

  const [inputValue, setInputValue] = React.useState<string>('')

  const {
    modalToggle, 
    show,
    featuresArray,
    setFeaturesArray
  } = props


    function handleAddFeature() {
    !(inputValue === null)
      ? 
      setFeaturesArray([
          ...featuresArray,
          { id: featuresArray.length + 1, name: inputValue, testCases: [] },
        ])
      : console.log('null')
  }

    return(
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={
              () => {
                handleAddFeature()
                modalToggle()
              }
            }
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddFeatureModal