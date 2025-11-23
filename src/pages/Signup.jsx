// Signup.jsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signupUser } from '../Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(signupUser({ name, email, password, role })).unwrap()
      // Redirection selon le rôle
      if (result.user.role === 'teacher') {
        navigate('/teacher')
      } else if (result.user.role === 'student') {
        navigate('/student')
      } else {
        navigate('/')
      }
    } catch {
      alert('Signup failed')
    }
  }

  return (
    <>
      <Navbar />
      <div className="col-md-4 offset-md-4">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </div>
    </>
  )
}

export default Signup
