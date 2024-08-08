import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TravelPosts = () => {

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
  const TravelCategory = categories.find(category => category.categoryName === 'Travel');

  return (
    <div>
        {TravelCategory && (
          <div key={TravelCategory._id} className='bg-gradient-to-t from-blue-100 rounded-3xl shadow-md border border-b-white mt-10'>
            <div className='flex items-center justify-between mx-10'>
              <h1 className='text-3xl font-semibold text-center mt-5'>{TravelCategory.categoryName} Posts</h1>
              <Link to='/travel' className='hover:underline font-medium mt-5'>See More of Travel Posts</Link>
            </div>
            <div className='grid grid-cols-3 gap-8 h-[50%] mx-10 my-10 py-6'>
              {posts.filter(p => p.category === TravelCategory._id).slice(0, 3).map(post => (
                <div key={post._id} className='border border-gray-500 rounded-lg shadow-lg p-4 hover:-translate-y-2 duration-300 h-96'>
                  <h1 className='text-xl font-semibold'>Title: {post.title}</h1>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Author:</span> {post.author}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Category:</span> {TravelCategory.categoryName}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Content:</span> {truncateText(post.content, 30)}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Date:</span> {moment(post.timestamp).format("MMM Do YYYY")}
                  </p>

                  <div className='mt-6'>
                    <Link to={`/post-details/${post._id}`} className='bg-black text-white py-2 px-4 rounded-lg shadow-md hover:underline'>Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default TravelPosts