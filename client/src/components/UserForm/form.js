import React, { useState } from 'react'

export default function Form(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      email,
      password
    }
    console.log(data)
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
      default:
        break;
    }
  }

  return (
    <form className="sub4" onSubmit={handleSubmit} >
      <input type="text" placeholder="email" name="email" onChange={handleChange}/>
      <input type="text" placeholder="password" name="password" onChange={handleChange}/>
      <button type="submit">Log In</button>
    </form>
  )
}