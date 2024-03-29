// This file is consist of 2 components (login, register) and main component with logic AuthPage

import React, { useContext, useState }            from 'react'
import { AuthContext }                            from '../../context/AuthContext'
import axios                                      from 'axios'
import Flash                                      from '../Common/Flash/InfoFlash'
import { Link }                                   from 'react-router-dom'
import './css/AuthPage.css'
require('dotenv').config()
export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const [mError, setmError] = useState(undefined)
  const [typeOfForm, setTypeOfForm] = useState('login')
  const [form, setForm] = useState({
    email: '', password: '', userName: '',
  })

  const loginHandler = async () => {
    try {
      axios.post(`${process.env.REACT_APP_DEFAULT_URL}/api/login`, 
      { ...form }, 
      { headers: { 'Authorization': `Bearer ${auth.token}` } })
        .then(response => response.data.map(part => 
          {
          auth.login(part.token, part.isAdmin, part.userName, part.avatar); 
          if (part.message === undefined) return
          setmError(part.message)
          setTimeout(() => {setmError(undefined)}, 2050)
        }))

        .catch(function (error) {
          console.log(error, "on login");
        })

    } catch (e) { console.log("error loginHandler") }
  }

  const registerHandler = async () => {
    if (form.userName.length < 6 || form.userName.length > 17
      || form.email.length < 12 || form.email.length > 30  
      || form.password.length < 8 || form.password.length > 20) {
      setmError('Invalid data')
      setTimeout(() => {setmError(undefined)}, 2050)
      return
    }
    try {
      axios.post(`${process.env.REACT_APP_DEFAULT_URL}/api/register`, { ...form })
        .then(response => 
          response.data.map(part => {
            auth.login(part.token, part.isAdmin, part.userName, part.avatar);

          if (part.message === undefined) return
          setmError(part.message)
          setTimeout(() => {setmError(undefined)}, 2050)
        }))

        .catch(function (error) {
          console.log(error + "\n\nOn registerHandler");
        });

    } catch (e) { console.log(e) }
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const changeForm = (prop) => {
    setTypeOfForm(prop)
  }

  return (
    <div className="App">
      <div className="logreg-bg"></div>
      <a href="/">
        <h1 className="logreg-logo">Animal Assistance<br /> <span className="logreg-logo-down">save nature togehter</span></h1>
      </a>
      {typeOfForm === 'login' 
        ? <LoginForm 
          form={form}
          changeHandler={changeHandler}
          loginHandler={loginHandler}
          changeForm={changeForm}
        /> 
        : <RegisterForm 
          form={form} 
          changeHandler={changeHandler} 
          registerHandler={registerHandler} 
          changeForm={changeForm} 
      />}
      <h1 className="logreg-cr"> Created by: <br /> <span className="logreg-cr-down">Ugin PTN</span></h1>
      {mError == undefined ? null : < Flash info={mError} />}
    </div>
  );
}


// Register form component


function RegisterForm({ form, changeHandler, registerHandler, changeForm }) {
  return (
    <div className="logreg-form-container">
        <h1 className="hdn-logo"><Link to="/">Animal Assistance</Link> 
        <br /> <span className="logreg-logo-down">save nature togehter</span>
        </h1>
      <h1 className="form-header">New on our site?</h1>
      <div className="input-c">
        <input
          key="reginput1"
          placeholder="Enter name"
          value={form.userName}
          onChange={changeHandler}
          type="text"
          id="userName"
          name="userName"
          required />
      </div>
      <div className="input-c">
        <input
          key="reginput2"
          placeholder="Enter email"
          value={form.email}
          onChange={changeHandler}
          type="text"
          id="login"
          name="email"
          required />
      </div>
      <div className="input-c">
        <input
          key="reginput3"
          placeholder="Enter password"
          value={form.password}
          onChange={changeHandler}
          type="password"
          id="password"
          name="password"
          required />
          <button
            onClick={registerHandler}
            type="submit"
            id="logreg-form-button"
            className="logreg-form-button"
          >Sign up</button>
      </div>
      <div className="go-to-else-container">
        <a className="go-to-else"
          onClick={() => changeForm('login')}>Have account?</a>
      </div>
    </div>
  )
}


// Login form component

function LoginForm({ form, changeHandler, loginHandler, changeForm }) {
  return (
    <div className="logreg-form-container">
        <h1 className="hdn-logo"><Link to="/">Animal Assistance</Link>
        <br /> <span className="logreg-logo-down">save nature togehter</span>
        </h1>
      <h1 className="form-header">Welcome back</h1>
      <div className="input-c">
        <input
          key="loginput1"
          placeholder="Enter email"
          type="text"
          id="login"
          name="email"
          value={form.email}
          onChange={changeHandler}
          required />
      </div>
      <div className="input-c">
        <input
          key="loginput2"
          placeholder="Enter password"
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={changeHandler}
          required />
          <button
            onClick={loginHandler}
            id="logreg-form-button"
            className="logreg-form-button"
          >Sign in</button>
      </div>
      <div className="go-to-else-container">
        <a className="go-to-else"
          onClick={() => changeForm('register')}>Create account</a>
      </div>
    </div>
  )
}

export default AuthPage;