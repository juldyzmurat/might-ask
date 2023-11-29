import React from "react";
import styled from "styled-components";
import gif from "../../Assets/aboutcat.gif";

const AboutContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const About = () => {
  return (
    <div>
      <AboutContainer>
        <img src={gif} className="Aboutcat" alt="gif" />
        <h1>
          MighTASK is a task and schedule manager that learns how you work to
          help you do more with your time
        </h1>
      </AboutContainer>
    </div>
  );
};

export default About;
