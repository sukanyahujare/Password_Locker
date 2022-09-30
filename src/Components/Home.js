import React,{ useEffect, useState } from 'react'
import { onSnapshot, 
         collection, 
         doc , 
         updateDoc,
         where, query
    } from 'firebase/firestore';
    import { getAuth ,signOut , onAuthStateChanged } from 'firebase/auth';
import BasicModal from './Modal'
import { AiFillEye } from 'react-icons/ai';
import PasswordModal from './PasswordModal';
import { useNavigate } from 'react-router-dom';
import logo from './img1.jpg';
export default function Home({database}) {


    const [open, setOpen] = React.useState(false);
    let userEmail = localStorage.getItem('userEmail');
    let auth = getAuth();
    let navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [PasswordOpen, setPasswordOpen] = React.useState(false);
    // const handlePasswordOpen = () => setPasswordOpen(true);
    const handlePasswordClose = () => setPasswordOpen(false);
  const [showPassword , setShowPassword] = useState({});
    const collectionRef = collection(database,'userPassword');
    const emailQuery = query(collectionRef ,where('email' , '==' , userEmail) )
   const [passwordsArray, setPasswordsArrray]=useState([]);
   const [PasswordObject , setPasswordObject] = useState({});
   const [oldPassword , setOldPassword] = useState([]);
   
    const getPasswords = () =>{
        onSnapshot(emailQuery ,(response) =>{
            setPasswordsArrray(response.docs.map((item) =>{
                return{ ...item.data(),id:item.id}
            }))
            const data = response.docs.map((item) =>{
                return{ ...item.data(),id:item.id}
            })

            setOldPassword(data[0].passwordsArray);
        } )
    };

    const getPasswordInputs =(event) => {
        const data = {[event.target.name]: event.target.value} 
        setPasswordObject({...PasswordObject,...data});
    
    }

    const addPasswords = () => {
        const docToUpdate = doc(database,'userPassword' , passwordsArray[0].id )
        //  console.log(passwordsArray[0].id)
        updateDoc( docToUpdate, {
            passwordsArray : [...oldPassword , PasswordObject]
        } )
    }

    const openPasswordModal = (name , password) =>{
        setShowPassword({
            name : name,
            password : password
        })
        setPasswordOpen(true);
    }

    const logout = () => {
        signOut(auth) 
        .then(() => {
            navigate('/');
            localStorage.removeItem('userEmail')
        })
    }

useEffect(()=>{
    onAuthStateChanged(auth, (response) => {
        if(response){
            getPasswords()
        }
        else{
            // navigate('/')
            navigate('/login')
        }
    })
    
}, []);

const mystyle={
    height:"100px",
    width:"100px",
    verticalAlign: "center"
  }

// console.log(passwordsArray[0].password)

  return (

    <div className='home-main'>
        <img className='logo-size' src={logo} alt="Logo" style={mystyle}/>
        <h1 className='h1-align'>Password Locker</h1>
     
<div className='logout-btn'>
<button 
   onClick={logout}
     className='input-btn-password'
     >
        Log Out
          </button>
</div>
     <div className='card-main'>
     <h1>Home</h1>
     <button 
     onClick={handleOpen}
    //  className='input-btn add-password'  
    className='input-btn-password'
     >
         Add a Password
                    </button>

 <div className='password-main'>
    {passwordsArray.map((password) => {
        return(
            <> 
               {password.passwordsArray.map((password)=>{
                return(
                    <div className='password-data'>
                        <p className='password-display'>{password.name}</p>
                         <AiFillEye size={30}
                         className='eye-icon'
                         onClick={() => openPasswordModal(password.name, password.password)}
                         />
                        {/* <p className='password-display'>{password.password}</p> */}
                    </div>
                )
               })}
            </>
        )
    })}
  </div>
     </div>
     <BasicModal
     open={open}
     handleClose={handleClose}
     getPasswordInputs={getPasswordInputs}
     addPasswords={addPasswords}
     />

     <PasswordModal 
     open={PasswordOpen}
     handleClose={handlePasswordClose}
     showPassword={showPassword.password }
    originalPassword={passwordsArray[0]?.password}
    handlePasswordClose={handlePasswordClose}
     />
    </div>
  )
}
