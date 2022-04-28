import { useMutation } from '@apollo/client'
import { ADD_FEATURE, FEATURES, REMOVE_FEATURE, UPDATE_FEATURE
  , FEATURE
  , ADD_TEST_CASE,
  TEST_CASES,
  REMOVE_TEST_CASE,
  UPDATE_TEST_CASE
} from './features.graphql'

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

// Fetching all FEATURES instead of 1 but it works
export const useAddTestCase = () => {
  const [addTestCase, { loading, error }] = useMutation(ADD_TEST_CASE, {
    refetchQueries: [{ query: FEATURES
      // , variables: { id:'' }
     }],
  })
 
  return {
    addTestCase,
    loading,
    error,
  }
}

// Working but not refetching TEST_CASES
export const useRemoveTestCase = () => {
  const [removeTestCase, { loading, error }] = useMutation(REMOVE_TEST_CASE, {
    refetchQueries: [{ query: FEATURES }],
  })

  return {
    removeTestCase,
    loading,
    error,
  }
}

export const useUpdateTestCases = () => {
  const [updateTestCases, { loading, error }] = useMutation(UPDATE_TEST_CASE, {
    refetchQueries: [{ query: FEATURES }],
  })

  return {
    updateTestCases,
    loading,
    error,
  }
}