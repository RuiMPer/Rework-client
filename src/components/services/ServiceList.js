import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddService from './AddService';
import AddNotification from '../notifications/AddNotification';

class ServiceList extends Component {

    state = {
        listOfServices: [],
        showAddService: false
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

    componentDidMount() {
        this.getAllServices();
    }

    showAddService = () => {
        const { showEditBooking } = this.state

        this.state.showAddService ? this.setState({ showAddService: false }) : this.setState({ showAddService: true })
    }
    render() {
        return (
            <div>
                <div style={{ width: '50%', float: 'left' }}>
                    {this.state.listOfServices.map(service => {
                        return (
                            <div key={service._id}>
                                {/* go to /services/123456 */}
                                <Link to={`/services/${service._id}`}>
                                    <h3>{service.title}</h3>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <a onClick={() => this.showAddService()} href="#">Add Service</a>
                {this.state.showAddService && <div style={{ width: '50%', float: 'right' }}>
                    <AddService userId={this.props.loggedInUser._id} refreshServices={this.getAllServices} />
                </div>}
                <AddNotification />
            </div>
        )
    }
}

export default ServiceList;