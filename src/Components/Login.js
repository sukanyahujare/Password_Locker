import React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './img1.jpg';
// import { padding } from '@mui/system';

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const auth=getAuth();
  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value }
    setLoginData({ ...loginData, ...data })
  }

  let navigate = useNavigate();

  const login =() =>{
    signInWithEmailAndPassword(auth , loginData.email,loginData.password)
    .then((response) => {
      localStorage.setItem('userEmail',response.user.email)
      toast.success("You are now successfully Loged In....");
      setTimeout(()=>{
          navigate('/home')
      },1000)
      // alert('You are now successfully register....')
       
    })
    .catch(err =>{
        alert(err.message)
    })
  }

  const goRegister =()=>{
    navigate('/register')
  }

  const mystyle={
    height:"100px",
    width:"100px",
    verticalAlign: "center"
  }

  return (
    <div className='register-main'>
      <ToastContainer />
      
      <img className='logo-size' src={logo} alt="Logo" style={mystyle}/>
      <h1 className='h1-align'>Password Locker</h1>
      

      <div className='card-main'>
      <h1>Login</h1>
        <div className='inputs-container'>
          <input
            placeholder='Enter your Email'
            className='input-fields'
            onChange={onInput}
            type='email'
            name='email'
          />
          <input
            placeholder='Enter your Password'
            className='input-fields'
            onChange={onInput}
            name='password'
            type={'password'}
          />
          <button className='input-btn'
          onClick={login}
          >
            Sign In
          </button>

          <button className='input-btn'
                    onClick={goRegister}
                    >
                        Register
                    </button>

        </div>
      </div>
    </div>
  )
}