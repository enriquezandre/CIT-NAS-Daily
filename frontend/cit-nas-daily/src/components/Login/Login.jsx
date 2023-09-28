import React, { useState } from 'react';
import "../../assets/CSS/Login.css";
import bg from "../../assets/Images/glebuilding.png";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://localhost:7047/api/nas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const responseOas = await fetch('https://localhost:7047/api/oas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok || responseOas.ok) {
        const nasList = await response.json();
        console.log('NAS List:', nasList);
        console.log('Username:', username);
        console.log('Password:', password);
        const nas = nasList.find((n) => n.username === username && n.password === password);

        const oasList = await responseOas.json();
        const oas = oasList.find((o) => o.name === username && o.password === password);
  
        if (nas) {
          console.log('Successful login:', nas);
          // Successful login, redirect user to timeinout page
          window.location.href = `/${username}/timeinout`;
        } else if (oas) {
          console.log('Successful login:', oas);
          // Successful login
          window.location.href = `/${username}/OASAttendance`;
        } else {
          console.log('Invalid credentials');
          // Invalid credentials, display error message
          setLoginError(true);
        }
      } else {
        console.log('API request failed:', response.status);
        // Handle failed API request, display error message
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