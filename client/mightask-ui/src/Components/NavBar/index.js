import React from "react";
import { Nav, NavLink, NavMenu, CircleButtonWrapper}
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
                    <NavLink to="/contact" activeStyle>
                        Contact Us
                    </NavLink>
                    <NavLink to="/TasksViewPage" activeStyle>
                        TaskView
                    </NavLink>
                    <NavLink to="/signup" activeStyle>
                    Schedule
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;