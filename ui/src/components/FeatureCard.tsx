import React from 'react'
import { Card, Button, Alert, CloseButton } from 'react-bootstrap'
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
  const [show, setShow] = React.useState(false)

  if (show) {
    return (
      <Alert className='bg-transparent text-white' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Are you sure?</Alert.Heading>
        <CloseButton variant='white' onClick={() => setShow(false)} />

        <Button
          className='z-index-1 delete-btn position-absolute btn-danger'
          onClick={() => {
            removeFeature({ variables: { id: `${feature.id}` } })
          }}
        >
          Delete
        </Button>
      </Alert>
    )
  }

  return (
    <Card className='h-100 position-relative p-0 feature-card'>
      <Card.Body
        onClick={() => {
          navigate(`/features/accordion/${feature.id}`)
        }}
      >
        <Card.Title>Feature: {feature.name}</Card.Title>
        <Card.Text className='m-0'>Description: {feature.description}</Card.Text>

        {feature.testCases.length === 0 ? (
          <>
            <Button
              className='z-index-1 delete-btn position-absolute'
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation()
                e.stopPropagation()
                setShow(true)
              }}
            >
              Delete Feature
            </Button>
          </>
        ) : null}
      </Card.Body>

      {featureError && <Error>{featureError}</Error>}
      {featureLoading && <Loading />}
    </Card>
  )
}

export default FeatureCard
