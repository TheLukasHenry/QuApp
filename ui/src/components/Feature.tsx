import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FeatureType } from './Types'



export const Feature: React.FC<FeatureType> = (props) => {
  const { id, name, testCases } = props

  return (
      <Card style={{ width: '18rem' }} className={'col-md-4 col-sm-6 col-xs-12'}>
        <Card.Body>
          <Card.Title>
            {name}
          </Card.Title>

          <Button variant='primary'>
            <Link className='text-light text-decoration-none' to='/features'>
              Open
            </Link>{' '}
          </Button>
        </Card.Body>
      </Card>
  )
}

export default Feature
