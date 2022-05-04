import { gql } from '@apollo/client'

export const TEST_CASES = gql`
  query TestCases {
    testCases {
      name
      id
      description
      expectedResult
      operatingSystems
      prerequisites
      duration
      feature {
        id
      }
    }
  }
`

export const ADD_TEST_CASE = gql`
  mutation createTestCase($testCase: CreateTestCaseInput!) {
    createTestCase(createTestCasesInput: $testCase) {
      id
      name
      feature {
        id
      }
    }
  }
`

export const REMOVE_TEST_CASE = gql`
  mutation removeTestCase($testCaseId: String!) {
    removeTestCase(testCaseId: $testCaseId) {
      name
      id
      description
    }
  }
`

export const UPDATE_TEST_CASE = gql`
  mutation updateTestCases($testCase: UpdateTestCaseInput!) {
    updateTestCases(updateTestCaseInput: $testCase) {
      id
      name
    }
  }
`