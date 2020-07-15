import React from 'react';
import './Profile.css';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Profile extends React.Component {

    state = {
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
        const {userInfo} = this.props;


        return (
            <>
                <h1>Profile</h1>


                <Form>
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
                                <Input type="password" name="password" id="examplePassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" disabled value={userInfo.password} onChange={this.handleChange} />
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

        {/* phone:'',
        type:'',
        company:'',
        birthday:'',
        photoPath: */} 

                    

                    <FormGroup>
                        <Label for="typeofuser">Role</Label>
                        <Input type="select" name="type" id="typeofuser">
                        <option id="worker" value={userInfo.lastName}>Providing services</option>
                        <option id="client">Looking for services</option>
                        <option id="combo">Both</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Radio Buttons</legend>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Option one is this and that—be sure to include why it's great
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Option two can be something else and selecting it will deselect option one
                        </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                        <Label check>
                                <Input type="radio" name="radio1" disabled />{' '}
                                Option three is disabled
                            </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" />{' '}
                            Check me out
                            </Label>
                        </FormGroup>
                        <Button>Submit</Button>
                        </Form>         

            </>
        )
    }
}

export default Profile;