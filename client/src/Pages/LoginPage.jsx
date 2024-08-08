import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import useTokenStore from '../Hooks/useToken';

const LoginPage = () => {

    const navigate = useNavigate();
    const {token,setToken}=useTokenStore()

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const login = async (e) => {
        e.preventDefault();
        const {email, password} = data;
        try {
            const {data} = await axios.post('http://localhost:4000/user/login', {
                email, password
            });
            console.log(email, password);
            if (data.error){
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Login successful')
                console.log("--->>",data.token)
                setToken(data.token)

                navigate('/')
            }
        } catch (error) {
            console.log('===', error);
        }
    }

  return (
    <div className='w-96 h-[65%] pb-8 relative top-24 left-[35%] rounded-2xl shadow-lg border border-gray-300'>
        <h1 className='font-semibold text-3xl text-center py-5' >Login</h1>

        <form onSubmit={login} className='mx-5 mt-8'>
            <input 
            type="email" 
            placeholder='Enter Your Email'
            onChange={(e) => setData({...data, email: e.target.value})}
            className='w-full py-2 px-4 rounded-xl outline-none mb-5 shadow-md border border-gray-300'/>

            <input 
            type="password" 
            placeholder='Enter Your Password'
            onChange={(e) => setData({...data, password: e.target.value})}
            className='w-full py-2 px-4 rounded-xl outline-none mb-5 shadow-md border border-gray-300'/>

            <button type='submit' className='bg-black py-2 w-32 font-semibold text-white rounded-xl shadow-md mt-5 flex mx-auto justify-center hover:bg-gray-400 hover:text-black duration-300 hover:-translate-y-2'>
                Login
            </button>
        </form>

        <div className='mx-5 mt-4 text-sm'>
            <p>Don't have an account? <Link to={'/register'} className='text-[16px] font-semibold duration-300 hover:underline'>Register Now</Link></p>
        </div>
    </div>
  )
}

export default LoginPage