import React from 'react';
import './footer.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
const Footer = () => {
    const todayDate=new Date();
  return (
    <div className='footer'>
        <div className='footer-left'>
            <img src="/logo.png" className='footer-logo' />
            <div className='footer-text-white'>IES College of Technology</div>
            <div className='footer-text-white'>Bhopal</div>
            <div className='footer-text-smaller'>Ratibad,Bhopal(M.P.)Pin code:462023</div>
            <div footer-text-smaller><LocalPhoneIcon/>09229251464</div>
            <div footer-text-smaller><LanguageIcon/>campus@iesbpl.ac.in</div>

        </div>
        <div className='footer-center'>
            <div className='important -link'>Important Links</div>
            <a href="https://iesbpl.ac.in/IES.php" target='_blank'Anti-Ragging Initiative></a>
            <a href="https://www.iesuniversity.ac.in/"target='_blank' Special Cell></a>
            <a href="https://www.icot.co.in/training-placement-committee" target='_blank'> Carrer Counselling and Placement Department </a>
            <a href="https://bestcolleges.indiatoday.in/college-details/2/ies-college-of-technology-bhopa" target='_blank'>Contact Us</a>
        </div>
        <div className='footer-right'>
            <div className='footer-right-name'><CloudIcon/>IES College of Technology Bhopal</div>
            <div className='today-date-footer'>{todayDate.toDateString()}</div>
        </div>
    </div>
    
  )
}

export default Footer
