import React from 'react';
import './Profile.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Profile extends React.Component {

    state = {
        userInfo:[],

        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phone:'',
        type:'',
        company:'',
        birthday:'',
        photoPath:''
    }

    componentDidMount(){
        console.log("component did mount")
        let userId = this.props.match.params.userId;
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
        });

        

        return service.get(`/profile/${userId}`)
            .then((response) => {
                let { firstName, lastName, username, password, email, phone, type, company, birthday, photoPath } = response.data;
                this.setState({
                    userInfo:response.data,
                    firstName:firstName,
                    email:email,
                    lastName:lastName,
                    username:username,
                    password:password,
                    phone:phone, 
                    type:type, 
                    company:company, 
                    birthday:birthday, 
                    photoPath:photoPath
                });
            })
            .catch((err) => {
                return err;
            })

    }

    handleChange = (event) => {
        console.log("change handle")
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        let userId = this.props.match.params.userId;
        
        //save edit to bd

        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
        });

        let { firstName, lastName, username, password, email, phone, type, birthday, photoPath } = this.state;
        service.post(`/profile/${userId}/edit`, { firstName, lastName, username, password, email, phone, type, birthday, photoPath} )
            .then((response) => {
                console.log("success", response)
                //this.setState({ firstName, lastName, username, password, email, phone, type, company, birthday, photoPath } = response.data);
                toast('Service created!');
            })
    }


    render() {
        console.log("render")
        /* getting props/state with all info from user destructured */
        //const {userInfo} = this.state;
        let { firstName, lastName, username, password, email, phone, type, company, birthday, photoPath } = this.state;

        return (
            <>
                <header className="header">
                    <h1>Profile</h1> <Button>Edit</Button>
                </header>
                

                <Form onSubmit={this.handleFormSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Escreve o teu email aqui..." value={email} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="Escreve o teu username aqui..." value={username} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" disabled /* value={userInfo.password} */ onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="Escreve o teu primeiro nome aqui..." value={firstName} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Escreve o teu último nome aqui..." value={lastName} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Phone</Label>
                                <Input type="text" name="phone" id="phone" placeholder="Escreve o teu contacto aqui..." value={phone} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Birthday</Label>
                                <Input type="text" name="birthday" id="birthday" placeholder="Escolhe a tua data de aniversário..." value={birthday} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Input type="text" name="company" id="company" placeholder="Escreve o nome da tua empresa aqui" value={company} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>


                    <FormGroup>
                        <Label for="typeofuser">Role</Label>
                        <Input type="select" name="type" id="typeofuser" value={type} onChange={this.handleChange}>
                            <option value="" disabled >Select your option</option>
                            <option value="" id="worker" >Providing services</option>
                            <option value="" id="client" >Looking for services</option>
                            <option value="" id="combo" >Both</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleFile">Profile Photo</Label>
                        <Input type="file" name="file" id="photoPath" value={photoPath}/>
                        <FormText color="muted">
                            Insert your profile photo here...
                        </FormText>
                    </FormGroup>

                    <Button>Save</Button>
                </Form>         

            </>
        )
    }
}

export default Profile;