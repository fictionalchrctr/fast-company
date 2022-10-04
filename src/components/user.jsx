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
  handleDelete,
  handleToggleBookmark,
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
          key={_id}
          id={_id}
          handleToggleBookmark={handleToggleBookmark}
        />
      </td>
      <td>
        <button onClick={() => handleDelete(_id)} className='btn btn-danger'>
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
