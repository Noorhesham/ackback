import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../libs/cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userLoggedState } from '../data/userLoggedState';
import { credentialCookieName } from './Login';

const SignOut = () => {
  const setUserLoggedState = useSetRecoilState(userLoggedState); // Get the setter function
  localStorage.clear();
  sessionStorage.clear();
  const navigate = useNavigate();
  useEffect(() => {
    // Clear user data from cookies and local storage
    deleteCookie(credentialCookieName); // Replace with the appropriate cookie name
    setUserLoggedState(null)
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to login page
    navigate('/');
  }, [navigate]);


  return null; // This component doesn't need to render anything
};

export default SignOut;
