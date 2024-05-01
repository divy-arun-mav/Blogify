import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  let token = localStorage.getItem('jwt')
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (token) {
      setIsloggedin(true);
    } else {
      setIsloggedin(false);
    }
  },[token])

  return (
    <div className='w-full flex justify-center items-center border-700 border'>
      <nav className='w-full flex flex-col lg:flex-row justify-center items-center'>
        <div className='w-full flex justify-between items-center'>
          <Link to="/" className='m-2 text-xl font-bold'><h1>Blogify</h1></Link>
          <div className='m-2 flex lg:hidden flex-col justify-evenly items-center border-black border-2 rounded-md w-7 h-7 cursor-pointer' onClick={toggleMenu}>
            <div className='border-black border rounded-md w-4'></div>
            <div className='border-black border rounded-md w-4'></div>
            <div className='border-black border rounded-md w-4'></div>
          </div>
        </div>
        <ul className={`lg:flex flex-col lg:flex-row justify-evenly items-center w-full py-5 ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <li><Link to="/">All Posts</Link></li>
          <li><Link to="/posts">My Posts</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
        </ul>
        {isloggedin ? (
          <>
            <p className='w-3/12 text-center hidden lg:block'>{localStorage.getItem("username")}</p>
            <button onClick={()=>{localStorage.removeItem("jwt")}} className={`w-2/12 m-3 py-2 lg:block font-semibold text-red-500 border-2 border-red-500 text-center rounded-md hover:bg-red-500 hover:text-white ${isMenuOpen ? 'flex' : 'hidden'}`}>Logout</button>
          </>
        ) : (
            <div className={`w-2/12 lg:flex justify-evenly lg:justify-evenly items-center text-center ${isMenuOpen ? 'flex' : 'hidden'}`}>
            <Link to="/login" className='w-max mr-3 p-2 font-semibold text-center rounded-md hover:bg-black hover:text-white'>Login</Link>
            <Link to="/register" className='w-max p-2 font-semibold text-center rounded-md hover:bg-black hover:text-white'>Register</Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
