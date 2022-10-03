import React from 'react'
import Qalitie from './qualitie'

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  handleDelete,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{qualities.map(<Qalitie />)}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <button className='bi bi-bookmark btn-sm border-0'></button>
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
