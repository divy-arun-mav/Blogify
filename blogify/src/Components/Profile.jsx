import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const api = "http://localhost:5000";
  const [showButton, setShowButton] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [len, setLen] = useState(0);
  const getData = async () => {
    try {
      const res = await fetch(`${api}/myposts`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      });
      if (res.status === 200) {
        const response = await res.json();
        setLen(response.length)
        setData(response);
      } else {
        const errorResponse = await res.json();
        console.log("Error response from server: ", errorResponse);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getUser = async () => {
    try {
      const res = await fetch(`${api}/user`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      });
      if (res.status === 200) {
        const response = await res.json();
        setUser(response.user);
      } else {
        const errorResponse = await res.json();
        console.log("Error response from server: ", errorResponse);
      }
    } catch (e) {
      console.log(e);
    }
  }


  const delPost = async (postId) => {
    try {
      await fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      });
      toast.success("Post deleted successfully!!!")
      getData();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  useEffect(() => {
    getData();
    getUser();
  }, [api])

  return (
    <div className='flex justify-center items-center flex-col mx-2'>
      <p className='w-full text-center text-2xl font-semibold my-10'>My Profile</p> 
      {user && (
        <div className='flex justify-evenly items-center flex-col md:flex-row'>
          <img className=' rounded-lg p-2 border border-slate-300 w-1/5' src={user.Photo} alt="user" />
          <div className='flex justify-center items-start flex-col'>
            <p className='w-full text-xl font-semibold'>Name: {user.name}</p>
            <p className='w-full text-xl font-semibold'>Username: {user.username}</p>
            <p className='w-full text-xl font-semibold'>Email: {user.email}</p>
            <p className='w-full text-xl font-semibold'>Posts: {len}</p>
          </div>
        </div>
      )}
      <p className='w-full text-center text-2xl font-semibold my-10'>My Posts</p>
      {data && data.map((e) => (
        <div key={e._id} className='flex justify-center items-center w-full'>
          <div className='border border-black-300 rounded-lg m-2 flex justify-center items-center flex-col w-5/6'>
            <div className='m-2 p-2 border-b border-black-300 flex justify-between items-center w-full'>
              <div className='m-2 p-2 flex justify-start items-center w-full'>
                <img className='p-1 w-10 h-auto rounded-full' src={e.postedBy.Photo} alt="" srcSet="" />
                <p className='ms-2'>{e.postedBy.name}</p>
              </div>
              <div className={`${showButton ? "hidden" : "flex"} p-4 justify-center items-center flex-col mr-3 cursor-pointer`} onClick={() => setShowButton(showButton ? false : true)}>
                <div className='border-2 border-black mb-1'></div>
                <div className='border-2 border-black mb-1'></div>
                <div className='border-2 border-black mb-1'></div>
              </div>
              <button onClick={() => delPost(e._id)} className={`w-2/12 m-3 py-2 font-semibold text-red-500 border-2 border-red-500 text-center rounded-md hover:bg-red-500 hover:text-white ${showButton ? 'block' : 'hidden'}`}>Delete</button>
            </div>
            <img className='m-3 size-80 rounded-md' src={e.photo} alt="" srcSet="" />
            <p className='w-10/12 text-center my-2'>{e.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Profile