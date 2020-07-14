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
        return (
            <>
                <h1>Profile</h1>

                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" disabled />
                            </FormGroup>
                        </Col>
                    </Row>

                    

                    <FormGroup>
                        <Label for="exampleSelect">Role</Label>
                        <Input type="select" name="type" id="exampleSelect">
                        <option value="worker">Providing services</option>
                        <option value="client">Looking for services</option>
                        <option value="combo">Both</option>
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