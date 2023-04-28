import React, { useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import * as ApiClient from './generatedClient/api'

const useUsers = () => {
  const apiClient = new ApiClient.UsersApi()

  const {
    data: users,
    isLoading: loadingUsers,
    refetch: refetchUsers,
  } = useQuery<ApiClient.User[], Error>('users', async () => {
    const response = await apiClient.usersGet()
    return response.data as unknown as ApiClient.User[]
  })

  const createUserMutation = useMutation(
    async (input: ApiClient.CreateUserInput) => {
      await apiClient.usersPost(input)
    },
    {
      onSuccess: () => {
        refetchUsers()
      },
    }
  )

  const updateUserMutation = useMutation(
    async (input: ApiClient.UpdateUserInput) => {
      await apiClient.usersPut({ ...input })
    },
    {
      onSuccess: () => {
        refetchUsers()
      },
    }
  )

  const deleteUserMutation = useMutation(
    async (userID: number) => {
      await apiClient.usersIdDelete(userID)
    },
    {
      onSuccess: () => {
        refetchUsers()
      },
    }
  )

  const isError = (error: any): error is Error => error instanceof Error

  const createUser = (input: ApiClient.CreateUserInput) => {
    createUserMutation.mutate(input)
  }

  const updateUser = (input: ApiClient.UpdateUserInput) => {
    updateUserMutation.mutate({ ...input })
  }

  const deleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  }

  const getUser = (id: number) => {
    return (users || []).find((u: ApiClient.User) => u.userID === id)
  }

  return {
    users,
    loadingUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    user: createUserMutation.data || updateUserMutation.data,
    userError:
      createUserMutation.error ||
      updateUserMutation.error ||
      deleteUserMutation.error,
    userErrorMessage: isError(createUserMutation.error)
      ? createUserMutation.error.message
      : isError(updateUserMutation.error)
      ? updateUserMutation.error.message
      : '',
    userLoading:
      createUserMutation.isLoading ||
      updateUserMutation.isLoading ||
      deleteUserMutation.isLoading,
    refetchUsers,
  }
}

export default function Users() {
  const userNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const userIDRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const {
    users,
    loadingUsers,
    updateUser,
    deleteUser,
    createUser,
    getUser,
    userErrorMessage,
    userLoading,
  } = useUsers()

  if (loadingUsers) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user: ApiClient.User) => (
          <li key={user.userID}>
            user name: {user.userName}, user id: {user.userID}, email:{' '}
            {user.email}, passwordHash: {user.passwordHash},
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="User name"
        ref={userNameRef}
      />
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Email address"
        ref={emailRef}
      />
      <input
        type="text"
        id="userID"
        name="userID"
        placeholder="User ID"
        ref={userIDRef}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        ref={passwordRef}
      />
      <button
        onClick={() => {
          const userName = userNameRef.current
          const email = emailRef.current
          const userID = userIDRef.current
          const password = passwordRef.current
          if (!userName || !email || !userID || !password) {
            return
          }
          updateUser({
            userID: +userID.value,
            userName: userName.value.toString(),
            email: email.value.toString(),
            password: password.value.toString(),
          })
        }}
      >
        Update User
      </button>
      <button
        onClick={() => {
          const userName = userNameRef.current
          const email = emailRef.current
          const password = passwordRef.current
          if (!userName || !email || !password) {
            return
          }
          createUser({
            userName: userName.value.toString(),
            email: email.value.toString(),
            password: password.value.toString(),
          })
        }}
      >
        Create User
      </button>
      <button
        onClick={() => {
          const userID = userIDRef.current
          if (!userID) {
            return
          }
          deleteUser(+userID.value)
        }}
      >
        Delete User
      </button>
      <button
        onClick={() => {
          const userID = userIDRef.current
          if (!userID) {
            return
          }
          const user = getUser(+userID.value)
          if (user) {
            console.log(user)
          }
        }}
      >
        Get User
      </button>
      {userErrorMessage && <div>Error: {userErrorMessage}</div>}

      {userLoading && <div>Updating user...</div>}
    </div>
  )
}
