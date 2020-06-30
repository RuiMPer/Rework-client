import React, { Component } from 'react';
import axios from 'axios';

class AddTask extends Component {
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
        const project = this.props.projectId;
        axios.post('http://localhost:5000/api/tasks', { title, description, project })
          .then(() => {
            this.props.getProject();
            this.setState({title: '', description: ''});
          })
    }

    render() {
        return(
            <div>
                <h3>Add Task</h3>
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

export default AddTask;