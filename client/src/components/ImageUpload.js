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
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/storage/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.imageUrl);
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