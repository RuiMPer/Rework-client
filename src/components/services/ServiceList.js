import React, { Component } from 'react';
import axios from 'axios';
//import moment from 'moment';
//import { Link } from 'react-router-dom';
import AddService from './AddService';
//import AddNotification from '../notifications/AddNotification';
import './css/ServiceList.css';
import {
    Card, CardBody, CardLink,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class ServiceList extends Component {

    state = {
        listOfServices: [],
        showAddService: false
    }

    componentDidMount() {
        this.getUserServices();
    }
    getUserServices = () => {
        this.setState({ showAddService: false });
        // Get list of service from the API we just built
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
        });
        return (service.get(`/services`)
            .then(responseFromAPI => {
                // console.log(responseFromAPI)
                // console.log("ISTO", responseFromAPI.data)
                // console.log(this.props)
                this.setState({
                    listOfServices: responseFromAPI.data
                })
            })
        )

    }

    // getAllServices = () => {
    //     // Get list of service from the API we just built
    //     axios.get(`${process.env.REACT_APP_SERVER}/services`)
    //         .then(responseFromAPI => {

    //             this.setState({
    //                 listOfServices: responseFromAPI.data
    //             })
    //         });
    // }

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
                        {showAddService ? "Cancelar" : "Add Service"}
                    </Button>
                </header>

                {showAddService && <>
                    <AddService userId={this.props.loggedInUser._id} refreshServices={this.getUserServices} />
                </>}

                <section className="maincontent servicelist">
                    {!this.state.showAddService && this.state.listOfServices.length === 0 && <> 
                    <div className="noresultswrap">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M15,109.8l48,17c0,0,0,0,0,0c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.4,0c0,0,0.1,0,0.1,0c0.2,0,0.3,0,0.5,0 c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V73.4l10-3.5c0.8-0.3,1.5-1,1.8-1.8s0.2-1.8-0.3-2.6 l-12-20c0,0,0,0,0-0.1c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0-0.1c0,0,0,0,0,0c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1c0,0,0,0-0.1-0.1 c0,0,0,0-0.1,0c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.1-0.1c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.1-0.1-0.2-0.1 c-0.1,0-0.1,0-0.2-0.1c0,0,0,0-0.1,0c0,0,0,0,0,0l-48-17c-0.2-0.1-0.4-0.1-0.6-0.1c0,0-0.1,0-0.1,0c-0.2,0-0.3,0-0.5,0 c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4,0.1-0.6,0.1l-48,17c0,0,0,0,0,0c0,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.1,0.1-0.3,0.1-0.4,0.2 c0,0,0,0,0,0c0,0,0,0,0,0c-0.2,0.1-0.4,0.3-0.6,0.5l0,0c0,0-0.1,0.1-0.1,0.1c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.2c0,0,0,0,0,0 c0,0,0,0-0.1,0.1l-12,20C1,66.2,0.9,67.2,1.2,68s1,1.5,1.8,1.8l10,3.5V107C13,108.3,13.8,109.4,15,109.8z M109,104.9l-42,14.9V95.7 c0-1.7-1.3-3-3-3s-3,1.3-3,3v24.1l-42-14.9V75.5l32,11.3c0.3,0.1,0.7,0.2,1,0.2c1,0,2-0.5,2.6-1.5L64,69.8l9.4,15.7 C74,86.5,75,87,76,87c0.3,0,0.7-0.1,1-0.2l32-11.3V104.9z M67,34.2L103,47L67,59.8V34.2z M77.3,80.4l-8.9-14.8l42.2-15l8.9,14.8 L77.3,80.4z M17.3,50.6l42.2,15l-8.9,14.8l-42.2-15L17.3,50.6z"></path></svg>
                            <p className="noresults">There is still no services to show.</p>
                    </div>
                    </>}

                        {this.state.listOfServices.map(service => {
                        return (
                            <div key={service._id}>
                                <Card to={`/services/${service._id}`}>
                                    <CardBody>
                                        <CardTitle>{service.title}</CardTitle>
                                        <CardSubtitle>CATEGORY: {service.category}</CardSubtitle>
                                    </CardBody>
                                    <img width="100%" src={(service.photoPath !== 'unknown' || service.photoPath !== '') ? (service.photoPath) : ('https://picsum.photos/200')} alt="Card cap" />
                                    <CardBody>
                                        <CardLink href="#">Book now</CardLink>
                                        <CardLink href={`/services/${service._id}`}>Know more</CardLink>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })}
                    {/* <AddNotification /> */}
                </section>
            </>
        )
    }
}

export default ServiceList;