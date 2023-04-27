import React, { useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import * as ApiClient from './generated-client/api'

const useFeatures = () => {
  const apiClient = new ApiClient.FeaturesApi()

  const {
    data: features,
    isLoading: loadingFeatures,
    refetch: refetchFeatures,
  } = useQuery('features', async () => {
    const response = await apiClient.featuresGet()
    return response.data
  })

  const createFeatureMutation = useMutation(
    async (feature: ApiClient.Feature) => {
      await apiClient.featuresPost(feature)
    },
    {
      onSuccess: () => {
        refetchFeatures()
      },
    }
  )

  const updateFeatureMutation = useMutation(
    async (feature: ApiClient.Feature) => {
      await apiClient.featuresPut(feature)
    },
    {
      onSuccess: () => {
        refetchFeatures()
      },
    }
  )

  const deleteFeatureMutation = useMutation(
    async (id: number) => {
      await apiClient.featuresFeatureIdDelete(id)
    },
    {
      onSuccess: () => {
        refetchFeatures()
      },
    }
  )

  const isError = (error: any): error is Error => error instanceof Error

  const createFeature = (feature: ApiClient.Feature) => {
    createFeatureMutation.mutate(feature)
  }

  const updateFeature = (feature: ApiClient.Feature) => {
    // const feature = features?.find((f: ApiClient.Feature) => f.featureID === feature.featureID);

    if (feature && feature.featureID !== undefined) {
      updateFeatureMutation.mutate(feature)
    }
  }

  const deleteFeature = (id: number) => {
    deleteFeatureMutation.mutate(id)
  }

  const getFeature = (id: number) => {
    return features?.find((f: ApiClient.Feature) => f.featureID === id)
  }

  return {
    features,
    loadingFeatures,
    createFeature,
    updateFeature,
    deleteFeature,
    getFeature,
    feature: createFeatureMutation.data || updateFeatureMutation.data,
    featureError:
      createFeatureMutation.error ||
      updateFeatureMutation.error ||
      deleteFeatureMutation.error,
    featureErrorMessage: isError(createFeatureMutation.error)
      ? createFeatureMutation.error.message
      : isError(updateFeatureMutation.error)
      ? updateFeatureMutation.error.message
      : '',
    featureLoading:
      createFeatureMutation.isLoading ||
      updateFeatureMutation.isLoading ||
      deleteFeatureMutation.isLoading,
    refetchFeatures,
  }
}

export default function Features() {
  const featureNameRef = useRef<HTMLInputElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const companyIdRef = useRef<HTMLInputElement>(null)

  const {
    features,
    loadingFeatures,
    updateFeature,
    deleteFeature,
    createFeature,
    getFeature,
    featureErrorMessage,
    featureLoading,
  } = useFeatures()

  if (loadingFeatures) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Features</h1>
      <ul>
        {features?.map((feature: any) => (
          <li key={feature.featureID}>
            feature name: {feature.featureName}, feature id: {feature.featureID}
            , company id: {feature.companyID}
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="featureName"
        name="featureName"
        placeholder="Feature name"
        ref={featureNameRef}
      />
      <input
        type="text"
        id="id"
        name="id"
        placeholder="feature id"
        ref={idRef}
      />
      <input
        type="number"
        id="companyId"
        name="companyId"
        placeholder="company id"
        ref={companyIdRef}
      />

      <button
        onClick={() => {
          const featureName = featureNameRef.current
          const id = idRef.current
          const companyId = companyIdRef.current
          if (!featureName || !id || !companyId) {
            return
          }
          updateFeature({
            featureName: featureName.value.toString(),
            featureID: +id.value,
            companyID: +companyId.value,
          })
        }}
      >
        Update Feature
      </button>
      <button
        onClick={() => {
          const featureName = featureNameRef.current
          const companyId = companyIdRef.current
          if (!featureName || !companyId) {
            return
          }
          createFeature({
            featureName: featureName.value.toString(),
            companyID: +companyId.value,
          })
        }}
      >
        Create Feature
      </button>
      <button
        onClick={() => {
          const id = idRef.current
          if (!id) {
            return
          }
          deleteFeature(+id.value)
        }}
      >
        Delete Feature
      </button>
      <button
        onClick={() => {
          const id = idRef.current
          if (!id) {
            return
          }
          const feature = getFeature(+id.value)
          if (feature) {
            console.log(feature)
          }
        }}
      >
        Get Feature
      </button>
      {featureErrorMessage && <div>Error: {featureErrorMessage}</div>}

      {featureLoading && <div>Updating feature...</div>}
    </div>
  )
}
