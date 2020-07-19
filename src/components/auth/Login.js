import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        errorMessage: ''
    }
    service = new AuthService();

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, errorMessage:'' });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        this.service.login(username, password)
            .then(response => { 
                if (response.message ) { 
                    this.setState({errorMessage: "Combinação de credenciais errada. Tente novamente."});
                } 
                else {
                    //Set the whole application with the user that just logged in
                    this.props.setCurrentUser(response);
                    this.setState({ username: '', password: '', email: '' });
                    localStorage.setItem("loggedin", true);
                    this.props.history.push('/');
                }
            })
    }

    render() {
        return (
            <>
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
                            <Label for="password">Password:</Label>
                            <Input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679;"/>
                        </FormGroup>
                        </Col>
                    </Row>

                    { this.state.errorMessage &&
                    <p className="error"> { this.state.errorMessage } </p> }

                    <Button type="submit">Sign in</Button>
                    <FormGroup style={{marginTop: "10px"}}>
                            <p>Don't have account?
                                <Link to={"/signup"}> | Signup</Link>
                            </p>
                    </FormGroup>
                </Form>
            </>
        )
    }
}

export default Login