import Link from 'next/link'

async function getBlob() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos',

    { cache: 'no-store' }
  )
  const data = await res.json()
  return data as any[]
}

export default async function Todos() {
  const todos = await getBlob()
  return (
    <div>
      Todo page
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
