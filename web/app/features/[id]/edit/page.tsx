import { revalidatePath } from 'next/cache'
import { TestCase } from '@/generated-api'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'
import React from 'react'
import { SortableTree } from '@/Tree/SortableTree'

const testCasesClient = new TestCasesApi()
// File: pages/api/testCases.js

export default async function page({ params }: { params: { id: string } }) {
  const featureUrl = `http://localhost:5000/features/${params.id}`
  const updateUrl = `http://localhost:5000/features`
  const testCasesUrl = `http://localhost:5000/testCases/feature/${params.id}`
  const moveUrl = `http://localhost:5000/testCases/move`
  const featureRes = await fetch(featureUrl, { cache: 'no-store' })
  const feature = await featureRes.json()
  const testCasesRes = await fetch(testCasesUrl, { cache: 'no-store' })
  const testCases: TestCase[] = await testCasesRes.json()

  console.log('feature: ', feature)
  console.log(testCases)

  // const testCaseIdsList = '6, 34'
  // const amountOfRowsToMove = 3
  async function putFeature(formData: FormData) {
    'use server'
    await fetch(updateUrl, {
      method: 'PUT',
      body: JSON.stringify({
        name: formData.get('name'),
        companyId: formData.get('companyId'),
        id: params.id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    revalidatePath(`/features/${params.id}/edit`)
  }

  async function moveTestCases(formData: FormData) {
    'use server'
    const testCaseIdsList = (formData.get('testCaseIdsList') || '') as string
    const amountOfRowsToMove = (formData.get('amountOfRowsToMove') ||
      '') as string

    const params = new URLSearchParams({
      testCaseIdsList,
      amountOfRowsToMove,
    })

    const moveUrlWithParams = `${moveUrl}?${params.toString()}`

    await fetch(moveUrlWithParams, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    revalidatePath(`/features/${feature.id}/edit`)
  }

  return (
    <div>
      <h2>Actions feature edit</h2>
      <SortableTree collapsible indicator removable testCases={testCases} />
      {/* <form action={putFeature}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={feature?.name} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={feature?.companyId} />

        <button type="submit">Save</button>
      </form> */}
      {/* <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">TestCases</h2>
        <form action={moveTestCases} className="grid grid-cols-2 gap-4"> */}
      {/* <div>
            <label htmlFor="testCaseIdsList" className="block text-gray-700">
              testCaseIdsList
            </label>
            <input
              type="text"
              name="testCaseIdsList"
              defaultValue={''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="amountOfRowsToMove" className="block text-gray-700">
              amountOfRowsToMove
            </label>
            <input
              type="text"
              name="amountOfRowsToMove"
              defaultValue={0}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div> */}
      {/* <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">TestCases</h2>
        <form action={moveTestCases} className="grid grid-cols-5 gap-4">
          <h2 className="col-span-5 text-2xl font-bold mb-4">TestCases List</h2>

          <div className="font-bold text-gray-700">ID</div>
          <div className="font-bold text-gray-700">Name</div>
          <div className="font-bold text-gray-700">Feature ID</div>
          <div className="font-bold text-gray-700">Sort Order</div>
          <div className="font-bold text-gray-700">Offset</div>

          {testCases.map((testCase) => (
            <React.Fragment key={testCase.id}>
              <input
                type="text"
                name="id"
                defaultValue={testCase?.id}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="name"
                defaultValue={testCase?.name ?? ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="featureId"
                defaultValue={testCase?.featureId}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="sortOrder"
                defaultValue={testCase?.sortOrder}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="offset"
                defaultValue={testCase?.offset}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </React.Fragment>
          ))}

          <button
            type="submit"
            className="col-span-5 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div> */}
    </div>
  )
}
