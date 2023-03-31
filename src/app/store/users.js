import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../service/authService'
import localStorageService from '../service/localStorageService'
import userService from '../service/userService'
import history from '../utils/history' // выполнение редиректа после успешного выполнения формы
import randomInt from '../utils/randomInt'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // обработка запроса на сервер
    usersRequested: (state) => {
      state.isLoading = true
    },
    // обработка успешного результата
    usersRecieved: (state, action) => {
      state.entities = action.payload // это и есть наши professions
      state.dataLoaded = true
      state.isLoading = false
    },
    // обработка не успешного результата
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      // т.к. state.entities по умолчанию null, могут возникать ошибки при вызове push
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.auth = null
      state.isLoggedIn = false
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => (u._id = action.payload._id))
      ] = action.payload
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersRecieved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export function logIn({ payload, redirect }) {
  return async function (dispatch) {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.logIn({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      history.push(redirect)
    } catch (error) {
      dispatch(authRequestFailed(error.message))
    }
  }
}

export function signUp({ email, password, ...rest }) {
  return async function (dispatch) {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      )
    } catch (error) {
      dispatch(authRequestFailed(error.mesage))
    }
  }
}

export function logOut() {
  return async function (dispatch) {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
  }
}

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (error) {
      dispatch(createUserFailed(error.message))
    }
  }
}

export function loadUsersList() {
  return async function (dispatch) {
    dispatch(usersRequested())
    try {
      const { content } = await userService.get()
      console.log(content)
      dispatch(usersRecieved(content))
    } catch (error) {
      dispatch(usersRequestFailed(error.message))
    }
  }
}

export function updateUser(payload) {
  return async function (dispatch) {
    dispatch(userUpdateRequested())
    try {
      const { content } = await userService.update(payload)
      dispatch(userUpdateSuccessed(content))
      history.push(`/users/${content._id}`)
    } catch (error) {
      dispatch(userUpdateFailed(error.message))
    }
  }
}

// селекторы
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}
export const getUsersList = () => (state) => state.users.entities
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCurrenUserId = () => (state) => state.users.auth.userId
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}

export default usersReducer
