
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

export const ADD_FEATURE = gql`
  mutation createFeature($feature: CreateFeatureInput!) {
    createFeature(createFeatureInput: $feature) {
      id
      name
      description
    }
  }
`

export const UPDATE_FEATURE = gql`
  mutation updateFeature($id: String!, $feature: FeatureInput!) {
    updateFeature(feature: $feature) {
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
