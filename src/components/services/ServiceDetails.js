import React, { Component } from 'react';
import axios from 'axios';
import "./css/ServiceDetails.css";
import { Link } from 'react-router-dom';
import AddBooking from '../bookings/AddBooking';
import EditBooking from '../bookings/EditBooking';
import AddToCalendar from 'react-add-to-calendar';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
//import Example from './Caroussel';
import moment from 'moment';

class ServiceDetails extends Component {
    //1. Option one
    /*state = {
        title: '',
        description: ''
    }*/

    //2. Option two
    state = {
        showEditBooking: false,
        showAddBooking: false,
        event: {
            title: "",
            description: "",
            location: "",
            startTime: "",
            endTime: ""
        }
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
        this.state.showEditBooking ? this.setState({ showEditBooking: false }) : this.setState({ showEditBooking: true, showAddBooking: false })
    }
    closeOptions = () => {
        this.setState({ showEditBooking: false, showAddBooking: false })
    }
    deleteBooking = (booking) => {
        const { params } = this.props.match;
        console.log(booking)
        axios.delete(`${process.env.REACT_APP_SERVER}/bookings/${booking._id}`)
            .then(() => {
                //return <Redirect to='/services' />
                this.props.history.push(`/services`);
            })
    }

    handleDate = (date) => {
        const newDate = moment(date).format("DD/MM/YYYY")
        return newDate
    }
    handleCalendarDate = (date, time) => {
        let dateTime = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm');

        return dateTime
    }


    // 1. Happens first
    render() {
        let icon = { textOnly: 'none' }
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
                                                <li>Date: {this.handleDate(booking.date)}</li>
                                                <li>Time: {booking.time}</li>
                                                <li>Client: {booking.client}</li>
                                                {/* <li><button onClick={() => { this.handleNotification(booking) }}>TESTE:</button></li> */}
                                                <li><button onClick={this.showEditBooking}>Edit</button></li>
                                                <li><button onClick={() => { this.deleteBooking(booking) }}>Delete</button></li>
                                                {this.state.showEditBooking && <EditBooking booking={booking} {...this.props} />}
                                                <AddToCalendar event={{ title: booking.title, description: booking.description, startTime: this.handleCalendarDate(this.handleDate(booking.date), booking.time), endTime: this.handleCalendarDate(this.handleDate(booking.date), booking.time) }} buttonTemplate={icon} />
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div> : null}
                        </TabPane>
                        <TabPane tabId="3">
                            {this.state.activeTab == 3 ? <h4>Coming soon...</h4> : null}
                        </TabPane>
                    </TabContent>
                </div>
                {this.state.showAddBooking && <AddBooking getService={this.getSingleService} serviceId={this.props.match.params.id} />}
            </>
        )
    }
}

export default ServiceDetails;
