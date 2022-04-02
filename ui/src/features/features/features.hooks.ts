import { useMutation } from '@apollo/client'
import { ADD_FEATURE, FEATURES, REMOVE_FEATURE, UPDATE_FEATURE } from './features.graphql'

export const useAddFeature = () => {
  const [addFeature, { loading, error }] = useMutation(ADD_FEATURE, {
    refetchQueries: [{ query: FEATURES }],
  })

  return {
    addFeature,
    loading,
    error,
  }
}

export const useUpdateFeature = () => {
  const [updateFeature, { loading, error }] = useMutation(UPDATE_FEATURE)

  return {
    updateFeature,
    loading,
    error,
  }
}

export const useRemoveFeature = () => {
  const [removeFeature, { loading, error }] = useMutation(REMOVE_FEATURE, {
    refetchQueries: [{ query: FEATURES }],
  })

  return {
    removeFeature,
    loading,
    error,
  }
}
