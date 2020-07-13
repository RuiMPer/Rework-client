import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../auth/auth-service';
import {Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';


class Navbar extends React.Component {

    state= {
        clickActive: '/'
    }

    service =  new AuthService();
    

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
                            <NavLink exact to="/">Home</NavLink>
                        </NavItem>
                    
                    { !this.props.loggedInUser ? ( <>

                        <NavItem active={window.location.hash === '/services'}>
                            <NavLink to="/services">All Services</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/search">Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/login'>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/signup'>Signup</NavLink>
                        </NavItem>
                        
                    </> ) : ( <>

                        <NavItem to='/services'>Services
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
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <span>
                            Welcome {this.props.loggedInUser.firstName}
                        </span>
                        <NavItem>
                            <NavLink to="/" onClick = { () => this.logoutUser()}>Logout</NavLink>
                        </NavItem>


                    </> )}
                </Nav>
            </>
        )
    }
}

export default Navbar;