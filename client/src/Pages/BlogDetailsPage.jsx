import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Topbar from '../Components/Topbar';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ comments: [] });
  const [category, setCategory] = useState('');
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');
  const [liked, setLiked] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/post/${id}`);
      setPost(response.data);
      setLiked(response.data.likedByUser); // Assuming the API response includes whether the user has liked the post
    } catch (error) {
      console.log('Error in fetching post', error);
    }
  };

  const fetchCategory = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/category/${id}`);
      setCategory(response.data.categoryName);
    } catch (error) {
      console.log('Error in fetching category', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/post/${id}/like`);
      console.log('in like', response.data)
      setPost(response.data);
      setLiked(true);
    } catch (error) {
      console.log('Error liking post', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/post/${id}/comment`, {
        username,
        text: commentText
      });
      console.log('in comment', response.data)
      setPost(response.data);
      setCommentText('');
      setUsername('');
    } catch (error) {
      console.log('Error adding comment', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.category) {
      fetchCategory(post.category);
    }
  }, [post]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Topbar />
      <div className='container mx-auto my-10 border border-gray-300 rounded-2xl shadow-md p-5'>
        <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
        <p className='mb-4'><span className='font-semibold'>Author:</span> {post.author}</p>
        <p className='mb-4'><span className='font-semibold'>Category:</span> {category}</p>
        <p className='mb-4'><span className='font-semibold'>Date:</span> {moment(post.timestamp).format('MMM Do YYYY')}</p>
        <div className='mb-4'>
          <span className='font-semibold'>Content:</span>
          <p className='text-justify'>{post.content}</p>
        </div>
        <div className='mb-4'>
          <button
            onClick={handleLike}
            className={`py-2 px-4 rounded-lg shadow-md hover:underline ${liked ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          >
            Like ({post.likes})
          </button>
        </div>
        <div className='mb-4'>
          <h2 className='text-2xl font-semibold mb-2'>Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input
              type='text'
              placeholder='Your name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border border-gray-300 rounded-lg py-2 px-4 mb-2 w-full'
              required
            />
            <textarea
              placeholder='Your comment'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className='border border-gray-300 rounded-lg py-2 px-4 mb-2 w-full'
              required
            />
            <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:underline'>
              Add Comment
            </button>
          </form>
          <div className='mt-4'>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className='border-t border-gray-300 py-2'>
                  <p className='font-semibold'>{comment.username}</p>
                  <p>{comment.text}</p>
                  <p className='text-gray-500 text-sm'>{moment(comment.timestamp).fromNow()}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
