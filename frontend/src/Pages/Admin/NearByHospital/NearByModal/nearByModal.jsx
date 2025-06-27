import React,{useState,useEffect} from 'react';
import './nearByModal.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const NearByModal = (props) => {
    const[inputField,setInputField] = useState({name:"",contact:"",address:""});
    const handleOnChange = (event,key) => {
        setInputField({...inputField, [key]: event.target.value});
    }

    useEffect(() =>{
        if(props.clickedItem){
            setInputField({
                ...inputField,
                name: props.clickedItem.name,
                contact: props.clickedItem.contact,
                address: props.clickedItem.address
            });
        }

    }, []);

    


    const updateFunc = async() => {
        await axios.put(`${backendURL}/api/hospital/update/${props.clickedItem._id}`, inputField, {withCredentials: true}).then(response => {
            window.location.reload();
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        })


    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(inputField.name.trim().length === 0 || inputField.contact.trim().length === 0 || inputField.address.trim().length === 0) return toast.error("Please fill all the fields")

        if(props.clickedItem){
            updateFunc();
            return;
            
        }
        await axios.post(`${backendURL}/api/hospital/add`, inputField, {withCredentials: true}).then(response => {
            window.location.reload();
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        })

    }
    return(
    <form className='register-form' onSubmit={handleSubmit}>
                    <div className='register-form-div'>
                        <div className='register-input-box'>
                            <input value={inputField.name} onChange={(event)=>handleOnChange(event,"name")} className='input-box-register' placeholder=' Name' type="text" />


                        </div>
                        <div className='register-input-box'>
                            <input value={inputField.contact} onChange={(event)=>handleOnChange(event,"contact")} className='input-box-register' placeholder='Contact No.' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={inputField.address} onChange={(event)=>handleOnChange(event,"address")} className='input-box-register' placeholder='Address' type="text" />
                            

                        </div>
                        
        
                    </div>
                    <button type='submit' className='form-btn reg-btn'>{props.clickedItem?"Update":"Add"}</button>
                    <ToastContainer />
                </form>
    )
}
export default NearByModal;
