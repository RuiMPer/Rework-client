import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../auth/auth-service';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Badge, Button } from 'reactstrap';
import axios from 'axios';

class Navbar extends React.Component {
    service = new AuthService();

    state = {
        dropdownOpen: false,
        totalBookings: 0
    };

    componentDidMount() {
        this.getUserServices()
            .then(() => {
                this.countBookings()
            })

    }
    // componentWillUpdate() {

    // }
    // componentDidUpdate() {
    //     this.countBookings()
    // }

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

    getUserServices = () => {
        // Get list of service from the API we just built
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
        });
        return (service.get(`/services`)
            .then(responseFromAPI => {
                // console.log(responseFromAPI)
                // console.log("ISTO", responseFromAPI.data)
                // console.log(this.props)
                this.setState({
                    listOfServices: responseFromAPI.data
                })
            })
        )
    }

    countBookings = () => {
        // this.getUserServices()
        let total = 0
        this.state.listOfServices.map(response => {
            let objNumber = response.bookings.length
            // console.log("count", objNumber)
            total += objNumber
        })
        this.setState({
            totalBookings: total
        })
        // console.log("total", total)
    }

    render() {
        //console.log(this.props.loggedInUser)
        // console.log("navbar", this.state.listOfServices)
        return (
            < nav className="navbar" >
                <Nav pills>

                    <NavItem>
                        <NavLink exact to="/">Home</NavLink>
                    </NavItem>
                    {this.state.countBookings}
                    {!this.props.loggedInUser ? (
                        <>
                            <NavItem className="search">
                                <NavLink to="/search" >Search</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='/login'>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='/signup'>Signup</NavLink>
                            </NavItem>
                        </>
                    ) : (
                            <>
                                <div className="alignright">

                                    <span className="nav-item">
                                        Welcome, {this.props.loggedInUser.firstName}!
                            </span>
                                    <div className="nav-item">
                                        <Button color="primary" outline>
                                            Bookings <Badge color="secondary">{this.state.totalBookings}</Badge>
                                        </Button>
                                    </div>
                                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                                        <DropdownToggle nav caret>
                                            My Area
                                </DropdownToggle>
                                        <DropdownMenu>

                                            {this.props.loggedInUser.type === "worker" ? (
                                                <>
                                                    <DropdownItem header>Worker</DropdownItem>
                                                    <DropdownItem>
                                                        <NavItem>
                                                            <NavLink to="/services">My Services</NavLink>
                                                        </NavItem>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <NavItem className="clients">
                                                            <NavLink to="#">My Clients</NavLink>
                                                        </NavItem>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <NavItem>
                                                            <NavLink to="/company">My Company</NavLink>
                                                        </NavItem>
                                                    </DropdownItem>
                                                </>
                                            ) : (
                                                    <DropdownItem header>Client</DropdownItem>
                                                )}

                                            <DropdownItem>
                                                <NavItem>
                                                    <NavLink to="/bookings">My Bookings</NavLink>
                                                </NavItem>
                                            </DropdownItem>

                                            <DropdownItem divider />

                                            <DropdownItem>
                                                <NavItem className="settings">
                                                    <NavLink to="#">Settings</NavLink>
                                                </NavItem>
                                            </DropdownItem>
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
            </nav >
        )
    }
}

export default Navbar;