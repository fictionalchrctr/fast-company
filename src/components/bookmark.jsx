import React from 'react'

const BookMark = ({ status, onToggleBookmark, id }) => {
  return (
    <button className={'btn-sm border-0'} onClick={() => onToggleBookmark(id)}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  )
}

export default BookMark
