import { useQuery } from '@apollo/client'
import { FeatureType } from '../../components/Types'
import { FEATURES, FEATURE} from './features.graphql'
import { useAddFeature, useRemoveFeature, useUpdateFeature } from './features.hooks'
import { FeatureContext } from '../../App'
import { useContext } from 'react'


export type FeatureInput = Partial<FeatureType>

type FeaturesData = {
  features: FeatureType[]
}

type FeatureData = {
  feature: FeatureType
}

export const useFeatures = (id?: string) => {
  const { loading: featuresLoading, error: featuresError, data } = useQuery<FeaturesData>(FEATURES)
  const {
    loading: featureLoading,
    error: featureError,
    data: featureData,
  } = useQuery<FeatureData>(FEATURE, {
    skip: !id,
    variables: {
      id:id?.toString()||"",
    },
  })

  const { modalToggle } = useContext(FeatureContext)
  const { addFeature, loading: addFeatureLoading, error: addFeatureError } = useAddFeature()
  const { updateFeature, loading: updateFeatureLoading, error: updateFeatureError } = useUpdateFeature()
  const { removeFeature, loading: deleteFeatureLoading, error: deleteFeatureError } = useRemoveFeature()

  return {
    modalToggle,
    featureLoading: featureLoading || addFeatureLoading || updateFeatureLoading || deleteFeatureLoading || featuresLoading,
    featureError: featureError || addFeatureError || updateFeatureError || deleteFeatureError|| featuresError,
    feature: featureData?.feature,
    features: data?.features || [],
    addFeature,
    updateFeature,
    removeFeature,
  
  }
}
