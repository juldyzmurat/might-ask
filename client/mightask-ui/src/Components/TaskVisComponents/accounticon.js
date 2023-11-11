import React from 'react';
import kittyImage from '../../kitty.jpeg';

const CircleButton = () => {
  const handleButtonClick = () => {
    // Add your button click logic here
    console.log('Button clicked!');
  };

  return (
    <div style={circleStyle} onClick={handleButtonClick}>
      <img src={kittyImage} alt="" style={imageStyle} />
    </div>
  );
};

const circleStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export default CircleButton;
