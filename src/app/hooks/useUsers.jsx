import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userService from '../service/userService'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'

const UserContext = React.createContext()

export const UseUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]) // данные приходят с сервера как массив
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users] // по индексу обновляем наших пользователей
      const indexUser = newUsers.findIndex(
        (user) => user._id === currentUser._id
      )
      newUsers[indexUser] = currentUser
      setUsers(newUsers)
    }
  }, [currentUser])

  function getUserById(userId) {
    return users.find((user) => user._id === userId)
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : <h1>Qualities Loading...</h1>}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider
