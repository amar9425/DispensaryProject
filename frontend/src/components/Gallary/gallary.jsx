import React,{useEffect,useState} from 'react';
import './gallary.css'
import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Gallary = (props) => {

  const [data,setData] = useState([]);
  useEffect(()=>{
  
      const fetchData = async()=>{
        props.showLoader()
        await axios.get('${backendURL}/api/gallary/get').then((response)=>{
          setData(response.data.images)
  
        }).catch(err=>{
           console.log(err)
        }).finally(()=>{
          props.hideLoader()
        })
      }
      fetchData();
    },[])


  return (
    <div className='gallary-home'>

      {
        data.map((item,index)=>{
          return(

            <div key={index} className='gallary-home-image-block'>
              <img src={item.link} className='gallary-home-image'/>
            </div>

          );
        })
      }




      
      

    </div>
  )
}

export default Gallary
