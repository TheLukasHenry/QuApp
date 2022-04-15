import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FeatureType } from './Types'
import { useFeatures } from '../features/features/useFeatures'

type FeatureCardProps = {
  feature: FeatureType
}

export const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { feature } = props

  const {
        removeFeature,
  } = useFeatures()

  return (
      <Card style={{ width: '18rem' }} className={'col-md-4 col-sm-6 col-xs-12'}>
        <Card.Body>
          <Card.Title>
            {feature.name}
          </Card.Title>
          <Card.Text>
            {feature.description}
          </Card.Text>

          <Button variant='primary'>
            <Link 
            className='text-light text-decoration-none' 
            to={`/features/${feature.id}`}
            >
              Open
            </Link>{' '}
          </Button>
          <Button
            onClick={() => {
              console.log('id', feature.id)
              removeFeature({ variables: { id: `${feature.id}` } })
            }}
          >
            delete feature
          </Button>
        </Card.Body>
      </Card>
  )
}

export default FeatureCard

