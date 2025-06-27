import React,{useState,useEffect} from 'react';
import './facilityModal.css';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const FacilityModal = (props)=> {
    const[inputField,setInputField] = useState({title:"",description:""});
    const handleChange = (event,key) => {
        setInputField({...inputField, [key]: event.target.value});
    };

    useEffect(()=>{
        if(props.clickedItem){
            setInputField({
                ...inputField,
                title: props.clickedItem.title,
                description: props.clickedItem.description
            });
        }
    },[]);

    const updateFacility = async()=>{
        await axios.put(`${backendURL}/api/facility/update/${props.clickedItem._id}`,inputField,{withCredentials: true}).then((response)=>{
             window.location.reload();
        }).catch((err)=>{
            toast.error(err?.response?.data?.error);
        })

    }



    const handleSubmit = async(e)=>{
        e.preventDefault()

        


        if(inputField.title.trim().length === 0 || inputField.description.trim().length === 0){
            return toast.error("Please fill all the fields");
        }
        if(props.clickedItem){
            updateFacility();
            return;
        }


        await axios.post('${backendURL}/api/facility/add', inputField,{withCredentials: true}).then((response)=>{
            window.location.reload();
        }).catch((err)=>{
            toast.error(err?.response?.data?.error);
        })


    }
    return (
        <div className='facility-modal'>
            <form className='register-form' onSubmit={handleSubmit}>
                <div className=''>
                    <div className='register-input-box'>
                        <input value={inputField.title} onChange={(event)=>handleChange(event,"title")}
                            className='input-box-register'
                            placeholder='Enter Title'
                            type='text'
                        />
                    </div>
                    <div className='register-input-box' style={{ marginTop: '20px' }}>
                        < textarea value={inputField.description} onChange={(event)=>handleChange(event,"description")} cols={80} rows={10} type='text' className='inter-box-register'placeholder='add Description'/>
                    </div>
                </div>


                <button type='submit' className='form-btn reg-btn'>{props.clickedItem?"Update":"Add"}</button>

            </form>
        </div>
    );
};

export default FacilityModal;
