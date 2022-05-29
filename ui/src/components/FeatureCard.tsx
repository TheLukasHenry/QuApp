import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FeatureType } from './Types'
import { useFeatures } from '../features/features/useFeatures'
import { Error } from './Error'
import { Loading } from './Loading'

type FeatureCardProps = {
  feature: FeatureType
}

export const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { feature } = props
  const navigate = useNavigate()
  const { removeFeature, featureError, featureLoading } = useFeatures(feature.id?.toString())

  return (
    <Card
      onClick={() => {
        navigate(`/features/${feature.id}`)
      }}
      className='h-100'
    >
      <Card.Body>
        <Card.Title>Feature: {feature.name}</Card.Title>
        <Card.Text>Description: {feature.description}</Card.Text>

        {feature.testCases.length === 0 ? (
          <Button
            className='z-index-1 delete-btn'
            onClick={(e) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              removeFeature({ variables: { id: `${feature.id}` } })
            }}
          >
            Delete
          </Button>
        ) : null}
      </Card.Body>

      {featureError && <Error >
          {featureError}
          </Error>}
      {featureLoading && <Loading />}
    </Card>
  )
}

export default FeatureCard
