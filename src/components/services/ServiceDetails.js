import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddBooking from '../bookings/AddBooking';
import EditBooking from '../bookings/EditBooking';
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

    showForm = () => {
        console.log("click")
        return this.showForm = true
    }

    // 1. Happens first
    render() {
        const { params } = this.props.match;
        return (
            <div>
                <h1>{this.state.title}</h1>
                <div>
                    <h3>Category</h3>
                    <p>{this.state.category}</p>
                    <h3>Description</h3>
                    <p>{this.state.description}</p>
                </div>

                <Example/>

                {this.props.loggedInUser &&
                    <div>
                        <button onClick={() => this.deleteService()}>Delete Service</button>
                    </div>
                }
                <div>
                    <Link to={{
                        pathname: `/services/${params.id}/edit`,
                        state: {
                            title: this.state.title,
                            description: this.state.description,
                            category: this.state.category
                        }
                    }}>Edit Service</Link>
                </div>
                <hr />
                <div>
                    <AddBooking getService={this.getSingleService} serviceId={this.props.match.params.id} />
                </div>
                <div>
                    {this.state.bookings && this.state.bookings.map(booking => {
                        return (
                            <div key={booking._id}>
                                <ul>
                                    <li>{booking.title}</li>
                                    <li>{booking.description}</li>
                                    <li>{booking.date}</li>
                                    <li>{booking.time}</li>
                                    <li><button onClick={this.showForm}>Edit</button></li>
                                    {/* {this.state.showForm && <EditBooking booking={booking} {...this.props} />} */}
                                    <EditBooking booking={booking} {...this.props} />
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
