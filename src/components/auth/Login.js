import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import axios from 'axios';


class Login extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        errorMessage: '',
        listOfServices: []

    }
    service = new AuthService();

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, errorMessage: '' });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        this.service.login(username, password)
            .then(response => {
                if (response.message) {
                    this.setState({ errorMessage: "Combinação de credenciais errada. Tente novamente." });
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
    getUserServices = () => {
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
    handleNotification = () => {
        this.getUserServices()

        let today = moment().format("DD/MM/YYYY")
        let eachBooking = []
        this.state.listOfServices.map(response => {
            if (response.bookings.length >= 1) {
                response.bookings.map(response => {
                    console.log("ESTE", response)
                    let eachBook = axios.create({
                        baseURL: `${process.env.REACT_APP_SERVER}`,
                        withCredentials: true
                    });
                    eachBook.get(`/bookings/${response}`)
                        .then(response => {
                            console.log("IDSDAA", response)
                            let bookingInfo = response.data
                            console.log(bookingInfo)
                            console.log(bookingInfo.date)
                            // eachBooking.push(bookingInfo)
                            // let notificationDay = moment(bookingInfo.date).subtract(1, "days").format("DD/MM/YYYY")
                            // let dateNot = moment(bookingInfo.date).format("DD/MM/YYYY")
                            // console.log("hoje", today)
                            // console.log("dia notificação", notificationDay)
                            // if (today === notificationDay) {
                            //     console.log("finally")
                            // } else {
                            //     console.log("no notification")
                            // }

                        })
                })
            }
        })
        // if (eachBooking.length >= 1) {
        //     console.log("OUTRO", eachBooking)

        //     eachBooking.map(response => {
        //         console.log("DATAS", response.date)
        //         let notificationDay = moment(response.date).subtract(1, "days").format("DD/MM/YYYY")
        //     })
        // }
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
                                <Input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="&#9679; &#9679; &#9679; &#9679; &#9679;" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <button onClick={() => { this.handleNotification() }}>TESTE:</button>
                    {this.state.errorMessage &&
                        <p className="error"> {this.state.errorMessage} </p>}

                    <Button type="submit">Sign in</Button>
                    <FormGroup style={{ marginTop: "10px" }}>
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