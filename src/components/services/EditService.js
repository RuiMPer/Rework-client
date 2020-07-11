import React, { Component } from 'react';
import axios from 'axios';

class EditService extends Component {
    state = {
        title: this.props.location.state.title,
        category: this.props.location.state.category,
        description: this.props.location.state.description,
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, category, description } = this.state;
        const { params } = this.props.match;
        axios.put(`https://rework-project.herokuapp.com/api/services/${params.id}`, { title, category, description })
            .then(() => {
                this.props.history.push('/services');
            });
    }

    render() {
        return (
            <div>
                <h3>Edit Form</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Category</label>
                    <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }

}

export default EditService;