import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Slices/authSlice'

function Navbar() {
  const { token, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = () => dispatch(logout())

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        
        

        <div className="navbar-collapse d-flex">
          
          <ul className="navbar-nav ms-auto d-flex align-items-center">

            {token ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">{user?.name}</span>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              location.pathname === '/' && (
                <div className="d-flex align-items-center gap-3 ms-auto">

                  <Link
                    className="btn btn-dark rounded-pill px-4 py-2"
                    to="/login"
                  >
                    Se connecter
                  </Link>

                  <Link
                    className="btn btn-light rounded-pill border px-4 py-2"
                    to="/signup"
                  >
                    S’inscrire
                  </Link>

                </div>
              )
            )}

          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
