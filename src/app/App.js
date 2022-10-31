import React, { useState, useEffect } from 'react'
import Users from './components/users'
import api from './api'

function App() {
  const [users, setUsers] = useState() // App

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookmark = (userId) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  return (
    <div>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      )}
    </div>
  )
}

export default App
