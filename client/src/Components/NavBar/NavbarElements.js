import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const navBackgroundColor = "#000000";
const textColor = "#ffffff"; // White
const activeLinkColor = "#ffb3ff"; // Light Purple

export const Nav = styled.nav`
  position: fixed;
  background: ${navBackgroundColor};
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
  color: ${textColor};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: ${activeLinkColor};
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: ${textColor};

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
  right: 2%;
  top: 5%;
  transform: translateY(-50%);
  z-index: 13;
`;

export const TaskView = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const LoginButton = styled.div`
  width: 150px;
  height: 150px;
  background: ${navBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
