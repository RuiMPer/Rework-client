import React, { Component } from "react";
 
// import the service file since we need it to send (and get) the data to(from) server
import axios from 'axios';
 
class AddImage extends Component {
    state = {
        name: "",
        description: "",
        file: "",
        feedbackMessage: ""
    };
    
    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("imageUrl", this.state.file);
        axios.post(`${process.env.BACKEND_URL}/upload`, uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                axios.post(`${process.env.BACKEND_URL}/images/create`, {
                    name: this.state.name,
                    description: this.state.description,
                    imageUrl: response.data.imageUrl
                })
                .then((response) => {
                    console.log('image created', response);
                    this.setState({ name: '', description: '', file: '', feedbackMessage: 'Image uploaded sucessfully'});
                })
            })
    }  
    
    render() {
        return (
          <div>
            <h2>New Image</h2>
            <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={ this.state.name } 
                    onChange={this.handleChange} />
                <label>Description</label>
                <textarea 
                    type="text" 
                    name="description" 
                    value={ this.state.description } 
                    onChange={this.handleChange} />
                <input type="file" onChange={this.handleFileChange} /> 
                <button type="submit">Save new image</button>
            </form>
            <div>{this.state.feedbackMessage}</div>
          </div>
        );
    }
}
 
export default AddImage;