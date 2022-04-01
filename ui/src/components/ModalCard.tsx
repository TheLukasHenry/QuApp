import React, { useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'


export default function ModalCard() {

  const [show, setShow] = useState(false);

  const modalToggle = () => setShow(!show);

  return (
    <>
    <Card 
    style={{ width: '18rem' }}
    className={'col-md-4 col-sm-6 col-xs-12'}
    
    >
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Text>
        <Button variant='primary' onClick={modalToggle}>Open Modal</Button>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={modalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={modalToggle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
