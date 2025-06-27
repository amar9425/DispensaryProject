import React,{useEffect,useState} from 'react';
import './facility.css'
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;
const Facility = (props) => {

   const [data,setData] = useState([]);

   const fetchData = async()=>{
      props.showLoader()
      await axios.get(`${backendURL}/api/facility/get`).then((response)=>{
         console.log(response)
         setData(response.data.facility);
      }).catch(err=>{
         console.log(err)
      }).finally(()=>{
         props.hideLoader()
      })
   }

   useEffect(()=>{
      fetchData();
   },[])
  return (
    <div className='facility'>
        <div className='facility-header'>
            List of facilities available at IES Health Center:

        </div>
        <div className='facility-lists'>

         {
            data.map((item,index)=>{
               return(

                  <div className='facility-list'>
                     <div className='facility-list-header'>{item.title}</div>
                     <p className='facility-list-value'>{item.description}</p>
                  </div>


               );

            })
         }

             

             
      </div>

    </div>
   
  );
}

export default Facility;
