import { revalidatePath } from 'next/cache'
import { TestCase } from '@/generated-api'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'

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
      {/* <form action={putFeature}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={feature?.name} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={feature?.companyId} />

        <button type="submit">Save</button>
      </form> */}
      <h2>TestCases</h2>
      <form action={moveTestCases}>
        <label htmlFor="testCaseIdsList">testCaseIdsList</label>
        <input type="text" name="testCaseIdsList" defaultValue={''} />
        <label htmlFor="amountOfRowsToMove">amountOfRowsToMove</label>
        <input type="text" name="amountOfRowsToMove" defaultValue={0} />

        {/* {testCases.map((testCase) => (
          // <p key={testCase.id}>hello</p>
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={testCase?.name ?? ''}
            />
            <label htmlFor="featureId">featureId</label>
            <input
              type="text"
              name="featureId"
              defaultValue={testCase?.featureId}
            />

          </>
        ))} */}

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
