'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TestCase } from '@/generated-api/models/TestCase'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'

export default function CreatetestCase({ count = 1 }) {
  const [featureId, setFeatureId] = useState<TestCase['featureId'] | undefined>(
    0
  )

  const [name, setName] = useState<TestCase['name']>('')

  const testCasesClient = new TestCasesApi()

  const router = useRouter()

  async function createtestCase() {
    const response = await testCasesClient.testCasesPost({
      createTestCaseInput: { name, featureId: featureId ?? 0 },
    })

    setName('')
    setFeatureId(0)
    router.refresh()
  }

  return (
    <form>
      <h3>Create a new testCase</h3>
      <p>count: {count}</p>
      <input
        type="text"
        value={name?.toString()}
        onChange={(e) => setName(e.target.value)}
        placeholder="testCase name"
      />
      <input
        type="number"
        value={featureId !== undefined ? featureId : ''}
        onChange={(e) => setFeatureId(+e.target.value || 1)}
        placeholder="Company id"
      />

      <button type="button" onClick={createtestCase}>
        Create testCase
      </button>
    </form>
  )
}
