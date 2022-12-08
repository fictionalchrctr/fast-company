import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import api from '../api'
import GroupList from './groupList'
import PropTypes from 'prop-types'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iterator: 'name', order: 'asc' })

  const pageSize = 8 // по pageSize пользователя на каждой странице

  const [users, setUsers] = useState() // App

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookmark = (userId) => {
    setUsers(
      users.map((user) => {
        if (user._id === userId) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  // useEffect вызывается каждый раз когда мы монтируем что-то в DOM
  // хук useEffect нужен для отслеживания различных этапов компонента (монтирование в DOM, изменение, удаление)

  useEffect(() => {
    // console.log('send request')
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  // внутри [] может быть параметр за которым необходимо наблюдать
  // если [] присутствует, то функция внутри useEffect вызывается один раз при первом монтировании компонента в DOM
  // если [] отстутствует, то функция внутри useEffect вызывается каждый раз при обновлении/изменении компонента

  // useEffect(() => {
  //   console.log(professions)
  // }, [professions])

  const handleProffesionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users
    const count = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize) // разбиение пользователей на страницы

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className='d-flex'>
        {professions && (
          <div className='d-flex flex-column flex-shrink-0 p-3'>
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProffesionSelect}
              // contentProperty='name'
              // valueProperty='_id'
            />
            <button className='btn btn-secondary mt-2' onClick={clearFilter}>
              {' '}
              Сброс{' '}
            </button>
          </div>
        )}
        <div className='d-flex flex-column'>
          <SearchStatus length={count} />
          {count > 0 && (
            <UsersTable
              onSort={handleSort}
              users={userCrop}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}
UsersList.propTypes = {
  users: PropTypes.array
}

export default UsersList
