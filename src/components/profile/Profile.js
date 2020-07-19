import React from 'react';
import './Profile.css';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading/Loading';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Profile extends React.Component {

    state = {
        userInfo:[],
        isBeingEdited:false,

        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phone:'',
        type:'',
        company:'',
        birthday:'',
        photoPath: '',

        loading:true
    }

    componentDidMount(){
        console.log("component did mount");

        let userId = this.props.match.params.userId;
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
            });

        return (
        
            service.get(`/profile/${userId}`)
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
                        photoPath:photoPath,

                        loading: false
                    });
                    console.log(response.data)
                    console.log("PHOTO PATH COMING FROM SERBVER", photoPath);

                })
            .catch((err) => {
                return err;
            })
        );

    }

    handleChange = (event) => {
        console.log("change handle")
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        this.setState({ photoPath: event.target.files[0] });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        let userId = this.props.match.params.userId;
        let { firstName, lastName, username, password, email, phone, type, birthday, photoPath } = this.state;
        console.log("PHOTO PATH COMING FROM STATE", photoPath);

        // upload profile pic
        const uploadData = new FormData();
        uploadData.append("photoPath", {photoPath});

        // save in cloudinary
        axios.post(`${process.env.REACT_APP_SERVER}/upload`, uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                //until here the photo is correct

                axios.post(`${process.env.REACT_APP_SERVER}/profile/${userId}`, { firstName, lastName, username, password, email, phone, type, birthday, photoPath:[response.data.photoPath]} )
                .then((response) => {
                    console.log("success", response);

                    //notification success
                    toast('Profile was updated!');
                    //return no view mode
                    this.setState({
                        isBeingEdited: false
                    });
                })
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
        let { firstName, lastName, username, email, phone, type, company, birthday, photoPath, loading, isBeingEdited } = this.state;

        return (
            <>  

                {loading && <Loading/>}

                <header className="header">
                    <h1>Profile</h1> 
                    <Button 
                        onClick={()=>this.makeEdit()}>
                        {isBeingEdited ? "View Mode" : "Edit" }
                    </Button>
                </header>
                
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Form onSubmit={this.handleFormSubmit}>
                    <Row form>
                        <Col md={3}>
                            <img src={photoPath} alt="profile user" width="300" style={{borderRadius:'50%'}}/>
                        </Col>
                        <Col md={9}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="text" name="username" id="username" placeholder="Escreve o teu username aqui..." value={username} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="email" name="email" id="email" placeholder="Escreve o teu email aqui..." value={email} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/><p className="text-info">Security information</p><hr/>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="password" name="password" id="examplePassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" disabled /* value={userInfo.password} */ onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="text" name="firstName" id="firstName" placeholder="Escreve o teu primeiro nome aqui..." value={firstName} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="text" name="lastName" id="lastName" placeholder="Escreve o teu último nome aqui..." value={lastName} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Phone</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="text" name="phone" id="phone" placeholder="Escreve o teu contacto aqui..." value={phone} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Birthday</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="text" name="birthday" id="birthday" placeholder="Escolhe a tua data de aniversário..." value={birthday} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <br/><p className="text-info">Professional details</p><hr/>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="text" name="company" id="company" placeholder="Escreve o nome da tua empresa aqui" value={company} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row>


                    <FormGroup>
                        <Label for="typeofuser">Role</Label>
                        <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="select" name="type" id="typeofuser" value={type} onChange={this.handleChange}>
                            <option value="" disabled >Select your option</option>
                            <option id="worker" >Providing services</option>
                            <option id="client" >Looking for services</option>
                            <option id="combo" >Both</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleFile">Profile Photo</Label>
                        <Input disabled={(!isBeingEdited) ? "disabled" : "" } type="file" name="file" id="photoPath" onChange={this.handleFileChange}/>
                        <FormText color="muted">
                            Insert your profile photo here.
                        </FormText>
                    </FormGroup>

                    <Button>Save</Button>
                </Form>         

            </>
        )
    }
}

export default Profile;