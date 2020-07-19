import React, { Component } from 'react';
import axios from 'axios';
import "./css/ServiceDetails.css";
import { Link } from 'react-router-dom';
import AddBooking from '../bookings/AddBooking';
import EditBooking from '../bookings/EditBooking';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Example from './Caroussel';


class ServiceDetails extends Component {
    //1. Option one
    /*state = {
        title: '',
        description: ''
    }*/

    //2. Option two
    state = {
        showEditBooking: false,
        showAddBooking: false
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }
    getSingleService = () => {
        //id of the service is on the url /services/1234567
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/services/${params.id}`)
            .then(responseFromAPI => {
                const service = responseFromAPI.data;
                console.log('service found', service);
                this.setState(service);
            })
    }

    // 2. Happens second
    componentDidMount() {
        this.getSingleService();
    }

    deleteService = () => {
        const { params } = this.props.match;
        axios.delete(`${process.env.REACT_APP_SERVER}/services/${params.id}`)
            .then(() => {
                this.props.history.push('/services');
            })
    }

    showAddBooking = () => {
        this.state.showAddBooking ? this.setState({ showAddBooking: false }) : this.setState({ showAddBooking: true, showEditBooking: false })
    }
    showEditBooking = () => {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        this.state.showEditBooking ? this.setState({ showEditBooking: false }) : this.setState({ showEditBooking: true, showAddBooking: false })
    }
    closeOptions = () => {
        this.setState({ showEditBooking: false, showAddBooking: false })
    }


    // 1. Happens first
    render() {
        const { params } = this.props.match;
        return (
            <>
                <Row >
                    <Col xs="1"><a href="/services">Back</a></Col>
                    <Col xs="6">{this.state.title}</Col>
                    <Col xs="2">
                        <Link to={{
                            pathname: `/services/${params.id}/edit`,
                            state: {
                                title: this.state.title,
                                description: this.state.description,
                                category: this.state.category,
                                photoPath: this.state.photoPath
                            }
                        }}>Edit Service</Link>
                    </Col>
                    <Col ><a onClick={() => this.showAddBooking()} href="#">Add Booking</a></Col>
                </Row>
                {this.props.loggedInUser &&
                    <div>
                        <Button onClick={() => this.deleteService()}>Delete Service</Button>
                    </div>
                }
                <div>
                    <Nav tabs >
                        <div>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); this.closeOptions() }}
                                >
                                    Information
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); this.closeOptions() }}
                                >
                                    Bookings
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); this.closeOptions() }}
                                >
                                    Clients
                            </NavLink>
                            </NavItem>
                        </div>
                        <div>
                            <p>Vista</p>
                        </div>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {this.state.activeTab == 1 ?
                                <div>
                                    <Row>
                                        <Col>Service Photo</Col>
                                        <Col>Category</Col>
                                        <Col>Description</Col>
                                    </Row>
                                    <Row>
                                        <Col><img src={this.state.photoPath} alt={this.state.photoName} /></Col>
                                        <Col><p>{this.state.category}</p></Col>
                                        <Col><p>{this.state.description}</p></Col>
                                    </Row>
                                </div>
                                : null}
                        </TabPane>
                        <TabPane tabId="2">
                            {this.state.activeTab == 2 ? <div>
                                {this.state.bookings.map(booking => {
                                    return (
                                        <div key={booking._id}>
                                            <ul>
                                                <li>Title: {booking.title}</li>
                                                <li>Description: {booking.description}</li>
                                                <li>Date: {booking.date}</li>
                                                <li>Time: {booking.time}</li>
                                                <li>Client: {booking.client}</li>
                                                <li><button onClick={this.showEditBooking}>Edit</button></li>
                                                {this.state.showEditBooking && <EditBooking booking={booking} {...this.props} />}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div> : null}
                        </TabPane>
                        <TabPane tabId="3">
                            {this.state.activeTab == 3 ? <h4>Available in future Update</h4> : null}
                        </TabPane>
                    </TabContent>
                </div>
                {/* <div>
                    <a onClick={() => this.showInfo()} href="#">Information</a>
                    <a onClick={() => this.showBooking()} href="#">Bookings</a>
                    <a onClick={() => this.showClient()} href="#">Clients</a>
                </div> */}

                {/* {this.state.showInfo && <div>
                    <img src={this.state.photoPath} />
                    <h3>Category</h3>
                    <p>{this.state.category}</p>
                    <h3>Description</h3>
                    <p>{this.state.description}</p>
                </div>} */}
                {/* <Example/> */}
                {this.state.showAddBooking && <AddBooking getService={this.getSingleService} serviceId={this.props.match.params.id} />}
                {/* <div>
                    {this.state.showBooking && this.state.bookings.map(booking => {
                        return (
                            <div key={booking._id}>
                                <ul>
                                    <li>Title: {booking.title}</li>
                                    <li>Description: {booking.description}</li>
                                    <li>Date: {booking.date}</li>
                                    <li>Time: {booking.time}</li>
                                    <li>Client: {booking.client}</li>
                                    <li><button onClick={this.showEditBooking}>Edit</button></li>
                                    {this.state.showForm && <EditBooking booking={booking} {...this.props} />}
                                    {this.state.showEditBooking && <EditBooking booking={booking} {...this.props} />}
                                </ul>
                            </div>
                        )
                    })}
                </div> */}
            </>
        )
    }
}

export default ServiceDetails;
