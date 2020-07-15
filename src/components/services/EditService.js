import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

class EditService extends Component {
    state = {
        title: this.props.location.state.title,
        category: this.props.location.state.category,
        description: this.props.location.state.description,
        photoPath: this.props.location.state.photoPath
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, category, description } = this.state;
        const { params } = this.props.match;
        const uploadData = new FormData()
        uploadData.append("photoPath", this.state.photoPath)

        axios.post(`${process.env.REACT_APP_SERVER}/upload`, uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                axios.put(`${process.env.REACT_APP_SERVER}/services/${params.id}`, { title, category, description, photoPath: response.data.photoPath })
                    .then((response) => {
                        toast('Service Updated!')
                        this.props.history.push('/services')
                    })
            })
        // axios.put(`${process.env.REACT_APP_SERVER}/services/${params.id}`, { title, category, description })
        //     .then(() => {
        //         this.props.history.push('/services');
        //     });
    }

    handleFileChange = (event) => {
        this.setState({ photoPath: event.target.files[0] });
    }
    render() {
        const { params } = this.props.match;
        return (
            <div>
                <Link to={{ pathname: `/services/${params.id}` }}>Back</Link>
                <h3>Edit Service</h3>
                {/* <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <label>Category</label>
                    <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    <label>Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <input type="submit" value="submit" />
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
                                <Input type="category" name="category" value={this.state.category} onChange={this.handleChange} />
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

export default EditService;