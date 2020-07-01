import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';

class ProjectList extends Component {

    state = {
        listOfProjects: []
    }

    getAllProjects = () => {
        // Get list of project from the API we just built
        axios.get('http://localhost:5000/api/services')
            .then(responseFromAPI => {
                this.setState({
                    listOfProjects: responseFromAPI.data
                })
            });
    }

    componentDidMount() {
      this.getAllProjects();
    }

    render() {
        return(
            <div>
                <div style={{width: '60%', float: 'left'}}>
                    {this.state.listOfProjects.map(project=> {
                        return (
                            <div key={project._id}>
                                {/* go to /projects/123456 */}
                                <Link to={`/projects/${project._id}`}>
                                    <h3>{project.title}</h3>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div style={{width: '40%', float: 'right'}}>
                    <AddProject refreshProjects={this.getAllProjects} />
                </div>
            </div>
        )
    }
}

export default ProjectList;