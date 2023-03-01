import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
// import * as yup from 'yup'

const LoginForm = () => {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const { logIn } = useAuth()
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)
  const handleChange = (target) => {
    console.log(target)
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
    setEnterError(null)
  }
  // console.log(process.env)

  // ВАЛИДАЦИЯ ЧЕРЕЗ YUP

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required('Пароль обязателен для заполнения')
  //     .matches(
  //       /(?=.*[A-Z])/,
  //       'Пароль должен содержать хотя бы одну заглавную букву'
  //     )
  //     .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
  //     .matches(
  //       /(?=.*[!@#$%^&*])/,
  //       'Пароль должен содержать один из специальных символов !@#$%^&*'
  //     )
  //     .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
  //   email: yup
  //     .string()
  //     .required('Электронная почта обязательная для заполнения')
  //     .email('Email введён некорректно')
  // })

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательная для заполнения' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    // validateScheme
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((error) => setErrors({ [error.path]: error.message }))
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValidForButton = Object.keys(errors).length === 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
    try {
      await logIn(data)
      history.push(
        history.location.state ? history.location.state.from.pathname : '/'
      )
      console.log()
    } catch (error) {
      setEnterError(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Электронная почта'
        // type='text'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
      </CheckBoxField>
      {enterError && <p className='text-danger'>{enterError}</p>}
      <button
        type='submit'
        disabled={!isValidForButton || enterError}
        className='btn btn-primary w-100 mx-auto'
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
