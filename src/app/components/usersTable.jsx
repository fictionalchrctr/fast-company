import React from 'react'
import PropTypes from 'prop-types'
import User from './user'
import TableHeader from './tableHeader'

const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
  const columns = {
    name: { iterator: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    professions: { iterator: 'profession.name', name: 'Профессия' },
    completedMeetings: {
      iterator: 'completedMeetings',
      name: 'Встретился, раз'
    },
    rate: { iterator: 'rate', name: 'Оценка' },
    bookmark: { iterator: 'bookmark', name: 'Избранное' },
    delete: {}
  }
  return (
    <table className='table'>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...user} {...rest} />
        ))}
      </tbody>
    </table>
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable
