import React, { useEffect, useState } from 'react'
import Topbar from '../Components/Topbar'
import axios from 'axios';
import moment from 'moment';

const PoliticsPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/post/');
      setPosts(response.data);
    } catch (error) {
      console.log('Error in fetching posts', error);
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/');
      setCategories(response.data);
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

  // Filter to get only the politics category
  const politicsCategory = categories.find(category => category.categoryName === 'Politics');

  return (
    <div>
      <Topbar />
      <div className='bg-politics-image bg-cover h-[80vh]'>
        <div className='text-white text-center relative top-[40%] flex flex-col gap-5'>
          <h1 className='text-5xl font-semibold'>
            Inside Track of Politics
          </h1>
          <p>
            Navigating the complex world of politics, one analysis at a time.
          </p>
        </div>
      </div>

      <div>
        {politicsCategory && (
          <div key={politicsCategory._id}>
            <h1 className='text-2xl font-semibold text-center my-14'>{politicsCategory.categoryName} Posts</h1>
            <div className='grid grid-cols-3 gap-8 h-72 mx-10 my-10'>
              {posts.filter(p => p.category === politicsCategory._id).map(post => (
                <div key={post._id} className='border border-gray-500 rounded-lg shadow-lg p-4 hover:-translate-y-2 duration-300'>
                  <h1 className='text-xl font-semibold'>Title: {post.title}</h1>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Author:</span> {post.author}
                  </p>
                  <p className='my-1'>
                    <span className='font-semibold text-[18px]'>Category:</span> {politicsCategory.categoryName}
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
  );
}

export default PoliticsPage;
