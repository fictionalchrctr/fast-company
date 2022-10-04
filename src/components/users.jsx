import React from 'react'
import User from './user'

const Users = ({ users, handleDelete, handleToggleBookmark }) => {
  return (
    <>
      {users.length > 0 && (
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
            {users.map((user) => (
              <User
                key={user._id}
                {...user}
                handleDelete={handleDelete}
                handleToggleBookmark={handleToggleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users

// import React, { useState } from 'react'
// import api from '../api'

// const Users = () => {
//   const [users, setUsers] = useState(api.users.fetchAll())
//   const handleDelete = (userId) => {
//     setUsers((prevState) => prevState.filter((user) => user !== userId))
//   }
//   const renderPhrase = (number) => {
//     if (!number) {
//       return (
//         <span className='badge bg-danger'>
//           Сегодня с тобой никто не тусанёт
//         </span>
//       )
//     } else {
//       if (number <= 4 && number >= 2) {
//         return (
//           <span className='badge bg-primary'>
//             {number} человека тусанёт с тобой сегодня
//           </span>
//         )
//       } else {
//         return (
//           <span className='badge bg-primary'>
//             {number} человек тусанёт с тобой сегодня
//           </span>
//         )
//       }
//     }
//   }
//   if (users.length === 0) {
//     return renderPhrase()
//   }

//   return (
//     <>
//       <h1>{renderPhrase(users.length)}</h1>
//       <table className='table'>
//         <thead>
//           <tr>
//             <th scope='col'>Имя</th>
//             <th scope='col'>Качества</th>
//             <th scope='col'>Профессия</th>
//             <th scope='col'>Встретился (раз)</th>
//             <th scope='col'>Оценка</th>
//             <th scope='col'>Избранное</th>
//             <th scope='col'></th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => {
//             return (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>
//                 {user.qualities.map((quality) => {
//                   return (
//                     <span
//                       className={`badge m-1 bg-` + quality.color}
//                       key={quality._id}
//                     >
//                       {quality.name}
//                     </span>
//                   )
//                 })}
//                 </td>
//                 <td>{user.profession.name}</td>
//                 <td>{user.completedMeetings}</td>
//                 <td>{user.rate}/5</td>
//                 <td>
//                   <i class='bi bi-bookmark'></i>
//                 </td>
//                 <td>
//                   <button
//                     className='btn btn-danger btn-sm m-1'
//                     onClick={() => handleDelete(user)}
//                     key={user.userId}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </>
//   )
// }

// export default Users
