import Link from 'next/link'
// import CreateTodo from './CreateTodo'
import { FeaturesApi } from '../../generated-api/apis/FeaturesApi'

const featuresClient = new FeaturesApi()

// Use the API client to make a request
async function getFeatures() {
  const response = await featuresClient.featuresGet()
  console.log(response)
  return response
}

async function getBlob() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10',

    { cache: 'no-store' }
  )
  const data = await res.json()
  return data as any[]
}

export default async function Todos() {
  const todos = await getBlob()
  const features = await getFeatures()
  return (
    <div>
      Features
      {features.map((feature) => {
        return <Feature key={feature.featureID} feature={feature} />
      })}
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />
      })}
    </div>
  )
}

function Todo({ todo }: any) {
  const { id, title, userId } = todo || {}
  return (
    <Link href={`/todos/${id}`}>
      <div>
        <div>
          {title}, {userId}
        </div>
      </div>
    </Link>
  )
}

function Feature({ feature }: any) {
  const { featureId, featureName } = feature || {}
  return (
    <Link href={`/todos/${featureId}`}>
      <div>
        <div>{featureName}</div>
      </div>
    </Link>
  )
}
