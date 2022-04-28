
import { gql } from '@apollo/client'

export const FEATURES = gql`
  query {
    features {
      id
      name
      description
      testCases {
        id
        name
      }
    }
  }
`

// fixed feature to id
export const FEATURE = gql`
  query ($id: String!){
  feature(id: $id) {
    id
    name
    description
   	testCases {
       id
       description
        name
     }
  }
}
`

export const TEST_CASES = gql`
  query TestCases{
  testCases{
    name
    id
    description
    expectedResult
    operatingSystems
    prerequisites
    duration
    feature{
      id
    }
  }
}
`

export const ADD_FEATURE = gql`
  mutation createFeature($feature: CreateFeatureInput!) {
    createFeature(createFeatureInput: $feature) {
      id
      name
      description
    }
  }
`

// working code
// export const UPDATE_FEATURE = gql`
//   mutation updateFeature($id: String!, $feature: FeatureInput!) {
//     updateFeature(feature: $feature) {
//       id
//       name
//       description
//     }
//   }
// `

//  Lukas attempt
export const UPDATE_FEATURE = gql`
  mutation updateFeature($feature: UpdateFeatureInput!) {
    updateFeature(updateFeatureInput: $feature) {
      id
      name
      description
    }
  }
`

// mutate delete feature
export const REMOVE_FEATURE = gql`
  mutation removeFeature($id: String!) {
    removeFeature(id: $id) {
      id
      name
      description
    }
  }
`

export const ADD_TEST_CASE = gql`
  mutation createTestCase($testCase: CreateTestCaseInput!) {
    createTestCase(createTestCasesInput: $testCase) {
      id
      name
      feature{
        id
      }
    }
  }
`

export const REMOVE_TEST_CASE = gql`
  mutation removeTestCase ($testCaseId: String!) {
  removeTestCase(testCaseId: $testCaseId)
 {
  name
  id
  description
}
}
`

export const UPDATE_TEST_CASE = gql`
  mutation updateTestCases ($testCase: UpdateTestCaseInput!) {
  updateTestCases(updateTestCaseInput: $testCase) {
      id
      name
      # description
    }
  }
`
