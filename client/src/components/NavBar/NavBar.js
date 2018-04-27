import React, { Component } from "react";
import "./NavBar.css";
import API from "../../utils/API";
import { Navbar, NavItem } from 'react-materialize';
import { Link } from "react-router-dom";

const Nav_Bar = props => (

    <Navbar brand='Vacation App' right>
        <NavItem onClick={() => console.log('test click')}><Link to={"/"}>Home</Link></NavItem>
        <NavItem href=''><Link to={"/create"}>Create</Link></NavItem>
        <NavItem href=''>View</NavItem>
        <NavItem href=''>Account</NavItem>
    </Navbar>
)

export default Nav_Bar;