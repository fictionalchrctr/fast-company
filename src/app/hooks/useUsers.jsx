import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userService from '../service/userService'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

export const UseUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]) // данные приходят с сервера как массив
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getUsers() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  return (
    <UserContext.Provider value={{ users }}>
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
