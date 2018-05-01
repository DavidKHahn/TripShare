import React from "react";
import "./NavBar.css";
import { Navbar, NavItem, Input } from 'react-materialize';

const NavBar2 = props => (

    <Navbar brand={<img id="logo" src="uploads/logo.png" />} id="navbar2">
        {/* <NavItem href={"/"}>Home</NavItem>
        <NavItem href={"/create"}>Create</NavItem>
        <NavItem href={"/view"}>View</NavItem> */}
    </Navbar>
)

export default NavBar2;