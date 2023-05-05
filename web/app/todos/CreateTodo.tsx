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

'use client'

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateNote() {
  const [title, setTitle] = useState('')
  // const [content, setContent] = useState('')

  const router = useRouter()

  const create = async () => {
    // const db = new PocketBase('http://127.0.0.1:8090');

    // await db.records.create('notes', {
    //   title,
    //   content,
    // });

    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
        // content,
      }),
    })

    // setContent('')
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
      {/* <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /> */}
      <button type="submit">Create note</button>
    </form>
  )
}
