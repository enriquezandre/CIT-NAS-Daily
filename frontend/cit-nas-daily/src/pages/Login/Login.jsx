import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/CSS/Login.css";
import bg from "../../assets/glebuilding.png";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://localhost:7001/api/Auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log('Successful login:', data);
          navigate('/oas');
        } else {
          console.log('Invalid credentials');
          setLoginError(true);
        }
      } else {
        console.log('API request failed:', response.status);
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='center-container'>
        <div className='main-container'>
          <div className='login-image-container'>
            <img src={bg} alt='glebuilding' className='bg-container' />
          </div>
          <div className='text-container'>
            <span className='text-login'>LOGIN</span>
            <form onSubmit={handleSubmit}>
              <div className='input-container'>
                <label htmlFor='username' className='input-label'>
                  Enter Username
                </label>
                <input
                  type='text'
                  id='username'
                  className='text-input'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password' className='input-label'>
                  Enter Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='text-input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Add a space */}
                <div style={{ margin: '10px 0' }}></div>
                <input type='submit' className='button-submit' value='Login' />
              </div>
            </form>
            {loginError && <p className='error-message'>Invalid username or password</p>}
          </div>
        </div>
      </div>
    </>
  );
};
