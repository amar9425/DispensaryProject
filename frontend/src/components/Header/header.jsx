import React, { useState,useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './header.css';
import axios from 'axios';

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventpopup, setEventpopup] = useState(false);
  const [helpline, setHelpline] = useState(false);
  const [events, setEvents] = useState([]);

  const handleOpenPopup = (popup) => {
    if (popup === "event") {
      setEventpopup(true);
    } else {
      setHelpline(true);
    }
  };

  const fetchEvents = async () => {
    await axios.get('http://localhost:4000/api/notification/get').then(response => {
      console.log("fetching data");
      
      setEvents(response.data.notifications);
    }).catch(err => {
      console.log(err);
     })

}

  useEffect(()=>{
    if(eventpopup){
      fetchEvents()

    }
  },[eventpopup])

  const handleClosePopup = (popup) => {
    if (popup === "event") {
      setEventpopup(false);
    } else {
      setHelpline(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    props.showLoader();
    try {
      await axios.post(
        'http://localhost:4000/api/auth/logout',
        {},
        { withCredentials: true } // ✅ Important for sending cookie
      );

      props.handleLogin(false);
      localStorage.removeItem("isLogin");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Logout failed");
    } finally {
      props.hideLoader();
    }
  };

  return (
    <div className="header">
      <div className="header-college-details">
        <div className="header-college-details-left">
          <img className="header-college-details-left-logo" src="/logo.png" alt="collegeLogo" />
          <div>
            <div className="header-college-details-name">IES College Of Technology</div>
            <div className="header-college-details-place">College</div>
            <div className="header-college-details-name">IES Institute Of Technology,</div>
            <div className="header-college-details-place">Bhopal(M.P)</div>
          </div>
        </div>

        <div className="header-college-details-right">
          <div className="header-college-social-media">
            <a target="_blank" rel="noopener noreferrer" href="https://facebook.com">
              <img src="/facebook.png" className="header-social-media-image" alt="facebook" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://instagram.com">
              <img src="/instagram.png" className="header-social-media-image" alt="instagram" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com">
              <img src="/youtube.png" className="header-social-media-image" alt="youtube" />
            </a>
          </div>

          <input type="text" className="header-input-tags" placeholder="Search..." />
        </div>
      </div>

      <div className="navbar">
        <Link to="/" className={`navbar-links ${location.pathname === "/" ? "active-link" : ""}`}>
          Home
        </Link>

        <div
          onClick={props.isLogin ? handleLogout : handleLogin}
          className={`navbar-links ${location.pathname === "/login" ? "active-link" : ""}`}
        >
          {props.isLogin ? "Logout" : "Login"}
        </div>

        <Link to="/stock" className={`navbar-links ${location.pathname === "/stock" ? "active-link" : ""}`}>
          Stock View
        </Link>

        <div
          className="navbar-links event-link"
          onMouseEnter={() => handleOpenPopup("event")}
          onMouseLeave={() => handleClosePopup("event")}
        >
          <div className="navbar-link-opt">New Events <ArrowDropDownIcon /></div>
          {
            eventpopup && <div className="navbar-dropdown-popup event-pop">
              {
                events.map((item,index)=>{
                  return(
                    <div className='popup-notification'>.{item.title}</div>
                  );
                })
              }
          </div>
          }
        </div>

        <div
          className="navbar-links event-link"
          onMouseEnter={() => handleOpenPopup("helpline")}
          onMouseLeave={() => handleClosePopup("helpline")}
        >
          <div className="navbar-link-opt">Helpline <ArrowDropDownIcon /></div>
          {helpline && (
            <div className="navbar-dropdown-popup">
              <div className="popup-notification">📞 Disaster Management: 1007</div>
            </div>
          )}
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="header-banner">
          <img src="/ies.png" className="header-banner" alt="IES LOGO" />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Header;