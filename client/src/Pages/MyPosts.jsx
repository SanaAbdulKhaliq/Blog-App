import React, { useEffect, useState } from 'react';
import Topbar from '../Components/Topbar';
import axios from 'axios';
import useUser from '../Hooks/useUser';
import moment from 'moment';
import UpdateModal from '../Components/UpdateModel';
import { Link } from 'react-router-dom';
  
const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { user } = useUser();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/post/my-posts?user=${user.id}`);
      console.log('Fetching the posts', response.data);
      setPosts(response.data);
    } catch (error) {
      console.log('Error in fetching posts', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/');
      console.log('fetching categories', response.data);
      setCategories(response.data);
    } catch (error) {
      console.log('Error in getting categories', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchCategories();
    }
  }, [user]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const updatepost = async (id) => {
    try {
      setLoading(true);
      const response = await axios.patch(`http://localhost:4000/post/update-post/${id}`);
      console.log('updating request', response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error in updating post', error);
      setLoading(false);
    }
  };

  const deletepost = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/post/delete-post/${id}`);
      console.log('deleting request', response.data);
      fetchPosts(); // Fetch posts again to update the list after deletion
    } catch (error) {
      console.log('Error in deleting post', error);
    }
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsModelOpen(true);
  };

  const handleCloseModal = () => {
    setIsModelOpen(false);
    setSelectedPost(null);
  };

  return (
    <div>
      <Topbar />
      <div className='bg-post-image bg-cover h-[90vh]'>
        <div className='text-white flex flex-col gap-5 text-center relative top-[40%]'>
          <h1 className='text-5xl font-semibold'>A World of Wonders</h1>
          <p>Diverse Thoughts, Global Insights</p>
        </div>
      </div>

      <div>
        <h1 className='text-2xl font-semibold text-center mt-5'>My Posts</h1>
        {categories.map((category) => (
          <div key={category._id} className='mt-10'>
            <h2 className='text-xl font-semibold text-center'>{category.categoryName} Posts</h2>
            <div className='grid grid-cols-3 gap-8 h-96 mx-10 my-10 py-6'>
              {posts
                .filter((post) => post.category === category._id)
                .map((post) => (
                  <div
                    key={post._id}
                    className='border border-gray-500 rounded-lg shadow-lg p-4 hover:-translate-y-2 duration-300'
                  >
                    <h3 className='text-xl font-semibold'>Title: {post.title}</h3>
                    <p className='my-1'>
                      <span className='font-semibold text-[18px]'>Author:</span> {post.author}
                    </p>
                    <p className='my-1'>
                      <span className='font-semibold text-[18px]'>Category:</span> {category.categoryName}
                    </p>
                    <p className='my-1'>
                      <span className='font-semibold text-[18px]'>Content:</span> {truncateText(post.content, 30)}
                    </p>
                    <p className='my-1'>
                      <span className='font-semibold text-[18px]'>Date:</span> {moment(post.timestamp).format('MMM Do YYYY')}
                    </p>
                    <div className='mt-6'>
                      <Link to={`/post-details/${post._id}`} className='bg-black text-white py-2 px-4 rounded-lg shadow-md hover:underline'>Read More</Link>
                    </div>
                    <div className='flex gap-2 mt-4'>
                      <button
                        onClick={() => handleEditClick(post)}
                        className='font-medium underline px-4 py-2 rounded hover:bg-black hover:text-white duration-300'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletepost(post._id)}
                        className='text-red-600 font-medium underline px-4 py-2 rounded hover:bg-red-500 hover:text-white duration-300'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <UpdateModal isOpen={isModelOpen} onClose={handleCloseModal} postData={selectedPost} />
    </div>
  );
};

export default MyPosts;
