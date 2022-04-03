
import { useQuery } from '@apollo/client'
import React from 'react'
import { FeatureType } from '../../components/Types'
import { FEATURES } from './features.graphql'
import { useAddFeature, useRemoveFeature, useUpdateFeature } from './features.hooks'

  
  export type FeatureInput = Partial<FeatureType>
  
  type FeatureData = {
    features: FeatureType[]
  }


export const useFeatures = () => {
    const { loading, error, data } = useQuery<FeatureData>(FEATURES)
    const { addFeature, loading: addFeatureLoading, error: addFeatureError } = useAddFeature()
    const { updateFeature, loading: updateFeatureLoading, error: updateFeatureError } = useUpdateFeature()
    const { removeFeature, loading: deleteFeatureLoading, error: deleteFeatureError } = useRemoveFeature()
  
    return (
        {
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
    )

  }