import React from 'react';
import { useState } from 'react';

import { collection,addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './img1.jpg';
export default function Register({database}) {
    const navigate=useNavigate();
    const [registerData, setRegisterData] = useState({});
    const collectionRef = collection(database,'userPassword')
     const auth=getAuth();


    const onInput = (event) => {
        let data = {[event.target.name]: event.target.value}
        setRegisterData({...registerData, ...data})
    }
    
    const register= () =>{
        createUserWithEmailAndPassword(auth,registerData.email,registerData.password)
        .then(response =>{
            sessionStorage.setItem('userEmail',response.user.email);
            // console.log(response.user)
            addDoc(collectionRef ,{
                email:registerData.email,
                password:registerData.password,
                passwordsArray:[]

            })
            .then(()=>{
            
                toast.success("You are now successfully register....");
                setTimeout(()=>{
                    navigate('/home')
                },1000)
                // alert('You are now successfully register....')
                 
            })
            .catch(err => {
                toast.alert(err.message)
            })
        })
        .catch(err =>{
            setTimeout(() =>{
                navigate('/')
            },1000)
            toast.error("Alleready Exister...Go Login")
            
        })
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
            <h1>Register</h1>
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
                    onClick={register}
                    >
                        Sign Up
                    </button>

                </div>
            </div>
        </div>
    )
}
