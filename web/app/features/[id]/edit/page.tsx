import { revalidatePath } from 'next/cache'

export default async function page({ params }: { params: { id: string } }) {
  const url = `http://localhost:5000/features/${params.id}`
  const updateUrl = `http://localhost:5000/features`
  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()
  console.log('data: ', data)
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
  return (
    <div>
      <h2>Actions edit</h2>
      <form action={putFeature}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={data?.name} />
        <label htmlFor="companyId">companyId</label>
        <input type="text" name="companyId" defaultValue={data?.companyId} />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
