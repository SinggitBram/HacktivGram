import React from 'react';
import '../App.css';

import Regis from '../components/UserForm/login';

export default function Register() {
  return (
    <div className="container">
      <div className="sub">
        <img src="https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png" alt='' className="item"/>
        <Regis />
      </div>
      <div className="sub" id="footer">
        <p>ABOUT</p>
        <p>HELP</p>
        <p>PRESS</p>
        <p>API</p>
        <p>JOBS</p>
        <p>PRIVACY</p>
        <p>TERMS</p>
        <p>LOCATIONS</p>
        <p>TOP ACCOUNTS</p>
        <p>LANGUAGE</p>
        <p id="item3">© 2020 INSTAGRAM FROM FACEBOOK</p>
      </div>
    </div>
  );
};