import { useQuery } from '@apollo/client'
import { TestCase } from '../components/Types'
import { TEST_CASES, TEST_CASE } from './testCases.graphql'
import { useAddTestCase, useRemoveTestCase, useUpdateTestCases } from './testCases.hooks'

type TestCasesData = {
  testCases: TestCase[]
}

type TestCaseData = {
  testCase: TestCase & {__typename?: string}
}

export const useTestCases = (id?: string) => {
  const { data: testCasesData, loading: testCasesLoading, error: testCasesError } = useQuery<TestCasesData>(TEST_CASES)
  const { addTestCase, loading: addTestCaseLoading, error: addTestCaseError } = useAddTestCase()
  const { removeTestCase, loading: removeTestCaseLoading, error: removeTestCaseError } = useRemoveTestCase()
  const { updateTestCases, loading: updateTestCaseLoading, error: updateTestCaseError } = useUpdateTestCases()
  const {
    loading: testCaseLoading,
    error: testCaseError,
    data: testCaseData,
  } = useQuery<TestCaseData>(TEST_CASE, {
    skip: !id,
    variables: {
      id:id?.toString()||"",
    },
  })

  return {
    testCase: testCaseData?.testCase,
    updateTestCases,
    testCases: testCasesData?.testCases,
    testCasesLoading: removeTestCaseLoading || addTestCaseLoading || updateTestCaseLoading || testCasesLoading || testCaseLoading,
    testCasesError: removeTestCaseError || addTestCaseError || updateTestCaseError || testCasesError || testCaseError,
    removeTestCase,
    addTestCase,
  }
}
