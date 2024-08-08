import React, { useEffect, useState } from 'react'
import Topbar from '../Components/Topbar'
import axios from 'axios';
import moment from 'moment';

const TravelPage = () => {

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);


  const fetchPosts = async () => {
    // console.log('in home page'); 
    try {
      // console.log('in try');
      const response = await axios.get('http://localhost:4000/post/');
      console.log('in home page', response.data);
      setPosts(response.data);
    } catch (error) {
      console.log('Error in getting posts', error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/')
      console.log('fetching categories', response.data);
      setCategories(response.data)
    } catch (error) {
      console.log('Error in fetching categories', error);
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchCategory();
  }, []);


  // Function to truncate text to a certain number of words
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  // Filter to get only the travel category
  const travelCategory = categories.find(category => category.categoryName === 'Travel');

  return (
    <div>
      <Topbar />
      <div className='bg-travel-image bg-cover h-[90vh]'>
        <div className='text-white flex flex-col gap-5 text-center relative top-[40%]'>
          <h1 className='text-5xl font-semibold'>Chasing Sunsets and Good Vibes</h1>
          <p>Exploring the world, one step at a time.</p>
        </div>
      </div>

      <div>
        {travelCategory && (
          <div key={travelCategory._id} className='mt-10'>
            <h1 className='text-2xl font-semibold text-center mt-5'>{travelCategory.categoryName} Posts</h1>
            <div className='grid grid-cols-3 gap-8 h-96 mx-10 my-10 py-6'>
              {posts.filter(p => p.category === travelCategory._id).map(post => (
                <div key={post._id} className='border border-gray-500 rounded-lg shadow-lg p-4 hover:-translate-y-2 duration-300'>
                  <h1 className='text-xl font-semibold'>Title: {post.title}</h1>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Author:</span> {post.author}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Category:</span> {travelCategory.categoryName}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Content:</span> {truncateText(post.content, 30)}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Date:</span> {moment(post.timestamp).format("MMM Do YYYY")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
    </div>
  )
}

export default TravelPage