import { useState } from 'react'

import './App.css'
import Header from './components/Header/header'
import { Route,Routes,Navigate } from 'react-router-dom';
import Home from './Pages/Home/home';
import Footer from './components/Footer/footer';
import Login from './Pages/Login/login';
import Stock from './Pages/Stock/stock';
import AdminDashboard from './Pages/Admin/Dashboard/admindashboard';
import RegisterStudent from './Pages/Admin/RegisterStudent/registerStudent';
import ManageMedicine from './Pages/Admin/ManageMedicine/manageMedicine';
import Records from './Pages/Admin/Records/records';
import Facility from './Pages/Admin/Facility/facilitye';
import NearByHospital from './Pages/Admin/NearByHospital/nearByHospital';
import Gallery from './Pages/Admin/Gallery/gallary';
import StudentDashboard from './Pages/Student/studentDashboard'; 
import GlobalLoader from './components/GlobalLoader/globalLoader';
function App(){

  const [loader,setLoader] = useState(false);
  const [isLogin,setIsLogin] = useState(localStorage.getItem("isLogin")==="true");



  let role = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")).role:null;
  let id = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo"))._id:null;



  const handleLogin = (value)=>{
    setIsLogin(value);
  }
  const showLoader =()=>{
    setLoader(true);
  }
  const hideLoader =()=>{
    setLoader(false);
  }



  return (

    <div className='App'>
      <Header isLogin={isLogin}  showLoader={showLoader}   handleLogin={handleLogin}  hideLoader={hideLoader}  />
      <Routes>
        < Route path='/' element={<Home showLoader={showLoader} hideLoader={hideLoader}/> } />
        < Route path='/login' element={isLogin?role==="student"?<Navigate to={`/student/${id}`}/> :<Navigate to={'/admin/dashboard'} />:<Login handleLogin={handleLogin} showLoader={showLoader} hideLoader={hideLoader}  />} />
        < Route path='/stock' element={<Stock showLoader={showLoader} hideLoader={hideLoader}/>}  />
        < Route path='/admin/dashboard' element={isLogin && role!=='student' ? <AdminDashboard showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />
        < Route path='/admin/register-student' element={isLogin && role!=='student' ?<RegisterStudent showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />
        < Route path='/admin/manage-medicine' element={isLogin && role!=='student' ?<ManageMedicine showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />
        < Route path='/admin/records' element={isLogin && role!=='student' ?<Records showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />
        < Route path='/admin/facilitye' element={isLogin && role!=='student' ?<Facility showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />
        < Route path='/admin/nearByHospital' element={isLogin && role!=='student' ?<NearByHospital showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />
        < Route path='/admin/gallary' element={isLogin && role!=='student' ?<Gallery showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/"/>} />

        < Route path='/student/:id' element={isLogin && role==="student"? <StudentDashboard showLoader={showLoader} hideLoader={hideLoader}/> :<Navigate to="/"/> } />
      </Routes>
  
      <Footer/>

      {loader && <GlobalLoader /> }

    </div>
  )
}

export default App

