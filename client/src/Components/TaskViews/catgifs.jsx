import React from "react";
import cat20 from "./20cat.gif";
import cat40 from "./40cat.gif";
import cat60 from "./60cat.gif";
import cat80 from "./80cat.gif";
import cat100 from "./100cat.gif";

const CatGif = ({ completionPercentage }) => {
  // Define the paths for each GIF
  const gifImages = [cat20, cat40, cat60, cat80, cat100];

  // Determine the index based on the completion percentage
  const index = Math.floor((completionPercentage - 1) / 20);

  // Ensure the index is within valid bounds
  const gifIndex = Math.min(Math.max(index, 0), gifImages.length - 1);

  // Get the corresponding GIF image
  const gifImage = gifImages[gifIndex];

  return <img src={gifImage} alt="Cat GIF" />;
};

export default CatGif;
