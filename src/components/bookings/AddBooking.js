import React, { Component } from 'react';
import axios from 'axios';

class AddBooking extends Component {
    state = {
        title: '',
        description: ''
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, description } = this.state;
        const service = this.props.serviceId;
        axios.post('http://localhost:5000/api/bookings', { title, description, service })
          .then(() => {
            this.props.getService();
            this.setState({title: '', description: ''});
          })
    }

    render() {
        return(
            <div>
                <h3>Add Booking</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <input type="submit" value="submit" />
                 </form>
            </div>
        )
    }
}

export default AddBooking;