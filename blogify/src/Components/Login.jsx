import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const postData = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (res.status === 200) {
                const response = await res.json();
                console.log("response from server ", response);
                localStorage.setItem("jwt", response.token);
                localStorage.setItem("username", response.user.name);
                toast.success("Login Succesfull!!!")
                navigate('/')
            } else {
                const errorResponse = await res.json();
                console.log("Error response from server: ", errorResponse);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='w-full flex justify-center items-center'>
            <img className='w-4/12 hidden md:block' src="./images/bwink_bld_03_single_03.jpg" alt="login-img" />
            <form onSubmit={postData} className='flex justify-center items-center flex-col text-left border border-slate-500 md:w-1/5 p-5 rounded-lg'>
                <h1 className='w-full text-center text-2xl font-semibold my-1'>Login</h1>
                <label className='text-left w-full mb-1' htmlFor="url">Username</label>
                <input className='border-2 border-black rounded-md w-full pl-1' value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" name="username" />
                <label className='text-left w-full mb-1' htmlFor="desc">Password</label>
                <input className='border-2 border-black rounded-md w-full' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" />
                <button className='border-2 border-black  hover:text-white hover:bg-black py-1 px-3 rounded-md my-3' type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;