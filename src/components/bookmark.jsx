import React from 'react'

const BookMark = ({ status, handleToggleBookmark, id }) => {
  return (
    <button
      onClick={() => handleToggleBookmark(id)}
      className={
        'bi btn-sm border-0 ' +
        (status ? 'bi-bookmark-heart-fill' : 'bi-bookmark')
      }
    ></button>
  )
}

export default BookMark
