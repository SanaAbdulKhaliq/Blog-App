import { Toaster } from 'react-hot-toast';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PoliticsPage from './Pages/PoliticsPage';
import FashionPage from './Pages/FashionPage';
import FoodPage from './Pages/FoodPage';
import TravelPage from './Pages/TravelPage';
import BlogDetailsPage from './Pages/BlogDetailsPage';
import AddBlogPage from './Pages/AddBlogPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import useUser from './Hooks/useUser';
import useTokenStore from './Hooks/useToken';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Remove curly braces
import ProtectedRoute from './Components/ProtectedRoute';
import MyPosts from './Pages/MyPosts';

function App() {
  const { token, setToken } = useTokenStore();
  const { setUser, user } = useUser();

  useEffect(() => {
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } else {
      setUser("");
    }
  }, [token, setUser]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/politics' element={<PoliticsPage />} />
        <Route path='/fashion' element={<FashionPage />} />
        <Route path='/travel' element={<TravelPage />} />
        <Route path='/food' element={<FoodPage />} />
        <Route path='/post-details/:id' element={<BlogDetailsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route 
          path='/add-post' 
          element={
            <ProtectedRoute>
              <AddBlogPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/my-posts' 
          element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
