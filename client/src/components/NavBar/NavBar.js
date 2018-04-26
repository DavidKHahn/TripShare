import React, { Component } from "react";
import "./NavBar.css";
import API from "../../utils/API";
import { Navbar, NavItem } from 'react-materialize'

const Nav_Bar = props => (

    <Navbar brand='Vacation App' right>
        <NavItem onClick={() => console.log('test click')}>Home</NavItem>
        <NavItem href=''>Create</NavItem>
        <NavItem href=''>View</NavItem>
        <NavItem href=''>Account</NavItem>
    </Navbar>
)

export default Nav_Bar;