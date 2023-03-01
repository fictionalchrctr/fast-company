import { orderBy } from 'lodash'
import React from 'react'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
  const { comments, createComment, removeComment } = useComments()

  const handleSubmit = (data) => {
    createComment(data)
    // api.comments
    //   .add({ ...data, pageId: userId }) // передаём данные из формы и передаём pageId, чтобы зафиксировать на какой странице этот комментарий должен тображаться
    //   .then((data) => setComments([...comments, data])) // обновляем текущие данные комментариев (комментарии плюс новые комментарии (data))
  }
  const handleRemoveComment = (id) => {
    removeComment(id)
    // api.comments.remove(id).then((id) => {
    //   setComments(comments.filter((x) => x._id !== id))
    // })
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc']) // комментарии необходимо отстортировать с помощью метода из лодаша
  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment} // если хранить состояние комментария здесь, а не в comment.jsx, то мы поймаем его удаление, обновим наши данные и тем самым отображение тоже обновится
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
