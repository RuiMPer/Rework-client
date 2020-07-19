import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import AddService from './AddService';
import AddNotification from '../notifications/AddNotification';
import './css/ServiceList.css';
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

class ServiceList extends Component {

    state = {
        listOfServices: [],
        showAddService: false
    }

    componentDidMount() {
        this.getAllServices();
    }

    getAllServices = () => {
        // Get list of service from the API we just built
        axios.get(`${process.env.REACT_APP_SERVER}/services`)
            .then(responseFromAPI => {

                this.setState({
                    listOfServices: responseFromAPI.data
                })
            });
    }

    showAddService = () => {
        const { showAddService } = this.state;
        showAddService ? this.setState({ showAddService: false }) : this.setState({ showAddService: true })
    }

    render() {
        const { showAddService } = this.state
        return (
            <>

                <header className="header">
                    <h1>My Services</h1> 
                    <Button onClick={() => this.showAddService()} className={showAddService ? 'openAdd' : null} >
                        {showAddService ? "Cancelar" : "Add Service" }
                    </Button>
                </header>

                {showAddService && <>
                    <AddService userId={this.props.loggedInUser._id} refreshServices={this.getAllServices} />
                </>}

                <section className="maincontent servicelist">
                    {this.state.listOfServices.map(service => {
                        return (
                            <div key={service._id}>
                                    <Card to={`/services/${service._id}`}>
                                        <CardBody>
                                            <CardTitle>{service.title}</CardTitle>
                                            <CardSubtitle>CATEGORY</CardSubtitle>
                                        </CardBody>
                                            <img width="100%" src={(service.photoPath!='unknown'||service.photoPath!='')?(service.photoPath):('https://picsum.photos/200')} alt="Card image cap" />
                                        <CardBody>
                                            <CardLink href="#">Book now</CardLink>
                                            <CardLink href={`/services/${service._id}`}>Know more</CardLink>
                                        </CardBody>
                                    </Card>
                            </div>
                        );
                    })}
                    <a onClick={() => this.showAddService()} href="#">Add Service</a>
                    {this.state.showAddService && <div style={{ width: '50%', float: 'right' }}>
                        <AddService userId={this.props.loggedInUser._id} refreshServices={this.getAllServices} />
                    </div>}
                    <AddNotification />
                </section>
            </>
        )
    }
}

export default ServiceList;