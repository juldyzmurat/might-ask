import React from "react";
import { Nav, NavLink, NavMenu, CircleButtonWrapper, LoginButton}
    from "./NavbarElements";
import CircleButton from "../TaskVisComponents/accounticon";

 
const displayValue = {

};


const Navbar = () => {
    return (
        <>
            <Nav display={displayValue}>
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