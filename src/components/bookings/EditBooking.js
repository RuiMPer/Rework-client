import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditBooking extends Component {
	state = {
		title: this.props.booking.title,
		description: this.props.booking.description,
		date: this.props.booking.date,
		time: this.props.booking.time
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { title, description, date, time } = this.state;

		axios.put(`${process.env.REACT_APP_SERVER}/bookings/${this.props.booking._id}`, { title, description, date, time })
			.then(() => {
				this.props.history.push('/services');
			});
	}

	deleteBooking = () => {
		const { params } = this.props.match;
		axios.delete(`${process.env.REACT_APP_SERVER}/services/${params.id}`)
			.then(() => {
				//return <Redirect to='/services' />
				this.props.history.push('/services');
			})
	}



	render() {
		return (
			<div>
				<h3>Edit Form</h3>
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
			</div>
		)
	}

}

export default EditBooking;