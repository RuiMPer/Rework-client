import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

class AddService extends Component {
    state = {
        category: [],
        title: '',
        description: '',
        photoPath: null,
        author: "",
        errorMessage: '',
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (e) => {
        this.setState({ photoPath: e.target.files[0] });
        // let files = e.target.files;
        // this.setState({ 'photoPath': files })
        //this.setState({ photoPath: event.target.files[0] });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { category, title, description, photoPath } = this.state
        const userId = this.props.userId
        const uploadData = new FormData()
        uploadData.append("photoPath", photoPath)
        // const { category, title, description, photoPath } = this.state;
        // const userId = this.props.userId;
        // const uploadData = new FormData();

        // let files = this.state.photoPath;
        // console.log(files)
        // for (let i = 0; i < files.length; i++) {
        //     uploadData.append("photoPath", files[i], files[i].name);
        // }

        
        //uploadData.append("photoPath", photoPath);

        if (!category || !title || !description || !photoPath) {
            this.setState({ errorMessage: "All fields are compulsory! Complete your form, please." });
        }
        else{
            this.setState({ errorMessage:''});
        }

        // axios.post(`${process.env.REACT_APP_SERVER}/uploadMultiple`, uploadData)
        axios.post(`${process.env.REACT_APP_SERVER}/upload`, uploadData)
            .then((response) => {
                console.log("USer", userId)
                console.log('image uploaded', response);
                axios.post(`${process.env.REACT_APP_SERVER}/services`, { category, title, description, photoPath: response.data.photoPath, author: userId })
                    .then((response) => {
                        console.log('service created', response);
                        this.props.refreshServices();
                        this.setState({ category: [], title: '', description: "", photoPath: [], author: "" });
                        toast('Service created with super success!');
                    })
            })
    }


    render() {
        return (
            <div>
                <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
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
                        <Input type="file" name="file" onChange={this.handleFileChange} multiple/>
                        <FormText color="muted">
                            Add relevant photos to illustrate the services you provide.
                        </FormText>
                    </FormGroup>
                    <Button>Submit</Button>
                    {this.state.errorMessage &&
                        <p className="error" style={{marginTop:"10px"}}> {this.state.errorMessage} </p>}
                </Form>
            </div>
        )
    }
}

export default AddService;





