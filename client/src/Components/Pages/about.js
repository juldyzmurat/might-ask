import React from "react";
import styled from "styled-components";
import gif from "../../Assets/aboutcat.gif";

const AboutContainer = styled.div`
  max-width: 600px; /* Set a maximum width for the container */
  margin: auto; /* Center the container horizontally */
  padding: 20px; /* Add some padding for spacing */
  text-align: center; /* Center the text */
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
