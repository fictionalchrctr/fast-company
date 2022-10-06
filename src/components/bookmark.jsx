import React from 'react'

const BookMark = ({ status, handleToggleBookmark, id }) => {
  return (
    <button
      className={'btn-sm border-0'}
      onClick={() => handleToggleBookmark(id)}
    >
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  )
}

export default BookMark
