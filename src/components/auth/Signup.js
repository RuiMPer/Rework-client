import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Signup extends Component {
    state = { username: '', password: '', firstName: '', lastName: '', email:'', type:'', errorMessage: '' };
    service = new AuthService();

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('type', this.state.type);
        const {username, password, firstName, lastName, email, type} = this.state;

        this.service.signup(username, password, firstName, lastName, email, type)
            .then(response => {
                this.setState({
                    username: '', 
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    type:''
                });

                this.props.setCurrentUser(response)
                localStorage.setItem("loggedin", true);

                //redirecting to services on the browsers history
                this.props.history.push("/")
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
        const {username, password, firstName, lastName, email, type} = this.state;

        return( 
            <>
            <header className="header">
                <h1>Signup</h1> 
            </header>

            <p className="text-info margin-content">Your personal informations</p><hr/>
            <Form onSubmit={this.handleFormSubmit}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="text" name="email" value={email} onChange={this.handleChange} placeholder="Escreve o teu email aqui..." />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input name="password" type="password" value={password} onChange={this.handleChange} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679;"/>
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="username">First Name:</Label>
                        <Input type="text" name="firstName" value={firstName} onChange={this.handleChange} placeholder="Escreve o teu primeiro nome aqui..." />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="password">Last Name:</Label>
                        <Input type="text" name="lastName" value={lastName} onChange={this.handleChange}/>
                    </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="username">Username:</Label>
                            <Input type="text" name="username" value={username} onChange={this.handleChange} placeholder="Escreve o teu username aqui..." />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="typeofuser">Role</Label>
                            <Input type="select" name="type" id="typeofuser" value={type} onChange={this.handleChange} >
                                <option value="" disabled >Select your user type...</option>
                                <option value="worker" id="worker" >Providing services</option>
                                <option value="client" id="client" >Looking for services</option>
                                <option value="both" id="combo" >Both</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                
                {/* Displaying an error message */}
                { this.state.errorMessage && <p className="error"> { this.state.errorMessage } </p> }

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