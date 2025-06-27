import React, { useState } from 'react';
import './addModal.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AddModal = (props) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'college_dispensary_management_system');

    setLoader(true);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtvqx0qeb/image/upload',
        data
      );

      const imageUrl = response.data.secure_url; 
      setImage(imageUrl);
      console.log('Uploaded image URL:', imageUrl);
    } catch (err) {
      console.error('❌ Error uploading image:', err.response?.data || err.message);
      alert('Failed to upload image. Please check your upload preset & cloud name.');
    } finally {
      setLoader(false);
    }
  };
const backendURL = import.meta.env.VITE_BACKEND_URL;

  

  const handleSubmit = async () => {
    await axios.post(`${backendURL}/api/gallary/add`, { link: image },{withCredentials: true}).then((response) => {
      window.location.reload();

    }).catch((err) => {
      console.log(err);
     
    })

  }

  return (
    <div className='addModal'>
      <div className='addModal-card'>
        <div>Add Image</div>

        <div className='modal-add-btns'>
          <div className='cancel-modal-btn' onClick={props.onClose}>Cancel</div>

          <label htmlFor='fileInput' className='cancel-modal-btn'>
            Upload
          </label>
          <input
            id='fileInput'
            accept='image/*'
            type='file'
            onChange={uploadImage}
            className='cancel-file'
            style={{ display: 'none' }}
          />
        </div>

        {loader && (
          <Box sx={{ display: 'flex', marginTop: '10px' }}>
            <CircularProgress />
          </Box>
        )}

        {image && 
          <img
            src={image}
            alt='Uploaded Preview'
            style={{ width: '100px', height: '100px', marginTop: '10px' }}
          />
        }

        {
            image && <div className='cancel-modal-btn' onClick={handleSubmit}>Submit</div>

        }
      </div>
    </div>
  );
};

export default AddModal;
