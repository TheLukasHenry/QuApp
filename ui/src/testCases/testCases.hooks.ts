import { useMutation } from '@apollo/client'
import { FEATURES } from '../features/features/features.graphql'
import { ADD_TEST_CASE,
    TEST_CASES,
    REMOVE_TEST_CASE,
    UPDATE_TEST_CASE
  } from './testCases.graphql'

  // Fetching all FEATURES instead of 1 but it works
export const useAddTestCase = () => {
    const [addTestCase, { loading, error }] = useMutation(ADD_TEST_CASE, {
      refetchQueries: [{ query: FEATURES}],
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