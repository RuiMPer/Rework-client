import React from 'react';
import './Profile.css';
import axios from 'axios';

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
        let userId = this.props.match.params.userId;
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
            });

        return service.get(`/profile/${userId}`)
        .then((response) => {
            console.log('USER INFO AXIOS', response)
            this.setState({userInfo: response.data});
        })
        .catch((err) => {
            return err;
        })

    }



    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, username, password, email, phone, type, company, birthday, photoPath } = this.state;
        //save edit to bd
    }


    render() {
        /* getting props with all info from user destructured */
        const {userInfo} = this.state;

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
                                <Input type="email" name="email" id="exampleEmail" placeholder="Escreve o teu email aqui..." value={userInfo.email} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="Escreve o teu username aqui..." value={userInfo.username} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" disabled /* value={userInfo.password} */ onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="Escreve o teu primeiro nome aqui..." value={userInfo.firstName} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Escreve o teu último nome aqui..." disabled value={userInfo.lastName} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Phone</Label>
                                <Input type="text" name="phone" id="phone" placeholder="Escreve o teu contacto aqui..." value={userInfo.phone} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Birthday</Label>
                                <Input type="text" name="birthday" id="birthday" placeholder="Escolhe a tua data de aniversário..." value={userInfo.birthday} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Input type="text" name="company" id="company" placeholder="Escreve o nome da tua empresa aqui" value={userInfo.company} onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>


                    <FormGroup>
                        <Label for="typeofuser">Role</Label>
                        <Input type="select" name="type" id="typeofuser">
                        <option value="" disabled selected>Select your option</option>
                        <option id="worker" >Providing services</option>
                        <option id="client" >Looking for services</option>
                        <option id="combo" >Both</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Profile Photo</Label>
                        <Input type="file" name="file" id="photoPath" />
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