import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../src/components/Sidebar'
import '../../src/globals.css'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
//abc
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log("formData", formData);
    console.log(formData[0]);
    try {
      const response = await axios.get(`${process.env.REACT_APP_STORAGE_URI}/api/storage/`);
      console.log("Response: ", response);
    } catch (error) {
      console.log("GET Error", error);
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_STORAGE_URI}/api/storage/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        },
      });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
   


<div className="DashboardContainer">
  <Sidebar/>
    <div className="ContentArea">
        <div className="home">       
            <div className="main-content">
            <div className='imageUploadTitle'>Upload an Image</div>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
          {imageUrl && <div>
            <h3>Uploaded Image:</h3>
            <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
          </div>}
            </div>  
        </div>
    </div>
</div>
  );
};

export default ImageUpload;
