import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
<<<<<<< HEAD
        const loggedInUser = this.props;
        const uploadData = new FormData();
=======
        const userId = this.props.userId
        const uploadData = new FormData()
>>>>>>> 92d23c5e686cb8b480302cc0616a3d527d83a576
        uploadData.append("photoPath", this.state.photoPath)

        axios.post(`${process.env.REACT_APP_SERVER}/upload`, uploadData)
            .then((response) => {
<<<<<<< HEAD
                console.log(loggedInUser);
                console.log('image uploaded', response);
                axios.post(`${process.env.REACT_APP_SERVER}/services`, { category, title, description, photoPath: response.data.photoPath, author: loggedInUser._id })
=======
                console.log("USer", userId)
                console.log('image uploaded', response);
                axios.post(`${process.env.REACT_APP_SERVER}/services`, { category, title, description, photoPath: response.data.photoPath, author: userId })
>>>>>>> 92d23c5e686cb8b480302cc0616a3d527d83a576
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
                {/* <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Category</label>
                    <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <input type="file" name="file" onChange={this.handleFileChange} />
                    <input type="submit" value="Submit" />
                </form> */}
                <Form onSubmit={this.handleFormSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">File</Label>
                        <Input type="file" name="file" onChange={this.handleFileChange} />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddService;





