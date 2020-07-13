import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddService from './AddService';

class ServiceList extends Component {

    state = {
        listOfServices: []
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

    render() {
        return (
            <div>
                <div style={{ width: '60%', float: 'left' }}>
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
                <div style={{ width: '40%', float: 'right' }}>
                    <AddService refreshServices={this.getAllServices} />
                </div>
            </div>
        )
    }
}

export default ServiceList;