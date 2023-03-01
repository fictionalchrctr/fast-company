import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const LogOut = () => {
  const { logOut } = useAuth()
  useEffect(() => {
    logOut()
  }, []) // вызываем только в момент монтирования
  return <h1>Loading</h1>
}

export default LogOut
