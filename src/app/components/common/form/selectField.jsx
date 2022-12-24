import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  defaultOption,
  options,
  error,
  onChange
}) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options
  return (
    <div className='mb-4'>
      <label htmlFor='profession' className='form-label'>
        {label}
      </label>
      <select
        className={getInputClasses()}
        id='profession'
        name='profession'
        value={value} // data.profession
        onChange={onChange} // handleChange
      >
        <option disabled value=''>
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              value={option.value} // professions[professionName]._id
              key={option.value} // professions[professionName]._id
            >
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  onChange: PropTypes.func
}

export default SelectField
