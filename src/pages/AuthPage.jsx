import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser as login, signupUser as register } from '../Slices/authSlice'  // Adjust aliases if needed
import { useNavigate } from 'react-router-dom'

export default function AuthPage(){
  const [mode, setMode] = useState('login')
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const roleRef = useRef()
  const dispatch = useDispatch()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const payload = { 
      name: mode === 'signup' ? nameRef.current.value : undefined,
      email: emailRef.current.value, 
      password: passwordRef.current.value, 
      role: mode === 'signup' ? roleRef.current?.value : undefined 
    }

    try {
      if (mode === 'login') {
        await dispatch(login(payload)).unwrap()
      } else {
        await dispatch(register(payload)).unwrap()
      }
      nav('/')
    } catch (err) {
      // Improved error handling: Show validation errors
      const errorMsg = err?.errors ? Object.values(err.errors).flat().join('\n') : 'Auth failed';
      alert(errorMsg)
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 container-card">
          <h4>{mode === 'login' ? 'Login' : 'Create account'}</h4>
          <form onSubmit={submit}>
            {mode === 'signup' && (
              <div className="mb-2">
                <input ref={nameRef} className="form-control" placeholder="name" required />
              </div>
            )}
            <div className="mb-2">
              <input ref={emailRef} className="form-control" placeholder="email" type="email" required />
            </div>
            <div className="mb-2">
              <input ref={passwordRef} className="form-control" placeholder="password" type="password" required minLength={6} />
            </div>

            {mode === 'signup' && (
              <div className="mb-2">
                <select ref={roleRef} className="form-select" required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            )}

            <div className="d-flex gap-2">
              <button className="btn btn-primary">
                {mode === 'login' ? 'Login' : 'Signup'}
              </button>

              <button 
                type="button" 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} 
                className="btn btn-outline-secondary"
              >
                Switch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}