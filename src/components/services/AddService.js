import React, { Component } from 'react';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';

class AddProject extends Component {
    state = {
        title:'',
        description: ''
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        axios.post('http://localhost:5000/api/services', {title, description})
            .then(() => { 
                //1. Lift the state up and push new project into the state that lives on projectlist
                //2. Call the api to get all projects again
                this.props.refreshProjects();
                this.setState({title: '', description: ''});

                //giving feedback
                toast('Project created!');
            })
    }

    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />

                    <input type="submit" value="Submit" />
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddProject;





