import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../service/commentService'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

const CommentsProvider = ({ children }) => {
  const { userId } = useParams() // из параметров url забираем userId
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true) // проверка на загрузку в самих компонентах
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
  }, [userId]) // меняем комментарии в зависимости от того когда переходим с одной страницы пользователя на другую

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function createComment(data) {
    console.log(data)
    const comment = {
      ...data,
      _id: nanoid(), // id комментария
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
    }
  }
  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id)
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        )
      }
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, getComments, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CommentsProvider
