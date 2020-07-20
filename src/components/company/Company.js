
// title: String,
// workers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// logoPath: String, //cloudinary
// logoName: String, // cloudinary
// locationPin: String, //google maps
// phone: String, 
// service: [{ type: Schema.Types.ObjectId, ref: 'Service' }], 
// admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// verified: Boolean

import React from 'react';
import './Company.css';
import axios from 'axios';
import {toast}  from 'react-toastify';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Company extends React.Component {

    state = {
        isBeingEdited:false,

        title: '',
        logoPath: '',
        tempPhotoPath:'',
        logoName: `${this.state}'s logo`,
        locationPin: '',
        phone: '',
        admins:[],
        workers:[],
        verified:'',
        companyProof:''
    }

    componentDidMount(){
        console.log("component did mount");

        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
            });

        return (
            service.get(`/company`)
                .then((response) => {
                    let { title, logoPath, logoName, locationPin, phone, admins, workers, verified, companyProof } = response.data;
                    this.setState({
                        title,
                        logoPath,
                        logoName,
                        locationPin,
                        phone,
                        admins,
                        workers,
                        verified, 
                        companyProof
                    });
                })
            .catch((err) => {
                return err;
            })
        );

    }

    handleChange = (event) => {
        console.log("change handle");
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        this.setState({ tempPhotoPath: event.target.files[0] });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        
        //save edit to bd
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
        });

        let { title, logoPath, logoName, locationPin, phone, admins, verified, companyProof } = this.state;
        service.post(`/company`, { title, logoPath, logoName, locationPin, phone, admins, verified, companyProof}, { withCredentials: true } )
            .then((response) => {
                console.log("success", response)
                toast('Company created!');
            })
    }

    // Button to toggle edit mode
    makeEdit(){
        this.setState({
            isBeingEdited: !this.state.isBeingEdited
        });
    }


    render() {
        console.log("render")
        /* getting props/state with all info from user destructured */
        //const {userInfo} = this.state;
        let { title, logoPath, locationPin, phone, admins, verified, companyProof } = this.state;

        return (
            <>
                <header className="header">
                    <h1>My Company</h1> 
                    <div className="toTheRight">
                        <Button color="primary" onClick={this.handleFormSubmit} >Save</Button>
                        <Button
                            onClick={() => this.makeEdit()}>
                            {this.state.isBeingEdited ? "View Mode" : "Edit"}
                        </Button>
                    </div>
                </header>
                

                <Form onSubmit={this.handleFormSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="companyName">Name</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="text" name="title" id="title" placeholder="Escreve o nome da tua empresa aqui..." value={title} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="username">Phone</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="text" name="phone" id="phone" placeholder="Escreve o telefone aqui..." value={phone} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Admin of this Company</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="select" name="type" id="admins" value={admins} onChange={this.handleChange}>
                                    <option value="" disabled >Responsável pela tua empresa</option>
                                    <option value={this.props.loggedInUser}>Eu próprio</option>
                                    <option>Outro</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Location Pin</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="text" name="locationPin" id="locationPin" placeholder="Localiza a tua empresa no mapa..." value={locationPin} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="logo">Logo</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="file" name="file" id="logoPath" value={logoPath}/>
                                <FormText color="muted">
                                    Insert your company logo here.
                                </FormText>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <h5 for="verified">Is your company verified?</h5>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" value={verified}/>{' '}
                                    Verify Company
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="certificate">Certificate Document</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="file" name="file" id="companyProof" value={companyProof}/>
                                <FormText color="muted">
                                    Insert your company proof document here.
                                </FormText>
                            </FormGroup>
                        </Col>

                            
                    </Row>

                </Form>         

            </>
        )
    }
}

export default Company;