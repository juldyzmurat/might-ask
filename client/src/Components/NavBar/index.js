import React from "react";
import { Nav, NavLink, NavMenu, CircleButtonWrapper, LoginButton}
    from "./NavbarElements";
import CircleButton from "../TaskVisComponents/accounticon";

 
const Navbar = () => {
    return (
        <>
            <Nav>
                <CircleButtonWrapper>
                    <CircleButton />
                </CircleButtonWrapper>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/TasksViewPage" activeStyle>
                        TaskView
                    </NavLink>
                    <NavLink to="/DashboardPage" activeStyle>
                        Dashboard
                    </NavLink>
                    <NavLink to="/schedule" activeStyle>
                        Schedule
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;