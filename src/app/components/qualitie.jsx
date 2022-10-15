import React from 'react'
import PropTypes from 'prop-types'

const Qalitie = ({ color, name, _id }) => {
  return (
    <span className={'badge m-1 bg-' + color} key={_id}>
      {name}
    </span>
  )
}
Qalitie.propTypes = {
  color: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.any.isRequired
}
export default Qalitie
