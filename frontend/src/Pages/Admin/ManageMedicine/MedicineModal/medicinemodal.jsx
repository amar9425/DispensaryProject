import React,{useState,useEffect} from 'react';
import './medicinemodal.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import newStyled from '@emotion/styled';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const MedicineModal = (props)=>{
    const[medicine,setMedicine]=useState({name:"",quantity:"",usage:""});
    const handleOnChange=(event,key)=>{
        setMedicine({...medicine,[key]:event.target.value});
    }

    useEffect(()=>{
        if(props.clickedMedicine){
            setMedicine({...medicine,name:props.clickedMedicine.name,quantity:props.clickedMedicine.quantity,usage:props.clickedMedicine.usage});
        }


    },[])


    const updateValue = async()=>{
        props.showLoader();
        await axios.put(`${backendURL}/api/medicine/update/${props.clickedMedicine._id}`,medicine,{withCredentials:true}).then((response)=>{
            window.location.reload();
        }).catch(err=>{
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })
    }



    const handleSubmit= async(event)=>{
       event.preventDefault();
         if(props.clickedMedicine){
            updateValue();
            return;

        }




       if(medicine.name.trim().length === 0 || medicine.quantity.trim().length === 0 || medicine.usage.trim().length === 0) return toast.error("Please fill all the details.");
       props.showLoader();
       await axios.post(`${backendURL}/api/medicine/add`,medicine,{withCredentials:true}).then((response)=>{
        window.location.reload();
       }).catch(err=>{
        toast.error(err?.response?.data?.error);
       }).finally(()=>{
        props.hideLoader();
       })
    }
    
    


    return(
        <form onSubmit={handleSubmit} >
            <div className='register-form-div' >
                <div className='register-input-box'>
                    <input value={medicine.name} onChange={(event)=>handleOnChange(event,"name")} className='input-box-register' placeholder='Medicine Name' type="text" />
                    </div>
                <div className='register-input-box'>
                 <input value={medicine.quantity} onChange={(event)=>handleOnChange(event,"quantity")} className='input-box-register' placeholder='Quantity' type="number" />
                </div>
                <div className='register-input-box'>
                    <input value={medicine.usage} onChange={(event)=>handleOnChange(event,"usage")} className='input-box-register' placeholder='Usage' type="text" />
                </div>
            </div>
            <button type='submit' className='form-btn reg-btn'>{props.clickedMedicine?"Update":"Add"}</button>
            <ToastContainer />
        </form>
    )

}
export default MedicineModal;
