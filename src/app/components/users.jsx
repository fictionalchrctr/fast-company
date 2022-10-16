import React, { useState } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import api from '../api'
import GroupList from './groupList'
import PropTypes from 'prop-types'
import User from './user'

const Users = ({ users, onDelete, onToggleBookmark }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions] = useState(api.professions.fetchAll())
  const count = users.length
  const pageSize = 4

  const handleProffesionSelect = (params) => {
    console.log(params)
  }
  console.log(professions)
  const handlePageChange = (pageIndex) => {
    console.log('page: ', pageIndex)
    setCurrentPage(pageIndex)
  }
  const userCrop = paginate(users, currentPage, pageSize)
  return (
    <>
      <GroupList items={professions} onItemSelect={handleProffesionSelect} />
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                {...user}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {/* 1,2,3 */}
      {/* users/pageSize */}
    </>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export default Users
