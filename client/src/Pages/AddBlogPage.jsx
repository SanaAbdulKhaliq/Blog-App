import React, { useEffect, useState } from 'react'
import useUser from '../Hooks/useUser';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Topbar from '../Components/Topbar';

const AddBlogPage = () => {

  const [categories, setCategories] = useState([]);
  const {user} = useUser()

  const {handleSubmit, register, reset} = useForm({
    defaultValues: {
      title: "",
      author: "",
      content: "",
      categoryId: "",
      userId: user.id
    }
  })

  const onSubmit = async (data) => {
    try {
      if (!user || !user.id){
        console.log('User not authenticated');
        return;
      }

      const response = await axios.post('http://localhost:4000/post/add-post', data);
      console.log('Post created', response.data);
      console.log('User Id:', user.id);
      reset();
    } catch (error){
      console.error('Error creating post', error);
      
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/');
      setCategories(response.data)
    } catch (error) {
      console.error('Error getting categories in add blog page', error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div>
      <Topbar />
      <p className='mx-10 my-5'>Here you can add your new post.</p>

      <div className='w-1/2 h-[70vh] relative top-8 left-[25%] border border-gray-500 rounded-xl shadow-xl'>
        <h1 className='text-center my-5 text-2xl font-semibold'>Add New Post</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5 px-8 my-5'>
            <div className='flex gap-5 w-full'>
              <input 
              type="text" 
              placeholder='Enter Post Title'
              {...register("title")}
              className='border border-gray-400 rounded-md py-2 px-4 shadow-md outline-none w-1/2'/>

              <input 
              type="text" 
              placeholder='Enter Author Name'
              {...register("author")}
              className='border border-gray-400 rounded-md py-2 px-4 shadow-md outline-none w-1/2'/>
            </div>

            <div>
              <select {...register("categoryId")} className='w-full py-2 px-4 border border-gray-400 rounded-md shadow-md outline-none'>
                <option value="">Select Category</option>
                {categories?.map(category => <option key={category?._id} value={category._id}>{category?.categoryName}</option>)}
              </select>
            </div>

            <textarea 
            placeholder='Enter Post Content'
            {...register("content")}
            className='border border-gray-400 rounded-md py-2 px-4 shadow-md outline-none'/>
          </div>

          <button className='mx-8 bg-black text-white py-2 px-6 font-medium rounded-md shadow-md hover:translate-x-2 duration-300'>
            Save Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogPage