import { useQuery } from '@apollo/client'
import { TestCase } from '../components/Types'
import { TEST_CASES } from './testCases.graphql'
import { useAddTestCase, useRemoveTestCase, useUpdateTestCases } from './testCases.hooks'

type TestCasesData = {
  testCases: TestCase[]
}

export const useTestCases = (id?: string) => {
  const { data: testCasesData, loading: testCasesLoading, error: testCasesError } = useQuery<TestCasesData>(TEST_CASES)
  const { addTestCase, loading: addTestCaseLoading, error: addTestCaseError } = useAddTestCase()
  const { removeTestCase, loading: removeTestCaseLoading, error: removeTestCaseError } = useRemoveTestCase()
  const { updateTestCases, loading: updateTestCaseLoading, error: updateTestCaseError } = useUpdateTestCases()

  return {
    updateTestCases,
    testCases: testCasesData?.testCases,
    testCasesLoading: removeTestCaseLoading || addTestCaseLoading || updateTestCaseLoading || testCasesLoading,
    testCasesError: removeTestCaseError || addTestCaseError || updateTestCaseError || testCasesError,
    removeTestCase,
    addTestCase,
  }
}
