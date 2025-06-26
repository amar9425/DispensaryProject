import React,{useState,useEffect} from 'react';
import './gallery.css'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddModal from './AddModal/addModal';
import DeleteModal from './DeleteModal/deleteModal';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const Gallery = (props) => {
    const[addModal,setAddModal]=useState(false);
    const[deleteModal,setDeleteModal]=useState(false);
    const[data,setData]=useState([]);
    const [clickedItem,setClickedItem] = useState(null);
    const setAddModalFunc= ()=>{

        setAddModal(prev=>!prev);
    }
    const setDeleteModalFunc= (item=null) =>{

        if(deleteModal){
            setClickedItem(null);
        }else {
            setClickedItem(item);
        }
        
        setDeleteModal(prev=>!prev);
    }
    const fetchData = async () => {
        props.showLoader();
        axios.get('http://localhost:4000/api/gallary/get').then((response) => {
            console.log(response);
            setData(response.data.images);
        }).catch(err => {
            toast.error(err?.response?.data?.error);
        }).finally(() => {
            props.hideLoader();
        })

    }
    useEffect(() => {
         fetchData();
    },[])




    return(
        <div className='gallery'>
            <div className='go-back'>
                <Link to={'/admin/dashboard'}>
                 <ArrowBackIcon />Back To Dashboard
                </Link>
            </div>
            <div className='add-pic-gallery-btn'onClick={setAddModalFunc}>Add</div>

            <div className='gallery-home'>
                {
                    data.map((item)=>{
                        return(
                           <div className='gallary-home-image-block img-admin' onClick={()=>setDeleteModalFunc(item)}>
                    <img src={item.link} className='gallary-home-image'/>
                </div>
                        );
                    })
                }

            </div>
            {addModal && <AddModal onClose={setAddModalFunc} />}
            {deleteModal && <DeleteModal clickedItem={clickedItem} onClose={setDeleteModalFunc} />  }
            <ToastContainer />
            
        </div>
            

    )
}
export default Gallery;