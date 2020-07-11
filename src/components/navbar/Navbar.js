import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../auth/auth-service';

class Navbar extends Component {

    service =  new AuthService();

    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.props.setCurrentUser(null);
            localStorage.clear();
        })
    }


    render() {
        if (this.props.loggedInUser) {
            return (
                <nav>
                    <ul>
                        <li>
                            Welcome {this.props.loggedInUser.username}
                        </li>
                        <li>
                            <Link to='/services'>All Services</Link>
                        </li>
                        <li>
                            <Link to='/'>
                                <button onClick = { () => this.logoutUser()}>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )
        } else {
            return (
                <nav>
                    <ul>
                        <li>
                           <Link to='/login'>Login</Link>
                        </li>
                        <li>
                           <Link to='/signup'>Signup</Link>
                        </li>
                    </ul>
                </nav>
            )
        }

    }
}

export default Navbar;