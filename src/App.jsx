import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import CoursePage from './pages/CoursePage'
import QuizTake from './pages/QuizTake'

function App() {
  const { token, user } = useSelector(state => state.auth)

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
          <Route path="/teacher" element={token && user?.role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />} />
          <Route path="/student" element={token && user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />
          <Route path="/courses/:id" element={token ? <CoursePage /> : <Navigate to="/login" />} />
          <Route path="/quizzes/:id" element={token ? <QuizTake /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
