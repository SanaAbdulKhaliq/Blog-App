import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTokenStore from '../Hooks/useToken';
import useUser from '../Hooks/useUser';

const Topbar = () => {
  const { token, setToken } = useTokenStore();
  const navigate = useNavigate();
  const {user} = useUser();

  const handleLogout = () => {
    try {
      setToken("");
      navigate('/');
      console.log('User has logged out');
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  return (
    <div className='w-full h-20 px-10 pt-5 rounded-b-2xl shadow-md'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>The Blog</h1>
        </div>

        <div>
          <ul className='flex gap-8'>
            <li>
              <Link to='/' className='hover:underline duration-300'>
                Home
              </Link>
            </li>

            <li>
              <Link to='/politics' className='hover:underline duration-300'>
                Politics
              </Link>
            </li>

            <li>
              <Link to='/fashion' className='hover:underline duration-300'>
                Fashion
              </Link>
            </li>

            <li>
              <Link to='/travel' className='hover:underline duration-300'>
                Travel
              </Link>
            </li>

            <li>
              <Link to='/food' className='hover:underline duration-300'>
                Food
              </Link>
            </li>

            {token && (
              <li>
                <Link to='/add-post' className='hover:underline duration-300'>
                  Add New Post
                </Link>
              </li>
            )}

            {token && (
              <li>
                <Link to='/my-posts' className='hover:underline duration-300'>
                  My Posts
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className='flex gap-5'>
          {token ? (
            <div className='flex gap-6'>
                <p className='font-semibold underline'>Hi, {user?.name}</p>
            <button onClick={handleLogout} className='font-semibold hover:underline duration-300'>
              Logout
            </button>
            </div>
          ) : (
            <Link to='/login' className='font-semibold hover:underline duration-300'>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
