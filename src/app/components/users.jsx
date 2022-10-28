import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import api from '../api'
import GroupList from './groupList'
import PropTypes from 'prop-types'
import User from './user'
import SearchStatus from './searchStatus'

const Users = ({ users, onDelete, onToggleBookmark }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()

  const pageSize = 2 // по 4 пользователя на каждой странице

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
  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users
  const count = filteredUsers.length

  const userCrop = paginate(filteredUsers, currentPage, pageSize) // разбиение пользователей на страницы

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
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Имя</th>
                <th scope='col'>Качества</th>
                <th scope='col'>Профессия</th>
                <th scope='col'>Встретился, раз</th>
                <th scope='col'>Оценка</th>
                <th scope='col'>Избранное</th>
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
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export default Users
