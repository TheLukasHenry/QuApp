import React, { useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import * as ApiClient from './generatedClient/api'

const useCompanyUsers = () => {
  const apiClient = ApiClient.CompanyUsersApiFp()

  const { data: companyUsers, refetch: refetchCompanyUsers } = useQuery(
    'companyUsers',
    async () => {
      return []
    },
    { enabled: false }
  )

  const fetchCompanyUsers = async (companyId: number) => {
    const request = await apiClient.companyUsersCompanyCompanyIdGet(companyId)
    const response = await request(undefined, '')
    return response.data
  }

  return {
    companyUsers,
    fetchCompanyUsers,
    refetchCompanyUsers,
  }
}

export default function UsersCompanies() {
  const companyIdRef = useRef<HTMLInputElement>(null)
  const userIdRef = useRef<HTMLInputElement>(null)

  const { companyUsers, fetchCompanyUsers } = useCompanyUsers()

  return (
    <div>
      <h1>Company Users</h1>
      <ul>
        {companyUsers?.map((user: any) => (
          <li key={user.userID}>
            user name: {user.userName}, user id: {user.userID}
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="companyId"
        name="companyId"
        placeholder="Company ID"
        ref={companyIdRef}
      />
      <input
        type="text"
        id="userId"
        name="userId"
        placeholder="User ID"
        ref={userIdRef}
      />
      <button
        onClick={async () => {
          const companyId = companyIdRef.current
          if (!companyId) {
            return
          }
          const users = await fetchCompanyUsers(+companyId.value)
          console.log(users)
        }}
      >
        Get Company Users
      </button>
    </div>
  )
}
