import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component {
    state = { username: '', password: '', firstName: '', lastName: '', email:'' };
    service = new AuthService();

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;

        this.service.signup(username, password, firstName, lastName, email)
            .then(response => {
                this.setState({
                    username: '', 
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: ''
                });
                this.props.setCurrentUser(response)
                localStorage.setItem("loggedin", true);
                //redirecting to services on the browsers history
                this.props.history.push("/services")
            })
            .catch(error => console.log(error))
    }
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Email:</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                    
                    <label>Password:</label>
                    <input name="password" value={this.state.password} onChange={this.handleChange} />
                    <input type="submit" value="Signup" />
                </form>
                <p>Already have account? 
                    <Link to={"/login"}> Login</Link>
                </p>
            </div>
        )
    }
}
export default Signup;