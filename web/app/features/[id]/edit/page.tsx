import { revalidatePath } from 'next/cache'
import { TestCase } from '@/generated-api'
// File: pages/api/testCases.js

import sql from 'mssql'

export async function handler(req, res) {
  const config = {
    user: 'Id=sa',
    password: 'mssql1Ipw',
    server: 'localhost',
    database: 'main',
    port: 1433,
  }

  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config)

    const result = await sql.query`SELECT * FROM testCases;`

    res.status(200).json(result.recordset)
  } catch (err) {
    // ... error checks
    console.log(err)
    res.status(500).json({ error: 'Error connecting to database' })
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const featureUrl = `http://localhost:5000/features/${params.id}`
  const updateUrl = `http://localhost:5000/features`
  const testCasesUrl = `http://localhost:5000/testCases/feature/${params.id}`
  const featureRes = await fetch(featureUrl, { cache: 'no-store' })
  const feature = await featureRes.json()
  const testCasesRes = await fetch(testCasesUrl, { cache: 'no-store' })
  const testCases: TestCase[] = await testCasesRes.json()
  // const testCasesDbRes  = await fetch(`http://localhost:1433`)
  // write the testCasesDbRes to accept SQL query
  const testCasesDbRes = await fetch(
    `http://localhost:1433/?query=SELECT * FROM testCases;`
  )
  const testCasesDb = await testCasesDbRes.json()

  console.log('testCasesDb: ', testCasesDb)
  // console.log('feature: ', feature)
  // console.dir(testCases)
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
    await fetch(testCasesUrl, {
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
  return (
    <div>
      <h2>Actions feature edit</h2>
      <form action={putFeature}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={feature?.name} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={feature?.companyId} />

        <button type="submit">Save</button>
      </form>
      <h2>TestCases</h2>

      {/* <form action={moveTestCases}>
        {testCases.map((testCase) => (
          <div key={testCase.id}> 
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
          <div/>
        )
        )
        }

        <button type="submit">Save</button>
      </form> */}
    </div>
  )
}
