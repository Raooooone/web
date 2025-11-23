import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizzes } from '../Slices/quizSlice'

function CoursePage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { quizzes } = useSelector(state => state.quizzes)

  useEffect(() => {
    dispatch(fetchQuizzes(id))
  }, [dispatch, id])

  return (
    <div>
      <h2>Course Quizzes</h2>
      <ul className="list-group">
        {quizzes.map(quiz => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={quiz.id}>
            {quiz.title} (Deadline: {quiz.deadline})
            <Link to={`/quizzes/${quiz.id}`} className="btn btn-sm btn-primary">Take Quiz</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CoursePage
