import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Nav, NavLink, NavMenu } from "./NavbarElements";
import AccountIcon from "./AccountIcon";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;

  React.useEffect(() => {
    setShowNavbar(currentRoute !== "/");
  }, [currentRoute]);
  return (
    <>
      <Nav shownavbar={showNavbar}>
        <AccountIcon />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/tasks">TaskView</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
