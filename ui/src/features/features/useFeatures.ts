import { useQuery } from '@apollo/client'
import { FeatureType, TestCase } from '../../components/Types'
import { FEATURES, FEATURE, TEST_CASES } from './features.graphql'
// import { FEATURE } from './features.graphql'
import { useAddFeature, useRemoveFeature, useUpdateFeature, useAddTestCase, useRemoveTestCase, useUpdateTestCases } from './features.hooks'

export type FeatureInput = Partial<FeatureType>

type FeaturesData = {
  features: FeatureType[]
}

type FeatureData = {
  feature: FeatureType
}

type TestCasesData = {
  testCases: TestCase[]
}

export const useFeatures = (id?: string) => {
  const { loading, error, data } = useQuery<FeaturesData>(FEATURES)
  const {
    loading: featureLoading,
    error: featureError,
    data: featureData,
  } = useQuery<FeatureData>(FEATURE, {
    variables: {
      id:id||"",
    },
  })

  const { data: testCasesData, loading: testCasesLoading, error: testCasesError} = useQuery<TestCasesData>(TEST_CASES)

  const { addFeature, loading: addFeatureLoading, error: addFeatureError } = useAddFeature()
  const { updateFeature, loading: updateFeatureLoading, error: updateFeatureError } = useUpdateFeature()
  const { removeFeature, loading: deleteFeatureLoading, error: deleteFeatureError } = useRemoveFeature()
  const { addTestCase, loading: addTestCaseLoading, error: addTestCaseError } = useAddTestCase()
  const { removeTestCase, loading: removeTestCaseLoading, error: removeTestCaseError } = useRemoveTestCase()
  const { updateTestCases, loading: updateTestCaseLoading, error: updateTestCaseError } = useUpdateTestCases()




  return {
    updateTestCases,
    updateTestCaseLoading,
    updateTestCaseError,
    testCases: testCasesData?.testCases,
    testCasesLoading,
    testCasesError,
    removeTestCase,
    removeTestCaseLoading,
    removeTestCaseError,
    addTestCaseLoading,
    addTestCaseError,
    addTestCase,
    featureLoading,
    featureError,
    feature: featureData?.feature,
    loading,
    error,
    features: data?.features || [],
    addFeature,
    addFeatureLoading,
    addFeatureError,
    updateFeature,
    updateFeatureLoading,
    updateFeatureError,
    removeFeature,
    deleteFeatureLoading,
    deleteFeatureError,
  }
}
