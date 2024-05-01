import React from 'react'
import Navbar from './Components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Posts from './Components/Posts'
import CreatePost from './Components/CreatePost'
import Myposts from './Components/MyPosts'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'

const Router = () => {
  return (
      <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts" element={<Myposts />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/create-post" element={<CreatePost />} />
      </Routes>
      </>
  )
}

export default Router