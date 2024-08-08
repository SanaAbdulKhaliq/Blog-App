import React, { useEffect, useState } from 'react';
import Topbar from '../Components/Topbar';
import axios from 'axios';
import moment from 'moment';
import PoliticalPosts from '../Components/PoliticalPosts';
import FashionPosts from '../Components/FashionPosts';
import TravelPosts from '../Components/TravelPosts';
import FoodPage from './FoodPage';
import FoodPosts from '../Components/FoodPosts';

const HomePage = () => {
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

  return (
    <div>
      <Topbar />
      <div className='bg-hero-image bg-cover h-[90vh]'>
        <div className='text-white flex flex-col relative top-[40%] gap-5'>
          <h1 className='text-5xl font-semibold text-center'>
            Welcome to The Ultimate Blog Hub
          </h1>

          <p className='text-center'>Get Inspired by the Latest Trends and Insights</p>
        </div>
      </div>

      <div className='my-16'>
        <div>
          <PoliticalPosts />
        </div>

        <div>
          <FashionPosts />
        </div>
        
        <div>
          <TravelPosts />
        </div>

        <div>
          <FoodPosts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
