import React, { useState } from 'react';
import axios from 'axios';

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

    try {
      // Make the POST request using fetch
      const response = await fetch(`${process.env.REACT_APP_API_URI}/api/storage/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Note: fetch automatically sets this header when sending FormData
        },
      });
    
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      // Parse the JSON response
      const data = await response.json();
      
      // Set the image URL from the response
      setImageUrl(data.imageUrl);
    
    } catch (error) {
      console.error('Error uploading image', error);
    }
    
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <div>
        <h3>Uploaded Image:</h3>
        <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
      </div>}
    </div>
  );
};

export default ImageUpload;
