import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, onToggleBookmark, id }) => {
  return (
    <button className={'btn-sm border-0'} onClick={() => onToggleBookmark(id)}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  )
}
BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  id: PropTypes.any.isRequired
}

export default BookMark
