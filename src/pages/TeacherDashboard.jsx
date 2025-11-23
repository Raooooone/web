import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, createCourse } from '../Slices/courseSlice'

function TeacherDashboard() {
  const dispatch = useDispatch()
  const { courses } = useSelector(state => state.courses)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    await dispatch(createCourse({ title, description }))
    setTitle('')
    setDescription('')
  }

  return (
    <div>
      <h2>Teacher Dashboard</h2>

      <form onSubmit={handleCreateCourse} className="mb-4">
        <div className="mb-3">
          <input className="form-control" placeholder="Course Title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Course Description" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <button className="btn btn-success">Create Course</button>
      </form>

      <h3>Your Courses</h3>
      <ul className="list-group">
        {courses.map(course => (
          <li className="list-group-item" key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TeacherDashboard
