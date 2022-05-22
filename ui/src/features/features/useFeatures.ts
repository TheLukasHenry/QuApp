import { useQuery } from '@apollo/client'
import { FeatureType } from '../../components/Types'
import { FEATURES, FEATURE} from './features.graphql'
import { useAddFeature, useRemoveFeature, useUpdateFeature } from './features.hooks'
import { FeatureContext } from '../../components/MainComponent'
import { useContext } from 'react'


export type FeatureInput = Partial<FeatureType>

type FeaturesData = {
  features: FeatureType[]
}

type FeatureData = {
  feature: FeatureType
}

export const useFeatures = (id?: string) => {
  const { loading, error, data } = useQuery<FeaturesData>(FEATURES)
  const {
    loading: featureLoading,
    error: featureError,
    data: featureData,
  } = useQuery<FeatureData>(FEATURE, {
    variables: {
      id:id||"",
    },
  })

  const { modalToggle, show } = useContext(FeatureContext)
  const { addFeature, loading: addFeatureLoading, error: addFeatureError } = useAddFeature()
  const { updateFeature, loading: updateFeatureLoading, error: updateFeatureError } = useUpdateFeature()
  const { removeFeature, loading: deleteFeatureLoading, error: deleteFeatureError } = useRemoveFeature()

  return {
    modalToggle,
    show,
    featureLoading,
    featureError,
    feature: featureData?.feature,
    loading,
    error,
    features: data?.features || [],
    addFeature,
    addFeatureLoading,
    addFeatureError,
    updateFeature,
    updateFeatureLoading,
    updateFeatureError,
    removeFeature,
    deleteFeatureLoading,
    deleteFeatureError,
  }
}
