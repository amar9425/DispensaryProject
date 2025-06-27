import React,{useState} from 'react';
import './login.css'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from'axios';
import ForgotModal from '../../components/ForgotModal/forgotModal';
const Login= (props) => {

    const navigate = useNavigate();





    const[forgotPassword,setForgotPassword]=  useState(false);
    const[loginField,setLoginField]=useState({email:"",password:""});
    const[registerField,setRegisterField]=useState({name:"",email:"",password:"",rollNo:""});


    const handleForgotModal =()=>{
        setForgotPassword(prev=>!prev);
    }

    const handleOnChange=(event,key,card)=>{
        if(card==="login"){
            setLoginField({...loginField,[key]:event.target.value});
        }else{
            setRegisterField({...registerField,[key]:event.target.value});
        }
    }

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const handleLogin =async()=>{
        if(loginField.email.trim()===""|| loginField.password.trim()==="")  return toast.error("Please enter the credentials");
        props.showLoader();

        await axios.post(`${backendURL}/api/auth/login`, loginField, { withCredentials: true }).then((response)=>{
            console.log(response)
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userInfo',JSON.stringify(response.data.user));
            localStorage.setItem('isLogin',true);
            props.handleLogin(true);
            if(response.data.user.role==="student"){
                navigate(`/student/${response.data.user._id}`);
            }else{
                navigate('/admin/dashboard');
            }


        }).catch(err=>{
            console.log(err);
            toast.error(err?.response?.data?.error  || "Login Failed");

        }).finally(()=>{
            props.hideLoader();

        })

    }

    const handleRegister = async()=>{
        if(registerField.email.trim() === "" || registerField.password.trim() ==="" || registerField.name.trim() === "") return toast.error("Please enter the Credentials");
        if(registerField.name.length<3) return toast.error("Name should be greater than 2 character")
        props.showLoader();
        await axios.post(`${backendURL}/api/auth/register`,registerField).then(response =>{
            toast.success("User Registered Successfully")

        }).catch(err=>{
            toast.error(err?.response?.data?.error);

        }).finally(()=>{
            props.hideLoader();

        })


    }



  return (
    <div className='login-page'>

        <div className='login-page-card'>
            <div className='card-header-form'>Login</div>
            <div className='form-input-fields'>
                <input value={loginField.email} onChange={(event)=>handleOnChange(event,'email','login')} className='form-input'  type="email" placeholder='Enter Email Id:' />
                <input value={loginField.password} onChange={(event) =>handleOnChange(event,'password','login')} className='form-input'  type="password" placeholder=' Your Password:' />
                <div className='form-button'onClick={handleLogin}>Login</div>
            </div>
            <div className='forgot-password-link'onClick={handleForgotModal }>Forgot Password ?</div>

        </div>

        <div className='signup-page-card'>
            <div className='card-header-form'>Register</div>
            <div className='form-input-fields'>
                <input value={registerField.name} onChange={(event)=> handleOnChange(event,'name','register')} className='form-input'  type="text" placeholder='Enter Your Name:' />
                <input value={registerField.email} onChange={(event)=> handleOnChange(event,'email','register')} className='form-input'  type="email" placeholder='Enter  Email id:' />
                <input value={registerField.password} onChange={(event)=> handleOnChange(event,'password','register')}className='form-input'  type="text" placeholder='Your Password:' />

                <div className='form-btn' onClick={handleRegister}>Register</div>
            </div>

        </div>
        <ToastContainer />

        {
            forgotPassword && <ForgotModal showLoader={props.showLoader} hideLoader={props.hideLoader} closeModal={handleForgotModal} />
        }



    </div>
  )
}

export default Login
