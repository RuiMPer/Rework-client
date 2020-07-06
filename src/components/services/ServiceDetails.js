import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddBooking from '../bookings/AddBooking';

class ServiceDetails extends Component {
    //1. Option one
    /*state = {
        title: '',
        description: ''
    }*/

    //2. Option two
    state = {}


    getSingleService = () => {
        //id of the project is on the url /services/1234567
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/services/${params.id}`)
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
        axios.delete(`http://localhost:5000/api/services/${params.id}`)
            .then(() => {
                //return <Redirect to='/projects' />
                this.props.history.push('/services');
            })
    }

    // 1. Happens first
    render() {
        const { params } = this.props.match;
        return(
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>

                {this.props.loggedInUser &&
                    <div>
                        <button onClick={() => this.deleteProject()}>Delete Project</button>
                    </div>
                }
                <div>
                <Link to={{
                    pathname: `/projects/${params.id}/edit`,
                    state: {
                        title: this.state.title,
                        description: this.state.description
                    }
                    }}>Edit Project</Link>  
                </div>
                <hr />
                <div>
                    <AddBooking getProject={this.getSingleProject} projectId={this.state._id} />
                </div>
                <div>
                    {this.state.tasks && this.state.tasks.map(task => {
                      return <div key={task._id}>{task.title}</div>  
                    })}
                </div>
                
            </div>
        )
    }
}

export default ServiceDetails;
