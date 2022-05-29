import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TestCase } from './Types'
import { useTestCases } from '../testCases/useTestCases'
import { Error } from './Error'
import { Loading } from './Loading'


type TestCaseCardProps = {
  testCase: TestCase
  featureId: string | undefined
}

export const TestCaseCard: React.FC<TestCaseCardProps> = (props) => {
  const { testCase, featureId } = props

  const { removeTestCase, testCasesError, testCasesLoading } = useTestCases(testCase.id?.toString())

  return (
    <Card className={'col-lg-4 col-md-6 col-xs-12 testCaseCard shadow'}>
      <Card.Body>
        <Card.Title className="text-center mb-4">{testCase.name}</Card.Title>
        <Card.Text>description: {testCase.description}</Card.Text>

        <Button variant='primary' className="m-1">
          Open
        </Button>
        <Button
          onClick={() => {
            removeTestCase({ variables: { testCaseId: `${testCase.id}` } })
          }}
          className="m-1"
        >
          Delete
        </Button>
        <Button variant='primary' className="m-1">
          <Link className='text-light text-decoration-none' to={`/features/${featureId}/addTestCase/${testCase?.id}`}>
            Edit
          </Link>{' '}
        </Button>
      </Card.Body>
      {testCasesError && <Error >
          {testCasesError}
          </Error>}
      {testCasesLoading && <Loading />}
    </Card>
  )
}

export default TestCaseCard
