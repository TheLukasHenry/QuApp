async function getNote(featureId: string) {
  const res = await fetch(`http://localhost:5000/features/${featureId || ''}`, {
    next: { revalidate: 10 },
  })
  const data = await res.json()
  return data
}

export default async function Todos({ params }: any) {
  const todo = await getNote(params.featureId)
  return (
    <div>
      Single Feature page
      <div>{todo.featureId}</div>
    </div>
  )
}
