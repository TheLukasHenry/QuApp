import React, { useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import * as ApiClient from './generatedClient/api'

const useTestCases = () => {
  const apiClient = new ApiClient.TestCasesApi()

  const {
    data: testCases,
    isLoading: loadingTestCases,
    refetch: refetchTestCases,
  } = useQuery<ApiClient.TestCase[], Error>('testCases', async () => {
    const response = await apiClient.testCasesGet()
    return response.data as unknown as ApiClient.TestCase[]
  })

  const createTestCaseMutation = useMutation(
    async (testCase: ApiClient.TestCase) => {
      await apiClient.testCasesPost(testCase)
    },
    {
      onSuccess: () => {
        refetchTestCases()
      },
    }
  )

  const updateTestCaseMutation = useMutation(
    async (testCase: ApiClient.TestCase) => {
      await apiClient.testCasesIdPut(testCase.testCaseID!, testCase)
    },
    {
      onSuccess: () => {
        refetchTestCases()
      },
    }
  )

  const deleteTestCaseMutation = useMutation(
    async (id: number) => {
      await apiClient.testCasesIdDelete(id)
    },
    {
      onSuccess: () => {
        refetchTestCases()
      },
    }
  )

  const isError = (error: any): error is Error => error instanceof Error

  const createTestCase = (testCase: ApiClient.TestCase) => {
    createTestCaseMutation.mutate(testCase)
  }

  const updateTestCase = (testCase: ApiClient.TestCase) => {
    if (testCase && testCase.testCaseID !== undefined) {
      updateTestCaseMutation.mutate(testCase)
    }
  }

  const deleteTestCase = (id: number) => {
    deleteTestCaseMutation.mutate(id)
  }

  const getTestCase = (id: number) => {
    ;(testCases || []).forEach((testCase: ApiClient.TestCase) => {
      if (testCase.testCaseID === id) {
        return testCase
      }
    })
    // return testCases.find((testCase: ApiClient.TestCase) => testCase.testCaseID === id)
  }

  return {
    testCases,
    loadingTestCases,
    createTestCase,
    updateTestCase,
    deleteTestCase,
    getTestCase,
    testCase: createTestCaseMutation.data || updateTestCaseMutation.data,
    testCaseError:
      createTestCaseMutation.error ||
      updateTestCaseMutation.error ||
      deleteTestCaseMutation.error,
    testCaseErrorMessage: isError(createTestCaseMutation.error)
      ? createTestCaseMutation.error.message
      : isError(updateTestCaseMutation.error)
      ? updateTestCaseMutation.error.message
      : '',
    testCaseLoading:
      createTestCaseMutation.isLoading ||
      updateTestCaseMutation.isLoading ||
      deleteTestCaseMutation.isLoading,
    refetchTestCases,
  }
}

export default function TestCases() {
  const testCaseNameRef = useRef<HTMLInputElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const featureIdRef = useRef<HTMLInputElement>(null)
  const testCaseOrderRef = useRef<HTMLInputElement>(null)

  const {
    testCases,
    loadingTestCases,
    updateTestCase,
    deleteTestCase,
    createTestCase,
    getTestCase,
    testCaseErrorMessage,
    testCaseLoading,
  } = useTestCases()

  console.log({ testCases })

  if (loadingTestCases) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Test Cases</h1>

      <ul>
        {testCases?.map((testCase: ApiClient.TestCase) => (
          <li key={testCase.testCaseID}>
            test case name: {testCase.testCaseName} , id: {testCase.testCaseID}{' '}
            , feature id: {testCase.featureID} , test case order:{' '}
            {testCase.testCaseOrder}
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="testCaseName"
        name="testCaseName"
        placeholder="Test case name"
        ref={testCaseNameRef}
      />
      <input
        type="text"
        id="id"
        name="id"
        placeholder="test case id"
        ref={idRef}
      />
      <input
        type="number"
        id="featureId"
        name="featureId"
        placeholder="feature id"
        ref={featureIdRef}
      />
      <input
        type="number"
        id="testCaseOrder"
        name="testCaseOrder"
        placeholder="test case order"
        ref={testCaseOrderRef}
      />
      <button
        onClick={() => {
          const testCaseName = testCaseNameRef.current
          const id = idRef.current
          const featureId = featureIdRef.current
          const testCaseOrder = testCaseOrderRef.current
          if (!testCaseName || !id || !featureId || !testCaseOrder) {
            return
          }
          updateTestCase({
            testCaseName: testCaseName.value.toString(),
            testCaseID: +id.value,
            featureID: +featureId.value,
            testCaseOrder: +testCaseOrder.value,
          })
        }}
      >
        Update Test Case
      </button>
      <button
        onClick={() => {
          const testCaseName = testCaseNameRef.current
          const featureId = featureIdRef.current
          const testCaseOrder = testCaseOrderRef.current
          if (!testCaseName || !featureId || !testCaseOrder) {
            return
          }
          createTestCase({
            testCaseName: testCaseName.value.toString(),
            featureID: +featureId.value,
            testCaseOrder: +testCaseOrder.value,
          })
        }}
      >
        Create Test Case
      </button>
      <button
        onClick={() => {
          const id = idRef.current
          if (!id) {
            return
          }
          deleteTestCase(+id.value)
        }}
      >
        Delete Test Case
      </button>
      {/* <button
        onClick={() => {
          const id = idRef.current
          if (!id) {
            return
          }
          const testCase = getTestCase(+id.value)
          if (testCase) {
            console.log(testCase)
          }
        }}
      >
        Get Test Case
      </button> */}
      {testCaseErrorMessage && <div>Error: {testCaseErrorMessage}</div>}

      {testCaseLoading && <div>Updating test case...</div>}
    </div>
  )
}
