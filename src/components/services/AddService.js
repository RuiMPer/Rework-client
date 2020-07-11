import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class AddService extends Component {
    state = {
        category: [],
        title: '',
        description: '',
        photoPath: [],
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { category, title, description } = this.state
        const uploadData = new FormData()
        uploadData.append("photoPath", this.state.photoPath)

        axios.post('https://rework-project.herokuapp.com/api/upload', uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                axios.post('https://rework-project.herokuapp.com/api/services', { category, title, description, photoPath: response.data.photoPath })
                    .then((response) => {
                        console.log('image created', response);
                        this.props.refreshServices();
                        this.setState({ category: [], title: '', description: "", photoPath: [] });
                        toast('Service created!');
                    })
            })



        // axios.post('https://rework-project.herokuapp.com/api/services', { category, title, description })
        //     .then(() => {
        //         //1. Lift the state up and push new service into the state that lives on servicelist
        //         //2. Call the api to get all services again
        //         this.props.refreshServices();
        //         this.setState({ category: "", title: '', description: '' });

        //         //giving feedback
        //         toast('Service created!');
        //     })
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
                    <input type="file" onChange={this.handleFileChange} />

                    <input type="submit" value="Submit" />
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddService;





