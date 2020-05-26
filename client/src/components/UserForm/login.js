import React from 'react';
import './User.css';
import Form from './form';
import { Link, useLocation } from 'react-router-dom';

export default function Regis() {
  const { pathname } = useLocation();
  return (
    <div className="container2">
      <div className="sub2 card">
        <h1 className="item3">Instagram</h1>
        <Form />
        <h1 className="item3">OR</h1>
        <h1 className="item3">Facebook</h1>
      </div>
      <div className="sub2 card">
          { pathname === '/login' ?
            <p>Don't have an account?
              <span><Link to='/register'> Sign Up</Link></span> 
            </p> :
            <p>Already have an account? 
              <span><Link to='/login'> Log in</Link></span>
            </p>
          }
      </div>
      <div className="sub2">
        <p>Get the app.</p>
        <div className="sub3">
          <img className="img2" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt='' />
          <img className="img2" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt='' />
        </div>
      </div>
    </div>
  );
};