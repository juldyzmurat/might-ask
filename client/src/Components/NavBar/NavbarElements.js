import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
position:fixed;
background: #ffb3ff;
width:70%;
top:0;
left:0;
height: 85px;
display: flex;
justify-content: center;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
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
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const CircleButtonWrapper = styled.div`
  position: absolute;
  right: 30px; /* Adjust the positioning as needed */
  top: 50%; /* Adjust the positioning as needed */
  transform: translateY(-50%);
`;

export const TaskView = styled.div`
  width: 100%; /* Set a fixed width */
  height: 100vh; /* Set a fixed height (100% of the viewport height) */
  overflow: hidden; /* Hide overflow if content exceeds the fixed height */
`;