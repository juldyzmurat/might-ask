import React from "react";
import styled from "styled-components";
import gif1 from "../../Assets/aboutcat.gif";
import gif2 from "../../Assets/learningcat.gif";
import gif3 from "../../Assets/donecat.gif";

const About = () => {


  const imageStyle = {
    width: "384px",
    height: "480px", // Change the height as needed
  };

  return (
    <div id="carouselExampleCaptions" className="carousel slide" >
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={gif1} className="d-block w-100" alt="scroll1" style={imageStyle} />
          <div className="carousel-caption d-none d-md-block">
            <p>MighTASK is a task and schedule manager that learns how you work to
          help you do more with your time</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={gif2} className="d-block w-100" alt="scroll2" style={imageStyle} />
          <div className="carousel-caption d-none d-md-block">
            <p>It learns about the patterns between how you approximate duration of tasks and how much time you actually spend on them</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={gif3} className="d-block w-100" alt="scroll3" style={imageStyle} />
          <div className="carousel-caption d-none d-md-block">
            <p>It offers you personalized schedule to ensure you remain productive across all aspects of your life</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default About;
