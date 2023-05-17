'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TestCase } from '@/generated-api/models/TestCase'
import { TestCasesApi } from '@/generated-api/apis/TestCasesApi'

export default function CreatetestCase(featureId: number) {
  // const [featureId, setFeatureId] = useState<TestCase['featureId'] | undefined>(
  //   0
  // )

  const [name, setName] = useState<TestCase['name']>('')

  const testCasesClient = new TestCasesApi()

  const router = useRouter()

  async function createtestCase() {
    const response = await testCasesClient.testCasesPost({
      createTestCaseInput: { name, featureId },
    })

    setName('')
    router.refresh()
  }

  return (
    <form>
      <h3>Create a new testCase</h3>
      <input
        type="text"
        value={name?.toString()}
        onChange={(e) => setName(e.target.value)}
        placeholder="testCase name"
      />

      <button type="button" onClick={createtestCase}>
        Create testCase
      </button>
    </form>
  )
}
