import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class AddService extends Component {
    state = {
        category: [],
        title: '',
        description: '',
        photoPath: [],
        author: ""
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { category, title, description } = this.state
        const loggedInUser = this.props;
        const uploadData = new FormData();
        uploadData.append("photoPath", this.state.photoPath)

        axios.post(`${process.env.REACT_APP_SERVER}/upload`, uploadData)
            .then((response) => {
                console.log(loggedInUser);
                console.log('image uploaded', response);
                axios.post(`${process.env.REACT_APP_SERVER}/services`, { category, title, description, photoPath: response.data.photoPath, author: loggedInUser._id })
                    .then((response) => {
                        console.log('service created', response);
                        this.props.refreshServices();
                        this.setState({ category: [], title: '', description: "", photoPath: [], author: "" });
                        toast('Service created!');
                    })
            })
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        this.setState({ photoPath: event.target.files[0] });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Category</label>
                    <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <input type="file" name="file" onChange={this.handleFileChange} />

                    <input type="submit" value="Submit" />
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddService;





