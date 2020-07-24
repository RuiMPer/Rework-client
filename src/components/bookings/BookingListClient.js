import React, { Component } from 'react';
import axios from 'axios';
import {
	Card, CardImg, CardText, CardBody, CardLink,
	CardTitle, CardSubtitle, Button
} from 'reactstrap';

class BookingListClient extends Component {

	state = {
		listOfServices: []
	}

	componentDidMount() {
		this.getUserServices()
			.then(() => {
				console.log("lista", this.state.listOfServices)
			})

	}
	getUserServices = () => {
		// Get list of service from the API we just built
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_SERVER}`,
			withCredentials: true
		});
		return (service.get(`/services`)
			.then(responseFromAPI => {
				console.log("response", responseFromAPI)
				// console.log("ISTO", responseFromAPI.data)
				// console.log(this.props)
				this.setState({
					listOfServices: responseFromAPI.data
				})
			})
		)
	}
	render() {

		return (
			<>

				<header className="header">
					<h1>My Bookings</h1>
				</header>


				<section className="maincontent servicelist">
					{this.state.listOfServices.map(response => {
						console.log(response)
					})}
				</section>
			</>
		)
	}
}

export default BookingListClient;