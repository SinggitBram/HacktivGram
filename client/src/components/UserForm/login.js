import React from 'react';
import './User.css';
import Form from './form';

export default function Regis() {
  return (
    <div className="container2">
      <div className="sub2 card">
        <h1 className="item3">Instagram</h1>
        <Form />
        <h1 className="item3">OR</h1>
        <h1 className="item3">Facebook</h1>
      </div>
      <div className="sub2 card">
        <p>Don't have an account? Sign up</p>
      </div>
      <div className="sub2">
        <p>Get the app.</p>
        <div className="sub3">
          <img className="img2" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"/>
          <img className="img2" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"/>
        </div>
      </div>
    </div>
  );
};