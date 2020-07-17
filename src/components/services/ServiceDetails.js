import React, { Component, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddBooking from '../bookings/AddBooking';
import EditBooking from '../bookings/EditBooking';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Example from './/Caroussel';

class ServiceDetails extends Component {
    //1. Option one
    /*state = {
        title: '',
        description: ''
    }*/

    //2. Option two
    state = {
        showForm: false,
        showInfo: false,
        showBooking: false,
        showClient: false,
        showEditBooking: false,
        showAddBooking: false
    }

    getSingleService = () => {
        //id of the service is on the url /services/1234567
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/services/${params.id}`)
            .then(responseFromAPI => {
                const service = responseFromAPI.data;
                console.log('service found', service);
                //1. Option one
                /* this.setState({
                    title: service.title,
                    description: service.description
                })*/

                //2. Option two
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
                //return <Redirect to='/services' />
                this.props.history.push('/services');
            })
    }

    showAddBooking = () => {
        const { showForm, showInfo, showClient, showEditBooking } = this.state

        this.state.showAddBooking ? this.setState({ showAddBooking: false }) : this.setState({ showAddBooking: true, showForm: false, showInfo: false, showClient: false, showEditBooking: false })
    }
    showInfo = () => {
        const { showForm, showBooking, showClient, showEditBooking } = this.state

        this.state.showInfo ? this.setState({ showInfo: false }) : this.setState({ showInfo: true, showAddBooking: false, showForm: false, showBooking: false, showClient: false, showEditBooking: false })
    }
    showBooking = () => {
        const { showForm, showInfo, showClient, showEditBooking } = this.state

        this.state.showBooking ? this.setState({ showBooking: false }) : this.setState({ showBooking: true, showForm: false, showInfo: false, showClient: false, showEditBooking: false })
    }
    showClient = () => {
        const { showForm, showInfo, showBooking, showEditBooking } = this.state

        this.state.showClient ? this.setState({ showClient: false }) : this.setState({ showClient: true, showForm: false, showInfo: false, showBooking: false, showEditBooking: false })
    }
    showEditBooking = () => {
        const { showForm, showInfo, showBooking, showClient } = this.state

        this.state.showEditBooking ? this.setState({ showEditBooking: false }) : this.setState({ showEditBooking: true, showForm: false, showInfo: false, showBooking: false, showClient: false })
    }


    // 1. Happens first
    render() {
        // const [activeTab, setActiveTab] = useState('1');

        // const toggle = tab => {
        //     if (activeTab !== tab) setActiveTab(tab);
        // }
        const { params } = this.props.match;
        return (
            <div>
                {/* <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Tab1
          </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            More Tabs
          </NavLink>
                    </NavItem>
                </Nav> */}

                <div>
                    <a href="/services">Back</a>
                    <p>{this.state.title}</p>
                </div>
                <div>
                    <Link to={{
                        pathname: `/services/${params.id}/edit`,
                        state: {
                            title: this.state.title,
                            description: this.state.description,
                            category: this.state.category,
                            photoPath: this.state.photoPath
                        }
                    }}>Edit Service</Link>
                    <a onClick={() => this.showAddBooking()} href="#">Add Booking</a>
                    {this.state.showAddBooking && <AddBooking getService={this.getSingleService} serviceId={this.props.match.params.id} />}

                </div>
                <div>
                    <a onClick={() => this.showInfo()} href="#">Information</a>
                    <a onClick={() => this.showBooking()} href="#">Bookings</a>
                    <a onClick={() => this.showClient()} href="#">Clients</a>
                </div>

                {this.state.showInfo && <div>
                    <img src={this.state.photoPath} />
                    <h3>Category</h3>
                    <p>{this.state.category}</p>
                    <h3>Description</h3>
                    <p>{this.state.description}</p>
                </div>}
                {/* <Example/> */}

                {this.props.loggedInUser &&
                    <div>
                        <button onClick={() => this.deleteService()}>Delete Service</button>
                    </div>
                }
                <hr />
                <div>
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
                                    {/* {this.state.showForm && <EditBooking booking={booking} {...this.props} />} */}
                                    {this.state.showEditBooking && <EditBooking booking={booking} {...this.props} />}
                                </ul>
                            </div>
                        )
                    })}
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default ServiceDetails;
