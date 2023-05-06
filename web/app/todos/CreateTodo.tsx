// 'use client'

// import { useRouter } from 'next/navigation'
// import React from 'react'

// export default function CreateTodo() {
//   const [title, setTitle] = React.useState('')
//   const [userId, setUserId] = React.useState('')

//   const router = useRouter()

//   const create = async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
//       method: 'POST',
//       body: JSON.stringify({ title, userId, completed: false }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })

//     const newTodo = await res.json()

//     const res2 = await fetch(
//       `https://jsonplaceholder.typicode.com/todos/${newTodo.id}`
//     )
//     const createdTodo = await res2.json()

//     console.log(createdTodo)

//     setTitle('')
//     setUserId('')

//     router.refresh()
//   }

//   return (
//     <form onSubmit={create}>
//       <h3>Create todo</h3>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="title"
//       />
//       <input
//         type="text"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         placeholder="User id"
//       />
//       <button type="submit">Create</button>
//     </form>
//   )
// }

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateNote() {
  const [title, setTitle] = useState('')

  const router = useRouter()

  const create = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    })
    setTitle('')

    router.refresh()
  }

  return (
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Create note</button>
    </form>
  )
}
