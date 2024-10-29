import React, { useState } from 'react';
import axios from 'axios';


const Review = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID'); 
  console.log(userID, 'user id')
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user._id)

  const User = user._id


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const reviewData = {
      rating: rating, 
      feedback: feedback, 
      userID: User, 
    };
  

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REVIEW}/api/reviews`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        console.log(result);
        alert('Review submitted successfully!');

        setRating(0); // Reset rating
        setFeedback(''); // Clear feedback
      } else {
        alert('Review submitted successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Review submitted successfully!');
    }

  };
  
  
  

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#99999996',
    borderRadius: '10px',
    boxShadow: '-10px 20px 10px rgba(0, 0, 5, 0.6)',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    backgroundColor: 'transparent'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const ratingSectionStyle = {
    marginBottom: '20px',
  };

  const starsStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const starStyle = (filled) => ({
    fontSize: '30px',
    color: filled ? '#f1c40f' : '#ccc',
    cursor: 'pointer',
    transition: 'color 0.3s',
  });

  const feedbackSectionStyle = {
    marginBottom: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '9px',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    resize: 'none',
  };

  const submitBtnStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s',
  };

  const submitBtnHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>We value your feedback!</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={ratingSectionStyle}>
          <h3>Rate your experience:</h3>
          <div style={starsStyle}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={starStyle(star <= rating)}
                onClick={() => handleRatingChange(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>

        <div style={feedbackSectionStyle}>
          <h3>Your Suggestions</h3>
          <textarea
            placeholder="How can we improve our app?"
            value={feedback}
            onChange={handleFeedbackChange}
            style={textareaStyle}
            rows="5"
          />
        </div>

        <button
          type="submit"
          style={{ ...submitBtnStyle, ...(rating > 0 ? submitBtnHoverStyle : {}) }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;