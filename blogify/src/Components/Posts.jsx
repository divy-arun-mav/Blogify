import React, { useEffect, useState } from 'react'

const Posts = () => {
  const api = "http://localhost:5000/allposts";
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch(api, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      });
      if (res.status === 200) {
        const response = await res.json();
        console.log("response from server ", response);
        setData(response);
      } else {
        const errorResponse = await res.json();
        console.log("Error response from server: ", errorResponse);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  },[api])
  
  return (
    <div className='flex justify-center items-center flex-col mx-2'>
      {data && data.map((e) => (
        <div key={e._id} className='flex justify-center items-center w-full'>
          <div className='border border-black-300 rounded-lg m-2 flex justify-center items-center flex-col w-5/6'>
            <div className='m-2 p-2 border-b border-black-300 flex justify-start items-center w-full'>
              <img className='border border-black-300 p-1 w-10 h-auto rounded-full' src={e.postedBy.Photo} alt="" srcSet="" />
              <p className='ms-2'>{e.postedBy.name}</p>
            </div>
            <img className='m-3 size-80 rounded-md' src={e.photo} alt="" srcSet="" />
            <p className='w-10/12 text-center my-2'>{e.body}</p>
          </div>
          </div>
      ))}
      <div className='flex justify-center items-center w-full'>
        <div className='border border-black-300 rounded-lg m-2 flex justify-center items-center flex-col w-5/6'>
          <div className='m-2 p-2 border-b border-black-300 flex justify-between items-center w-full'>
            <div className='m-2 p-2 flex justify-start items-center w-full'>
              <img className='p-1 w-10 h-auto rounded-full' src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="" srcSet="" />
              <p className='ms-2'>Blogify</p>
            </div>
          </div>
          <img className='m-3 size-80 rounded-md' src="https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxMzg4ODY5ODM3OTQ5/habits-of-happy-people-jpg.jpg" alt="" srcSet="" />
          <p className='w-10/12 text-center my-2'>Share your stories on blogify</p>
        </div>
      </div>
    </div>
  )
}

export default Posts