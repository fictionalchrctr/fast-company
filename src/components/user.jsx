import React from 'react'
import Qalitie from './qualitie'
import BookMark from './bookmark'

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Qalitie key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark
          status={bookmark}
          id={_id}
          onToggleBookmark={onToggleBookmark}
        />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className='btn btn-danger'>
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
