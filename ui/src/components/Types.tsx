export interface FeatureType {
  id: number
  name: string
  testCases: testCases[]
}

export interface testCases {
  id: number
  name: string
  description: string
  duration: number
  expectedResult: string
  operatingSystems: string
  prerequisites: string
  testSteps: testSteps[]
}

export interface testSteps {
  id: number
  name: string
}
