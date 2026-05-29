import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css'

export default function Navbar() {

  const navigate = useNavigate();
  const login = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className='navbar'>

      <div className='logo'>
        Todo App
      </div>

      <ul className='nav-links'>

        {login ? (
          <>
            <li>
              <Link to="/">List</Link>
            </li>

            <li>
              <Link to="/add">Add Task</Link>
            </li>

            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

      </ul>

    </nav>
  )
}