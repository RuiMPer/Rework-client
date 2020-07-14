import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Signup extends Component {
    state = { username: '', password: '', firstName: '', lastName: '', email:'',errorMessage: '' };
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
            .catch((error) => {
                this.setState({errorMessage: error.response.data.message});
            })
    }
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value, errorMessage:''});
    }
    render(){
        return( <>
            <Form onSubmit={this.handleFormSubmit}>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Escreve o teu username aqui..." />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Escreve o teu email aqui..." />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="username">First Name:</Label>
                        <Input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Escreve o teu primeiro nome aqui..." />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="password">Last Name::</Label>
                        <Input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                    </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679;"/>
                </FormGroup>

                { this.state.errorMessage &&
                <p className="error"> { this.state.errorMessage } </p> }

                <Button>Sign up</Button>
                <FormGroup style={{marginTop: "10px"}}>
                    <p>Already have account? 
                        <Link to={"/login"}> Login</Link>
                    </p>
                </FormGroup>
            </Form>
            </>
        )
    }
}
export default Signup;