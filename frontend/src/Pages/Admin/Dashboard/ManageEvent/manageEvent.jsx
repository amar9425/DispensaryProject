import React,{useState,useEffect} from 'react'
import './manageEvent.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ManageEvent=(props)=> {
    const[title,setTitle]=useState("");
    const [data,setData] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const fetchData = async()=>{
        props.showLoader();
        await axios.get(`${backendURL}/api/notification/get`).then((response)=>{
            console.log(response)
            setData(response.data.notifications);
        }).catch(err=>{
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })

    }


    useEffect(()=>{
        fetchData();

    },[])

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if(title.trim().length === 0) return toast.error("Please enter the event title.");
        props.showLoader();
        await axios.post(`${backendURL}/api/notification/add`,{title:title},{withCredentials:true}).then((response)=>{

            setData([response.data.notification,...data]);
            //toast.success(response.data.message);
            setTitle("");
            //fetchData();
        }).catch(err=>{
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })

    }

    const filterOutEvent = (id) => {
        let newArr=data.filter((item) => item._id !== id);
        setData(newArr);
    }

    const handleDeleteEvent = async (id) => {
        props.showLoader();
        await axios.delete(`${backendURL}/api/notification/delete/${id}`,{withCredentials:true}).then((response)=>{
            filterOutEvent(id);

        }).catch(err=>{
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })
    }




    return(
        <div className='add-staffs-box'>
            <form onSubmit={handleSubmitEvent} className='register-form'>
                <div className=''>
                    <div className='register-input-box'>
                        <input value={title} onChange={(event)=>setTitle(event.target.value)} className='input-box-register  mngEventInp' type="text" placeholder='Events' />
                    </div>
                </div>
                <button type='submit' className='form-btn reg-btn'>Add</button>
            </form>
            <div>
            
            {
                data.map((item,index)=>{
                    return(
                        <div className='list-staffs'>
                <div className='list-staff'>
                    <div>{item.title.slice(0,60)}....</div>
                    <div className='list-staff-btns'>
                        <div onClick={()=>handleDeleteEvent(item._id)} style={{cursor:"pointer"}}><DeleteIcon /></div>
                    </div>
                </div>
            </div>

                    );
                })
            }
            </div>
            <ToastContainer />


        </div>

    )
}
export default ManageEvent
