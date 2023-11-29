import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  background: #ffb3ff;
  width: 100%;
  top: 0;
  left: 0;
  height: 85px;
  display: ${(props) => (props.shownavbar ? "flex" : "none")};
  justify-content: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  margin-bottom: 10%;
`;

export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CircleButtonWrapper = styled.div`
  position: fixed;
  right: 2%; /* Adjust the positioning as needed */
  top: 5%; /* Adjust the positioning as needed */
  transform: translateY(-50%);
  z-index: 13;
`;

export const TaskView = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Hide overflow if content exceeds the fixed height */
`;

export const LoginButton = styled.div`
  width: 150px;
  height: 150px;
  background: #ffb3ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* Add this to indicate that it's clickable */
`;
