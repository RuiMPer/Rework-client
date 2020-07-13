import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../auth/auth-service';
import {Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';


class Navbar extends React.Component {

    state= {
        active: true
    }

    service =  new AuthService();

    
    toggleActiveClass = () => {
        const [dropdownOpen, setDropdownOpen] = useState(false);
        setDropdownOpen(!dropdownOpen);
    }

    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.props.setCurrentUser(null);
            localStorage.clear();
        })
    }

    render() {
        
        return (
                <>
                <Nav pills>
                    <NavItem>
                        <NavLink href="/" active>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/services">All Services</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/search">Search</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"><Link to='/login'>Login</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"><Link to='/signup'>Signup</Link></NavLink>
                    </NavItem>
                    { this.props.loggedInUser ? ( <>
                        <NavItem>
                            <Link to='/services'>Services</Link>
                        </NavItem>
                        <Dropdown nav onClick = { () => this.toggleActiveClass()} >
                            <DropdownToggle nav caret>
                                My Area
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>My Services</DropdownItem>
                                <DropdownItem>My Bookings</DropdownItem>
                                <DropdownItem>My Clients</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Settings</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem>
                            <NavLink href="/profile">Profile</NavLink>
                        </NavItem>
                        <span>
                            Welcome {this.props.loggedInUser.username}
                        </span>
                        <NavItem>
                            <NavLink href="/" active><Link to='/' onClick = { () => this.logoutUser()}>Logout</Link></NavLink>
                        </NavItem>
                    </> ) : ( <>
                    </> )}
                </Nav>
            </>
        )
    }
}

export default Navbar;