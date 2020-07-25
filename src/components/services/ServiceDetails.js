import React, { Component } from 'react';
import axios from 'axios';
import "./css/ServiceDetails.css";
import { Link } from 'react-router-dom';
import AddBooking from '../bookings/AddBooking';
import EditBooking from '../bookings/EditBooking';
import AddToCalendar from 'react-add-to-calendar';

import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
//import Example from './Caroussel';
import moment from 'moment';

class ServiceDetails extends Component {
    state = {
        showEditBooking: false,
        showAddBooking: false,
        event: {
            title: "",
            description: "",
            location: "",
            startTime: "",
            endTime: ""
        },
        activeTab:'1'
    }

    // constructor(props) {
    //     super(props);
    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //         activeTab: '1'
    //     };
    // }

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
        this.state.showAddBooking ? this.setState({ showAddBooking: false }) : this.setState({ showAddBooking: true, showEditBooking: false });
    }

    showEditBooking = () => {
        this.state.showEditBooking ? this.setState({ showEditBooking: false }) : this.setState({ showEditBooking: true, showAddBooking: false });
    }

    closeOptions = () => {
        this.setState({ showEditBooking: false, showAddBooking: false });
    }

    deleteBooking = (booking) => {
        //const { params } = this.props.match;
        console.log(booking);
        axios.delete(`${process.env.REACT_APP_SERVER}/bookings/${booking._id}`)
            .then(() => {
                //return <Redirect to='/services' />
                this.props.history.push(`/services`);
            })
    }

    handleDate = (date) => {
        const newDate = moment(date).format("DD/MM/YYYY")
        return newDate;
    }

    handleCalendarDate = (date, time) => {
        let dateTime = moment(date + ' ' + time, 'DD/MM/YYYY HH:mm');
        return dateTime;
    }


    // 1. Happens first
    render() {
        let icon = { textOnly: 'none' }
        const { params } = this.props.match;

        return (
            <div className="servicedetails">
                <header className="header">
                        <div className="toTheLeft">
                            <Link to={"/services"}><Button color="link" style={{marginRight:"10px"}}>Back</Button></Link>
                            <h1>Details about <span style={{fontWeight:"100"}}>{this.state.title}</span></h1>
                        </div>
                        
                        <div className="toTheRight">
                            {this.props.loggedInUser && <>
                                <Button color="danger" onClick={() => this.deleteService()}>Delete Service</Button>
                            </>}
                            
                            <Link to={{
                                pathname: `/services/${params.id}/edit`,
                                state: {
                                    title: this.state.title,
                                    description: this.state.description,
                                    category: this.state.category,
                                    photoPath: this.state.photoPath
                                }
                            }}><Button color="info" >Edit Service</Button></Link>

                            <Button color="primary" onClick={this.showAddBooking} >Add Booking</Button>

                            

                        </div>
                </header>

                    <Nav tabs >
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); this.closeOptions() }} >Information </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); this.closeOptions() }}> Bookings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); this.closeOptions() }} >Clients </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {this.state.activeTab === '1' &&
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
                                }
                        </TabPane>
                        <TabPane tabId="2">
                            {this.state.activeTab === '2' && <>

                            {this.state.bookings.length === 0 && <> 
                                <div className="noresultswrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M15,109.8l48,17c0,0,0,0,0,0c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.4,0c0,0,0.1,0,0.1,0c0.2,0,0.3,0,0.5,0 c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V73.4l10-3.5c0.8-0.3,1.5-1,1.8-1.8s0.2-1.8-0.3-2.6 l-12-20c0,0,0,0,0-0.1c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0-0.1c0,0,0,0,0,0c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1c0,0,0,0-0.1-0.1 c0,0,0,0-0.1,0c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.1-0.1c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.1-0.1-0.2-0.1 c-0.1,0-0.1,0-0.2-0.1c0,0,0,0-0.1,0c0,0,0,0,0,0l-48-17c-0.2-0.1-0.4-0.1-0.6-0.1c0,0-0.1,0-0.1,0c-0.2,0-0.3,0-0.5,0 c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4,0.1-0.6,0.1l-48,17c0,0,0,0,0,0c0,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.1,0.1-0.3,0.1-0.4,0.2 c0,0,0,0,0,0c0,0,0,0,0,0c-0.2,0.1-0.4,0.3-0.6,0.5l0,0c0,0-0.1,0.1-0.1,0.1c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.2c0,0,0,0,0,0 c0,0,0,0-0.1,0.1l-12,20C1,66.2,0.9,67.2,1.2,68s1,1.5,1.8,1.8l10,3.5V107C13,108.3,13.8,109.4,15,109.8z M109,104.9l-42,14.9V95.7 c0-1.7-1.3-3-3-3s-3,1.3-3,3v24.1l-42-14.9V75.5l32,11.3c0.3,0.1,0.7,0.2,1,0.2c1,0,2-0.5,2.6-1.5L64,69.8l9.4,15.7 C74,86.5,75,87,76,87c0.3,0,0.7-0.1,1-0.2l32-11.3V104.9z M67,34.2L103,47L67,59.8V34.2z M77.3,80.4l-8.9-14.8l42.2-15l8.9,14.8 L77.3,80.4z M17.3,50.6l42.2,15l-8.9,14.8l-42.2-15L17.3,50.6z"></path></svg>
                                        <p className="noresults">There is still no bookings to show.</p>
                                </div>
                            </>}

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
                                    );
                                })}
                            </>}
                        </TabPane>
                        <TabPane tabId="3">
                            {this.state.activeTab === '3' && <p className="noresults">Coming soon.</p>}
                        </TabPane>
                    </TabContent>
                {this.state.showAddBooking && <AddBooking getService={this.getSingleService} serviceId={this.props.match.params.id} />}
            </div>
        )
    }
}

export default ServiceDetails;
