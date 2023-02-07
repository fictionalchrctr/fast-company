import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../service/professiomService'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfession = () => {
  return useContext(ProfessionContext)
}

const ProfessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true) // проверка на загрузку в самих компонентах
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getProfessionList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function getProfession(id) {
    return professions.find((profession) => profession._id === id)
  }

  async function getProfessionList() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
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
    <ProfessionContext.Provider
      value={{ professions, isLoading, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProfessionProvider
