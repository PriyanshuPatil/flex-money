import React from 'react';
import yoga_logo from '../../assets/yoga_logo.jpg';
import '../Navbar/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the access_token cookie and perform any other logout logic
    removeCookie('access_token');
    // Redirect the user to the home page after logout
    window.localStorage.setItem("isAuth",false);
    navigate('/');
  };

  return (
    <div className='nav'>
      <div className='nav_parent'>
        <div className='menu_image' onClick={() => navigate('/')}><img src={yoga_logo} alt='logo' /></div>
        <div className='menu_item'>
          <div onClick={() => navigate('/')}>Home</div>
          <div onClick={() => navigate('/form')}>Admission Form</div>
          <div onClick={() => navigate('/batch')}>Change Batch</div>
          {cookies.access_token ? (
            <div onClick={handleLogout}>Logout User</div>
          ) : (
            <div onClick={() => navigate('/login')}>Login/Signup</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
