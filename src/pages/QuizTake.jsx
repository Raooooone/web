import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { submitQuiz } from '../Slices/quizSlice'
import API from '../services/api'

function QuizTake() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    API.get(`/quizzes/${id}`).then(res => setQuiz(res.data))
  }, [id])

  const handleChange = (qId, optionId) => {
    setAnswers(prev => ({ ...prev, [qId]: optionId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(submitQuiz({ quizId: id, answers }))
    alert('Quiz submitted!')
  }

  if (!quiz) return <p>Loading...</p>

  return (
    <div>
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map(q => (
          <div key={q.id} className="mb-3">
            <p>{q.text}</p>
            {q.options.map(opt => (
              <div className="form-check" key={opt.id}>
                <input className="form-check-input" type="radio" name={`q-${q.id}`} onChange={() => handleChange(q.id, opt.id)} />
                <label className="form-check-label">{opt.text}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-success">Submit Quiz</button>
      </form>
    </div>
  )
}

export default QuizTake
