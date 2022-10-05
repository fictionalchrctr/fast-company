import React from 'react'

const BookMark = ({ status, handleToggleBookmark, id }) => {
  const classNames = (bookmark) => {
    if ((bookmark = false)) return 'bi-bookmark-heart-fill'
    else return 'bi-bookmark'
  }
  return (
    <button
      onClick={() => handleToggleBookmark(id)}
      className={`bi btn-sm border-0  + ${classNames(status)}`}
    ></button>
  )
}

export default BookMark
