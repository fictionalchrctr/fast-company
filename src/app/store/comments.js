import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../service/commentService'
import { getCurrenUserId } from './users'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    // обработка запроса на сервер
    commentsRequested: (state) => {
      state.isLoading = true
    },
    // обработка успешного результата
    commentsRecieved: (state, action) => {
      state.entities = action.payload // это и есть наши comments
      state.isLoading = false
    },
    // обработка не успешного результата
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      )
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsRecieved,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions

const addCommentRequested = createAction('comments/addCommentRequested')
const removeCommentRequested = createAction('comments/removeCommentRequested')

export function loadCommentsList(userId) {
  return async function (dispatch) {
    dispatch(commentsRequested())
    try {
      const { content } = await commentService.getComments(userId)
      console.log(content)
      dispatch(commentsRecieved(content))
    } catch (error) {
      dispatch(commentsRequestFailed(error.message))
    }
  }
}

export function createComment(payload) {
  return async function (dispatch, getState) {
    dispatch(addCommentRequested(payload))
    const comment = {
      ...payload,
      _id: nanoid(), // id комментария
      created_at: Date.now(),
      userId: getCurrenUserId()(getState())
    }
    try {
      const { content } = await commentService.createComment(comment)
      dispatch(commentCreated(content))
    } catch (error) {
      dispatch(commentsRequestFailed(error.message))
    }
  }
}

export function removeComment(commentId) {
  return async function (dispatch) {
    try {
      dispatch(removeCommentRequested())
      const { content } = await commentService.removeComment(commentId)
      if (content === null) {
        dispatch(commentRemoved(commentId))
      }
    } catch (error) {
      dispatch(commentsRequestFailed(error.message))
    }
  }
}

// селекторы
export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
