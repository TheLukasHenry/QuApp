async function getNote(todoId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    { next: { revalidate: 10 } }
  )
  const data = await res.json()
  return data
}

export default async function Todos({ params }: any) {
  const todo = await getNote(params.id)
  return (
    <div>
      Single Todo page
      <div>{todo.title}</div>
    </div>
  )
}
