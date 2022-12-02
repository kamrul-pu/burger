import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './Header.css';
import Logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{ backgroundColor: "#D70F64", height: "70px" }}>
                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={Logo} alt="logo" width="80px" />
                </NavbarBrand>
                <Nav className="mr-md-5">
                    <NavItem>
                        <NavLink className="NavLink" exact to="/">Burger Builder</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="NavLink" exact to="/orders">Orders</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="NavLink" exact to="/checkout">Checkout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;