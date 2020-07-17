import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../auth/auth-service';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Badge, Button } from 'reactstrap';


class Navbar extends React.Component {
    service = new AuthService();

    state = {
        dropdownOpen: false
    };

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
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
            <nav className="navbar">
                <Nav pills>

                    <NavItem>
                        <NavLink exact to="/">Home</NavLink>
                    </NavItem>

                    {!this.props.loggedInUser ? (<>

                        {/* <NavItem active={window.location.hash === '/services'}>
                            <NavLink to="/services">All Services</NavLink>
                        </NavItem> */}
                        <NavItem>
                            <NavLink to="/search">Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/login'>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/signup'>Signup</NavLink>
                        </NavItem>

                    </>) : (<>

                        <div className="alignright">

                            <span className="nav-item">
                                Welcome, {this.props.loggedInUser.firstName}!
                            </span>
                            <div className="nav-item">
                                <Button color="primary" outline>
                                    Bookings <Badge color="secondary">4</Badge>
                                </Button>
                            </div>
                            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                                <DropdownToggle nav caret>
                                    My Area
                                </DropdownToggle>
                                <DropdownMenu>
                                    {/* if user worker */}
                                    <DropdownItem header>Worker</DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink to="/services">Services</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>My Clients</DropdownItem>
                                    <DropdownItem>My Bookings</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Settings</DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink to={`/profile/${this.props.loggedInUser._id}`}>Profile</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink to="/" onClick={() => this.logoutUser()}>Logout</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>

                    </>)}
                </Nav>
            </nav>
        )
    }
}

export default Navbar;