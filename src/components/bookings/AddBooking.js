import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';


class AddBooking extends Component {
    state = {
        title: '',
        description: '',
        date: "",
        time: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, description, date, time } = this.state;
        const service = this.props.serviceId;
        axios.post(`${process.env.REACT_APP_SERVER}/bookings`, { title, description, service, date, time })
            .then(() => {
                this.props.getService();
                this.setState({ title: '', description: '', date: "", time: "" });
                toast('Booking created!');
            })
    }


    render() {
        return (
            <div>
                <h3>Add Booking</h3>
                <Form onSubmit={this.handleFormSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="date">Date</Label>
                                <Input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="time">Time</Label>
                        <Input type="time" name="time" value={this.state.time} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddBooking;