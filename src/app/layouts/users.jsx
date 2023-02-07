import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
  const params = useParams()
  const userId = params.userId
  const edit = params.edit
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  )
}

export default Users
