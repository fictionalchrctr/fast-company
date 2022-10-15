import React from 'react'
import Qalitie from './qualitie'
import BookMark from './bookmark'
import PropTypes from 'prop-types'

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark
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
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  )
}
User.propTypes = {
  _id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.any.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export default User
