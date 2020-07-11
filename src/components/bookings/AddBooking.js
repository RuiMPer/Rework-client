import React, { Component } from 'react';
import axios from 'axios';

class AddBooking extends Component {
    state = {
        title: '',
        description: '',
        date: Date,
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
        axios.post('http://localhost:5000/api/bookings', { title, description, service, date, time })
            .then(() => {
                this.props.getService();
                this.setState({ title: '', description: '', date: "", time: "" });
            })
    }

    render() {
        return (
            <div>
                <h3>Add Booking</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <label>Date</label>
                    <input type="date" name="description" value={this.state.date} onChange={this.handleChange} />
                    <label>Time</label>
                    <input type="text" name="time" value={this.state.time} onChange={this.handleChange} />


                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default AddBooking;