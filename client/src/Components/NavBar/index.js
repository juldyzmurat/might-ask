import React, {useState, useEffect} from "react";
import { Nav, NavLink, NavMenu, CircleButtonWrapper, LoginButton}
    from "./NavbarElements";
import CircleButton from "../TaskVisComponents/accounticon";
import { useNavigate, useLocation } from 'react-router-dom';


const displayValue = {

};


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const location = useLocation();
    const currentRoute = location.pathname;
    
    React.useEffect(() => {
    setShowNavbar(currentRoute !== '/');
    }, [currentRoute]);
    return (
        <>
            <Nav shownavbar = {showNavbar}>
                <CircleButtonWrapper>
                    <CircleButton />
                </CircleButtonWrapper>
                <NavMenu>
                    <NavLink to="/about">
                        About
                    </NavLink>
                    <NavLink to="/TasksViewPage">
                        TaskView
                    </NavLink>
                    <NavLink to="/DashboardPage">
                        Dashboard
                    </NavLink>
                    <NavLink to="/schedule">
                        Schedule
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;