// Login.jsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../Slices/authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap()
      // Redirection selon le rôle
      if (result.user.role === 'teacher') {
        navigate('/teacher')
      } else if (result.user.role === 'student') {
        navigate('/student')
      } else {
        navigate('/') // fallback
      }
    } catch {
      alert('Login failed')
    }
  }

  return (
    <div className="col-md-4 offset-md-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login
