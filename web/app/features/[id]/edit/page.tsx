import { revalidatePath } from 'next/cache'
import { TestCase } from '@/generated-api'
import React from 'react'
import { SortableTree } from '@/Tree/SortableTree'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import CreateTestCase from '@/components-client/CreateTestCase'
import { TestResultsApi } from '@/generated-api/apis/TestResultsApi'

const testResultClient = new TestResultsApi()

const testCasesClient = new TestCasesApi()
// File: pages/api/testCases.js
async function getTestResults(id: RequestInit | undefined) {
  const testResults = await testResultClient.testResultsGet(id)
  return testResults
}

export default async function page({ params }: { params: { id: string } }) {
  const featureUrl = `http://localhost:5000/features/${params.id}`
  // const updateUrl = `http://localhost:5000/features`
  const testCasesUrl = `http://localhost:5000/testCases/feature/${params.id}`
  const testResultsUrl = `http://localhost:5000/testResults/${params.id}`

  // const moveUrl = `http://localhost:5000/testCases/move`
  const featureRes = await fetch(featureUrl, { cache: 'no-store' })
  const feature = await featureRes.json()
  const testCasesRes = await fetch(testCasesUrl, { cache: 'no-store' })
  const testCases: TestCase[] = await testCasesRes.json()
  const testResultsRes = await fetch(testResultsUrl, { cache: 'no-store' })
  const testResults = await testResultsRes.json()
  console.log('testResults: ', testResults)

  // console.log('feature: ', feature)
  // console.log(testCases)

  // const testCaseIdsList = '6, 34'
  // const amountOfRowsToMove = 3
  // async function putFeature(formData: FormData) {
  //   'use server'
  //   await fetch(updateUrl, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       name: formData.get('name'),
  //       companyId: formData.get('companyId'),
  //       id: params.id,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //   revalidatePath(`/features/${params.id}/edit`)
  // }

  // async function moveTestCases(formData: FormData) {
  //   'use server'
  //   const testCaseIdsList = (formData.get('testCaseIdsList') || '') as string
  //   const amountOfRowsToMove = (formData.get('amountOfRowsToMove') ||
  //     '') as string

  //   const params = new URLSearchParams({
  //     testCaseIdsList,
  //     amountOfRowsToMove,
  //   })

  //   const moveUrlWithParams = `${moveUrl}?${params.toString()}`

  //   await fetch(moveUrlWithParams, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //   revalidatePath(`/features/${feature.id}/edit`)
  // }

  return (
    <div>
      <h2>Actions feature edit</h2>
      <SortableTree
        collapsible
        indicator
        removable
        testCases={testCases}
        testResults={testResults}
      />
      <CreateTestCase featureId={+params.id} />
    </div>
  )
}
