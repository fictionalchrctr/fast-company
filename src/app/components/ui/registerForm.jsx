import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male'
  })
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  const handleChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательная для заполнения' },
      isEmail: { message: 'Email введён некорректно' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValidForButton = Object.keys(errors).length === 0

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
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
      <SelectField
        label='Выберите вашу профессию'
        value={data.profession}
        defaultOption='Choose...'
        options={professions}
        error={errors.profession}
        onChange={handleChange}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
      />
      <button
        type='submit'
        disabled={!isValidForButton}
        className='btn btn-primary w-100 mx-auto'
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
