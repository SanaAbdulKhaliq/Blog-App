import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PoliticalPosts = () => {

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/post/');
      console.log('in home page', response.data);
      setPosts(response.data);
    } catch (error) {
      console.log('Error in getting posts', error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/');
      console.log('fetching categories', response.data);
      setCategories(response.data);
    } catch (error) {
      console.log('Error in fetching categories', error);
    }
  };

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
      <h1 className='text-3xl font-semibold text-center'>Inspiring Posts</h1>
      <p className='text-center mx-auto w-[80%] mt-5 text-lg'>
        From thought-provoking posts dissecting complex political issues to 
        visually stunning travelogues showcasing the world's wonders, social 
        media offers a diverse range of content. Foodies can indulge in mouthwatering 
        images and recipes, while fashion enthusiasts can explore the latest trends and 
        style inspirations.
      </p>
      {politicsCategory && (
        <div key={politicsCategory._id} className='bg-gradient-to-t from-gray-300 rounded-3xl shadow-md border border-b-white mt-10'>
          <div className='flex items-center justify-between mx-10'>
            <h1 className='text-3xl font-semibold text-center mt-5'>{politicsCategory.categoryName} Posts</h1>
            <Link to='/politics' className='hover:underline font-medium mt-5'>See More of Political Posts</Link>
          </div>
          <div className='grid grid-cols-3 gap-8 h-[50%] mx-10 my-5 py-6'>
            {posts.filter(p => p.category === politicsCategory._id).slice(0, 3).map(post => (
              <div key={post._id} className='border border-gray-500 rounded-lg shadow-lg p-4 hover:-translate-y-2 duration-300 h-96'>
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
                <div className='mt-6'>
                  <Link to={`/post-details/${post._id}`} className='bg-black text-white py-2 px-4 rounded-lg shadow-md hover:underline'>Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PoliticalPosts;
