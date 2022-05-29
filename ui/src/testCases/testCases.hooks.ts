import { useMutation } from '@apollo/client'
import { FEATURE } from '../features/features/features.graphql'
import { ADD_TEST_CASE,
    REMOVE_TEST_CASE,
    UPDATE_TEST_CASE
  } from './testCases.graphql'

export const useAddTestCase = () => {
    const [addTestCase, { loading, error }] = useMutation(ADD_TEST_CASE, {
      refetchQueries: [FEATURE],
    })
   
    return {
      addTestCase,
      loading,
      error,
    }
  }
  
  export const useRemoveTestCase = () => {
    const [removeTestCase, { loading, error }] = useMutation(REMOVE_TEST_CASE, {
      refetchQueries: [FEATURE],
    })
  
    return {
      removeTestCase,
      loading,
      error,
    }
  }
  
  export const useUpdateTestCases = () => {
    const [updateTestCases, { loading, error }] = useMutation(UPDATE_TEST_CASE, {
      refetchQueries: [FEATURE],
    })
  
    return {
      updateTestCases,
      loading,
      error,
    }
  }