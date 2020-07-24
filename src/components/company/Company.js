
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
import { ToastContainer, toast } from 'react-toastify';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Company extends React.Component {

    state = {
        isBeingEdited:false,

        isAdmin:'',
        title: '',
        tempLogoPath: '',
        logoPath:'',
        logoName: `${this.title}'s logo`,
        locationPin: '',
        phone: '',
        admins:[],
        workers:[],
        verified:false,
        companyProof:''
    }

    componentDidMount(){
        console.log("component did mount");
        console.log('PROPSSSSS',this.props.loggedInUser)

        let companyId = this.props.match.params.id;
        console.log("pre", this.props.match.params.id)

        if(this.props.match.params.id){
            console.log("ENTROUUUUU", this.props.match.params.id)
            let service = axios.create({
                baseURL: `${process.env.REACT_APP_SERVER}`,
                withCredentials: true
            });

            return (
                service.get(`/company/${companyId}`)
                    .then((response) => {
                        let { title, logoPath, logoName, locationPin, phone, admins, workers, isAdmin, verified, companyProof } = response.data;
                        this.setState({
                            title,
                            logoPath,
                            logoName,
                            locationPin,
                            phone,
                            admins,
                            workers,
                            verified, 
                            companyProof,
                            isAdmin
                        });
                    })
                .catch((err) => {
                    return err;
                })
            );
        }

    }

    handleChange = (event) => {
        console.log("change handle");
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        this.setState({ tempLogoPath: event.target.files[0] });
        console.log(this.state.tempLogoPath);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        
        //save edit to bd
        // let service = axios.create({
        //     baseURL: `${process.env.REACT_APP_SERVER}`,
        //     withCredentials: true
        // });

        let { title, logoPath, logoName, locationPin, phone, verified, companyProof, isAdmin } = this.state;

        if(this.state.tempLogoPath===""){
            let service = axios.create({
                baseURL: `${process.env.REACT_APP_SERVER}`,
                withCredentials: true
            });

            return service.post(`${process.env.REACT_APP_SERVER}/company`, { title, logoName, locationPin, phone, verified, companyProof, isAdmin, logoPath:this.state.tempLogoPath })
            .then(response => {
                console.log("success without photo", response);

                //notification success
                toast('Company was updated!');
                //return no view mode
                this.setState({
                    isBeingEdited:false
                });

                let id=response.data.response._id;
                this.props.history.push(`/company/${id}`);
            });
        }
        else{
            const uploadData = new FormData();
            uploadData.append("photoPath", this.state.tempLogoPath);
    
            // save in cloudinary
            axios.post(`${process.env.REACT_APP_SERVER}/upload`, uploadData)
            .then((response) => {
                console.log("goes to cloudinary", response)
                this.setState({logoPath: response.data.photoPath });
                
                let service = axios.create({
                    baseURL: `${process.env.REACT_APP_SERVER}`,
                    withCredentials: true
                });

                return service.post(`${process.env.REACT_APP_SERVER}/company`, { title, logoPath, logoName, locationPin, phone, verified, companyProof, isAdmin, logoPath:this.state.logoPath })
                .then(response => {
                            console.log("success with photo", response);

                            //notification success
                            toast('Profile was updated!');
                            //return no view mode
                            this.setState({
                                isBeingEdited:false
                            });

                            let id=response.data.response._id;

                            this.props.history.push(`/company/${id}`);
                    });
            });
        }

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
        let { title, logoPath, locationPin, phone, verified, companyProof } = this.state;

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
                
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Form onSubmit={this.handleFormSubmit} className="mycompany">
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
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="select" name="isAdmin" id="isAdmin" value={this.state.isAdmin} onChange={this.handleChange}>
                                    <option value="" disabled >Responsável pela tua empresa</option>
                                    <option>Eu próprio</option>
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
                        <Col md={3}>
                            <img src={this.state.logoPath} alt="company logo" width="300" style={{ borderRadius: '50%' }} />
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Logo</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="file" name="file" id="logoPath" onChange={this.handleFileChange}/>
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
                                <h5 >Is your company verified?</h5>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" value={verified} onChange={this.handleChange}/>{' '}
                                    Verify Company
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="certificate">Certificate Document</Label>
                                <Input disabled={(!this.state.isBeingEdited) ? "disabled" : "" } type="file" name="file" id="companyProof" value={companyProof} onChange={this.handleFileChange}/>
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