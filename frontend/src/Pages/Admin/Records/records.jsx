import React, { useEffect, useState } from 'react';
import './records.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import SearchBox from '../../../components/SearchBox/searchBox';
import Modal from '../../../components/Modal/modal';
import RecordModal from './RecordModal/recordModal';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import StudentAllFiles from './StudentAllDetails/studentAllFiles';


const Records = (props) => {
  const [studentRoll, setStudentRoll] = useState('');
  const [listOfYear, setListOfYear] = useState([]);
  const [listOfMonth, setListOfMonth] = useState([]);
  const currentYear = new Date().getFullYear();
  const [modal,setModal]= useState(false)
  const [allRecordModal,setAllRecordModal]=useState(false)
  const[data,setData]= useState([]);
  const [selectedHistory,setSelectedHistory] = useState(null)
  const[selectedAllDetails,setSelectedAllDetails]=useState(null)


  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [medicineSearch, setMedicineSearch] = useState('');

  const onOffModal =()=>{
    setModal(prev=>!prev)
  }

  const onOffAllRecordModal =()=>{

    if(selectedAllDetails){
      setSelectedAllDetails(null);
    }
    setAllRecordModal(prev =>!prev)

  }



  const onChangeField = (value) => {
    setStudentRoll(value);
  };

  const onChangeValue = (value) => {
    setMedicineSearch(value);
  };

  const onOffmodal = () => {
    console.log('Add medicine modal toggled');
  };

  const fetchData = async () => {
    props.showLoader();
    await axios.get(`${backendURL}/api/history/get-history?month=${selectedMonth}&year=${selectedYear}`,{withCredentials:true}).then(response=>{
      console.log(response)
      setData(response.data.history);

    }).catch(err=>{
      console.log(err);
      toast.error(err?.response?.data?.error);
    }).finally(()=>{
      props.hideLoader();
    })
  };

  useEffect(() => {
    if (selectedMonth === '' || selectedYear === '') {
      return;
    }
    fetchData();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    let arr = [];
    for (let i = 2025; i <= parseInt(currentYear); i++) {
      arr.unshift(i.toString());
    }
    setListOfYear(arr);
    setSelectedYear(arr[0]);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = new Date().getMonth();
    const pastAndCurrentMonths = months.slice(0, currentMonthIndex + 1);
    setListOfMonth(pastAndCurrentMonths);
    setSelectedMonth(pastAndCurrentMonths[pastAndCurrentMonths.length - 1]);
  }, []);

  const handleOnOpenModal =(item)=>{
    setModal(prev=>!prev)
    setSelectedHistory(item?item:null);
  }

  const handleClick= async()=>{
    if(studentRoll.trim().length===0)  return toast.error("please Enter Correct Roll No.")
      props.showLoader();
      await axios.get(`${backendURL}/api/history/get?roll=${studentRoll}`,{withCredentials:true}).then(response=>{
        console.log(response);
        setAllRecordModal(true);
        setSelectedAllDetails(response.data.history);
        

      }).catch(err => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      }).finally(() => {
        props.hideLoader();
      })


  }

  return (
    <div className='records'>
      <div className='go-back'>
        <Link to={'/admin/dashboard'}>
          <ArrowBackIcon />Back To Dashboard
        </Link>
      </div>

      <SearchBox handleClick={handleClick} onChange={onChangeField} value={studentRoll} placeholder="Search By Roll No."/>

      <div className='records-date-block'>
        <div>Select Year</div>
        <div className='records-date-year'>
          {listOfYear.map((item) => (
            <div
              key={item}
              onClick={() => setSelectedYear(item)}
              className={`records-year ${selectedYear === item ? 'active-stats' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>

        <div>Select Month</div>
        <div className='records-date-year'>
          {listOfMonth.map((item) => (
            <div
              key={item}
              onClick={() => setSelectedMonth(item)}
              className={`records-year ${selectedMonth === item ? 'active-stats' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

        <div className='manageMedicine-card'>
          <div className='report-form-rows'>
            <div className='report-form-header'>
              <div className=''>view</div>
              <div className='col-2-mng'>Student Name</div>
              <div className='col-2-mng'>Roll No</div>
              <div className='col-3-mng'>Date</div>
              
            </div>
          </div>

          <div className='report-form-row-block'>
            {
              data.map((item,index)=>{
                return(
                  <div className='report-form-row'>
              <div className='' onClick={()=>{handleOnOpenModal(item)}}>< VisibilityIcon sx={{cursor:"pointer"}}/></div>
              <div className='col-2-mng'>{item?.student?.name}</div>
              <div className='col-2-mng'>{item?.student?.roll}</div>
              <div className='col-3-mng'>{item?.createdAt?item.createdAt.slice(0,10).split("-").reverse().join("-"):"N/A"}</div>
            </div>
                );
              })
            }
            {
              data.length===0 && <div className='report-form-row'>
              <div className=''>No Any records yet</div>
            </div>
            
            }

          </div>
        </div>
        { modal &&  < Modal header="Records" handleClose={onOffModal} children={< RecordModal selectedHistory={selectedHistory} />}/>}
         { allRecordModal &&  < Modal header="All Records" handleClose={onOffAllRecordModal} children={<StudentAllFiles studentAllDetails={selectedAllDetails}  />}/>}
        <ToastContainer/>
      </div>
    );
};

export default Records;
 
