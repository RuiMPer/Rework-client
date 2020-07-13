import React, { Component } from 'react';
import axios from 'axios';

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
				<form onSubmit={this.handleFormSubmit}>
					<label>Title</label>
					<input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
					<label>Description</label>
					<input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
					<label>Date</label>
					<input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
					<label>Time</label>
					<input type="text" name="time" value={this.state.time} onChange={this.handleChange} />
					<input type="submit" value="submit" />
				</form>
			</div>
		)
	}

}

export default EditBooking;