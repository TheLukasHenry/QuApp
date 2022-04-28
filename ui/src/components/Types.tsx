export interface FeatureType {
  id: number
  name: string
  description?: string
  testCases: TestCase[]
}

export interface TestCase {
  id: number
  name: string
  description: string
  duration: number
  expectedResult: string
  operatingSystems: string
  prerequisites: string
  testSteps: testSteps[]
  feature: number
}

export interface testSteps {
  id: number
  name: string
}
