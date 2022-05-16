import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FeatureType } from './Types'
import { useFeatures } from '../features/features/useFeatures'

type FeatureCardProps = {
  feature: FeatureType
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedFeatureId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { feature, setShow, setSelectedFeatureId } = props

  const { removeFeature } = useFeatures()

  return (
    <Card  className={'col-lg-4 col-md-6 col-xs-12 feature-card shadow'}>
      <Card.Body>
        <Card.Title className="text-center mb-4">{feature.name}</Card.Title>
        <Card.Text>Description: {feature.description}</Card.Text>
        <Card.Text>Test Cases: {feature.testCases.length}</Card.Text>

        <Button variant='primary' className="m-1">
          <Link className='text-light text-decoration-none' to={`/features/${feature.id}`}>
            Open
          </Link>{' '}
        </Button>
        <Button
          onClick={() => {
            removeFeature({ variables: { id: `${feature.id}` } })
          }}
          className="m-1"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setSelectedFeatureId(feature.id)
            setShow(true)
          }}
          className="m-1"
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  )
}

export default FeatureCard
