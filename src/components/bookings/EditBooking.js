import React, { Component } from 'react';
import axios from 'axios';

class EditBooking extends Component {
	state = {
		title: this.state.title,
		description: this.state.description,
		date: this.state.date,
		time: this.state.time
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { title, description, date, time } = this.state;
		const { params } = this.props.match;
		axios.put(`https://rework-project.herokuapp.com/api/services/${params.id}`, { title, description, date, time })
			.then(() => {
				this.props.history.push('/services');
			});
	}

	deleteBooking = () => {
		const { params } = this.props.match;
		axios.delete(`https://rework-project.herokuapp.com/api/services/${params.id}`)
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