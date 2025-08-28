import { getProjectForUser } from '../Portal/projectsConfig';
import React, { useState } from 'react'
import './LogIn.css'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/NavBar/logo.png';
import googleIcon from '../assets/Authentication/google.svg';
import login from '../assets/Authentication/login.png';


const LogIn = () => {
  const navigate = useNavigate();
  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('startup'); // 'startup' or 'investor'

  // Clear form data when userType changes
  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({ username: '', password: '' });
    setError('');
  };

  // Remove hardcoded login data; use backend API instead

  const handleCreateAccountClick = () => {
    navigate('/auth/signup');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    // Predefined credentials
    if (formData.username === 'manikant' && formData.password === '1234') {
      localStorage.setItem('il_token', 'dummy_token');
      localStorage.setItem('il_role', userType);
      // Use userProjectMap via getProjectForUser
      const projectUrl = getProjectForUser(formData.username);
      navigate(`/S/${projectUrl}/home`);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="image">
        <img src={login} alt="Login" />
      </div>
      <div className="login">
        <img src={logo} alt="Login" />
        {/* User type toggle */}
        <div className="user-type-toggle">
          <button
            type="button"
            className={`toggle-button ${userType === 'startup' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('startup')}
          >
            Start Up
          </button>
          <button
            type="button"
            className={`toggle-button ${userType === 'investor' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('investor')}
          >
            Investor
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="credentials">
            <div className="username">
              <p className='label'>Username:</p>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder={`Enter your ${userType} username...`}
                required
              />
            </div>
            <div className="password">
              <p className='label'>Password:</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password..."
                required
              />
              <p className='forgot-password'>Forgot your password?</p>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="login-button">
            <button type="submit">Login</button>
          </div>
        </form>
        <p>--------------------- or ---------------------</p>
        <div className="alternatives">
          <button>
            <img src={googleIcon} alt="Google" />
          </button>
          <button>
            <img src={googleIcon} alt="Facebook" />
          </button>
          <button>
            <img src={googleIcon} alt="Facebook" />
          </button>
        </div>
        <p className='create-account'>Don't have an account? <span onClick={handleCreateAccountClick}>Create one</span></p>
        <p className='policies'>Please go through <span>Privacy Policy</span> & <span>Cookie Policy</span></p>
      </div>
    </div>
  )
}

export default LogIn