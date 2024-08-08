import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UpdateModal = ({ isOpen, onClose, postData }) => {
  const [categories, setCategories] = useState([]);
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      title: postData?.title || "",
      author: postData?.author || "",
      categoryId: postData?.categoryId || "",
      content: postData?.content || ""
    }
  });

  useEffect(() => {
    setValue("title", postData?.title);
    setValue("author", postData?.author);
    setValue("categoryId", postData?.categoryId);
    setValue("content", postData?.content);
  }, [postData]);

  const onSubmit = async (data) => {
    try {
      console.log('-----', data);
      const response = await axios.patch(`http://localhost:4000/post/update-post/${postData?._id}`, data);
      console.log('post updated:', response.data);
      reset(); // Reset the form after successful submission
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories in post model', error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl w-[50%] relative">
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold">Edit Post</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-10 m-5'>
            <div className='flex flex-col gap-2'>
              <label className='text-lg font-semibold'>Title:</label>
              <input
                type="text"
                placeholder='Enter Post Title'
                {...register("title")}
                className='border border-gray-400 py-2 px-4 outline-none rounded-md'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-lg font-semibold'>Author:</label>
              <input
                type="text"
                placeholder='Enter Author'
                {...register("author")}
                className='border border-gray-400 py-2 px-4 outline-none rounded-md'
              />
            </div>

            <div>
              <select {...register("categoryId")} className='w-full py-2 px-4 border border-gray-400 rounded-md shadow-md outline-none'>
                <option value="">Select Category</option>
                {categories?.map(category => (
                  <option key={category?._id} value={category._id}>{category?.categoryName}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder='Enter Post Content'
              {...register("content")}
              className='border border-gray-400 rounded-md py-2 px-4 shadow-md outline-none'
            />

            <button type='submit' className='w-32 py-2 bg-black text-white font-semibold rounded-lg hover:border border-black hover:bg-transparent hover:text-black hover:underline duration-300 hover:-translate-y-2'>
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
