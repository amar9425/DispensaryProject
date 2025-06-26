import React from 'react'
// import { Link } from 'react-router-dom';
import './aboutus.css'

const AboutUs= () =>{
  return (
    <div className='aboutus'>
      <h2>About Us</h2>
      <p>
        The medical needs of the campus population, consisting of students, staff members, and their families,
        are not met by the Institute Health Center. The Health Center has a medical officer, nursing staff,
        and an office attendant. The Institute Health Center also has a doctor.
      </p>
      <a
        className='about-link'
        href="https://164.100.196.21/mphealth/en/contact-us"
        target='_blank'
      >
        SoPs for IES Institute Health Center Services:
      </a>
      <p className='about-staffHeader'>
        Staff with their visiting days are as follows:
      </p>
      <ul>
        <li> Health Center timing : Monday to Saturday 8 Am to 9 PM.</li>
        <li>Doctor Consulation Timing :Monday to Friday 10 AM to 5 PM and Saturday 10 AM to 1.30 PM.</li>
        
      </ul>
    </div>
  )

}

export default AboutUs