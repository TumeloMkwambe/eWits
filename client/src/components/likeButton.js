import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ eventID }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    likeEvent(eventID);
  };

  return (
    <FontAwesomeIcon
      icon={faHeart}
      onClick={handleLike}
      className={`like-icon ${liked ? 'liked' : ''}`} // Conditional class for liked state
    />
  );
};

export default LikeButton;
