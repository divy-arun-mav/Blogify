import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  const postData = async (e) => {
    e.preventDefault();

    console.log(url, desc);

    try {
      const res = await fetch("http://localhost:5000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body: desc,
          pic: url
        })
      });

      if (res.status === 200) {
        toast.success("Posted Succesfully!!!");
        navigate('/posts')
      } else {
        const errorResponse = await res.json();
        console.log("Error response from server: ", errorResponse);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <h1 className='w-full text-center text-2xl font-semibold my-10'>Create a post</h1>
      <form onSubmit={postData} className='flex justify-center items-start flex-col text-left border border-slate-500 w-8/12 p-5 rounded-lg'>
        <label className='text-left w-full mb-1' htmlFor="url">Image url</label>
        <input className='border-2 border-black rounded-md w-full pl-1' value={url} onChange={(e) => setUrl(e.target.value)} type="text" name="url" />
        <label className='text-left w-full mb-1' htmlFor="desc">Post Description</label>
        <textarea className='border-2 border-black rounded-md w-full' value={desc} onChange={(e) => setDesc(e.target.value)} type="text" name="desc" />
        <button className='border-2 border-black hover:text-white hover:bg-black py-1 px-3 rounded-md my-3' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;