import React from 'react';
import './Profile.css';

class Profile extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: ''
    }

    // handleChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // }

    // handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     const { firstName, lastName, username, password, email } = this.state;
    //     //save edit to bd
    // }


    render() {
        return (
            <>


            </>
        )
    }
}

export default Profile;