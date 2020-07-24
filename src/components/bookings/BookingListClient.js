import React, { Component } from 'react';
import axios from 'axios';
import "./css/BookingListClient.css"
import moment from 'moment';
import { CardHeader, CardBody, Jumbotron, Button, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

class BookingListClient extends Component {

	state = {
		listOfServices: []
	}

	componentDidMount() {
		this.getUserBookings()

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
	getUserBookings = () => {
		this.getUserServices()

		let today = moment().format("DD/MM/YYYY")
		let eachBooking = []
		this.state.listOfServices.map(response => {
			if (response.bookings.length >= 1) {
				response.bookings.map(response => {
					console.log("ESTE", response)
					let eachBook = axios.create({
						baseURL: `${process.env.REACT_APP_SERVER}`,
						withCredentials: true
					});
					eachBook.get(`/bookings/${response}`)
						.then(response => {
							console.log(response)
						});
				});
			}
		});

	}
	render() {

		return (
			<>
				<h1>My Bookings</h1>
				<section className="bookinglist">
					{this.state.listOfServices.map(response => {
						
						return (
							<>
								<Card key={response._id}>
									<CardHeader tag="h3">{response.title}</CardHeader>
									<CardHeader tag="h4">{response.date}</CardHeader>
									<CardHeader tag="h4">{response.time}</CardHeader>
									<Button>+</Button>
								</Card>
							</>
						)
					})}
				</section>
			</>
		)
	}
}

export default BookingListClient;