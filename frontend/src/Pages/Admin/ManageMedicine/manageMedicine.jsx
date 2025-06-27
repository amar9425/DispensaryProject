import React,{useState,useEffect} from 'react'
import'./manageMedicine.css'
import {Link} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchBox from '../../../components/SearchBox/searchBox';
import  DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../../../components/Modal/modal';
import MedicineModal from './MedicineModal/medicinemodal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ManageMedicine =(props) =>{
        const [medicineSearch,setMedicineSearch]= useState("");
        const[addModal,setAddModal]= useState(false);
        const [clickedMedicine,setClickedMedicine] = useState(null);

        const [data,setData] = useState([]);



        const onOffmodal =()=>{
            if(addModal){
                setClickedMedicine(null);

            }
            setAddModal(prev=>!prev)
        }
        const onChangeValue=(value)=>{
            setMedicineSearch(value)
        }

        const fetchData = async()=>{
            props.showLoader();
            await axios.get(`${backendURL}/api/medicine/search-by-name?name=${medicineSearch}` ).then((response)=>{
                console.log(response);
                setData(response.data.medicines);
            }).catch(err=>{
                toast.error(err?.response?.data?.error);
            }).finally(()=>{
                props.hideLoader();
            })
        }

        const handleEdit = (item) => {
            setClickedMedicine(item);
            setAddModal(true);

        }

        const filteroutMedicine = (id) => {
            let newArr=data.filter((item) => item._id !== id);
            setData(newArr);

        }

        const handleDelete = async (id) => {
            props.showLoader();
            await axios.delete(`${backendURL}/api/medicine/delete/${id}`,{withCredentials:true}).then((response)=>{
                filteroutMedicine(id);
                // toast.success(response.data.message);
                // fetchData();
            }).catch(err=>{
                toast.error(err?.response?.data?.error);
            }).finally(()=>{
                props.hideLoader();
            })

        }




        useEffect(()=>{
            fetchData();
            

        },[medicineSearch])



    return(
        <div className='manageMedicine'>
            <div className='go-back'><Link to={'/admin/dashboard'}><ArrowBackIcon />Back To Dashboard</Link></div>
            <div className='top-manage-medicine'>
                <SearchBox placeholder="Search Medicine" value={medicineSearch} onChange={onChangeValue} />
                <div className='add-manage-medicine' onClick={onOffmodal}>Add</div>

            </div>
            <div className='manageMedicine-card'>
                <div className='report-form-rows'>
                <div className='report-form-header'>
                    <div className=''>Sr No.</div>
                    <div className='col-2-mng'>Medicine Name</div>
                    <div className='col-2-mng'>Added By</div>
                    <div className='col-3-mng'>Quantity</div>
                    <div className=''>Edit</div>
                    <div className=''>Delete</div>
                

                </div>
           </div> 

           <div className='report-form-row-block'>
                {
                    data.map((item,index)=>{
                    return(<div className='report-form-row'>
                        <div className=''>{index+1}</div>
                        <div className='col-2-mng'>{item.name}</div>
                        <div className='col-2-mng'>{item?.addedBy?.name}</div>


                        <div className='col-3-mng'>{item.quantity}</div>
                        <div onClick={()=>handleEdit(item)} className='edit-icon'><EditIcon /></div>
                        <div onClick={()=>handleDelete(item._id)} className='cdelete-icon col-4-rm'><DeleteIcon /></div>
                    </div>)

                })
                }
                {
                    data.length === 0 && <div className='report-from-row'>
                        <div className=''>No Any Medicine yet</div>
                    </div>
                }
                
            </div>

            </div>
            {
                addModal && <Modal headers="Add Medicine" handleClose={onOffmodal} children={<MedicineModal clickedMedicine={clickedMedicine} showLoader={props.showLoader} hideLoader={props.hideLoader}/>}/> 
            }
           
            <ToastContainer />
        </div>
    )
}
export default ManageMedicine
