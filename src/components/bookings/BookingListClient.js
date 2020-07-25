import React, { Component } from 'react';
import axios from 'axios';
import "./css/BookingListClient.css"
import moment from 'moment';
import { CardHeader, CardBody, Jumbotron, Button, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

class BookingListClient extends Component {

	state = {
		listOfServices: [],
		bookings:[]
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
		.then(()=>{
			console.log("list of servicessssss",this.state.listOfServices)
			let today = moment().format("DD/MM/YYYY")
			let eachBooking = []

			this.state.listOfServices.map(response => {
				if (response.bookings.length >= 1) {
					console.log("responseeeeeeeee",response.bookings)
					response.bookings.map(response => {
						console.log("ESTE", response)
						let eachBook = axios.create({
							baseURL: `${process.env.REACT_APP_SERVER}`,
							withCredentials: true
						});
						eachBook.get(`/bookings/${response}`)
							.then(response => {console.log("OLHAAAA",response.data.date)
								console.log("FESTAAAAAAA", response)
								console.log("OLHAAA2", moment.utc(response.data.date).utc().format('MM/DD/YYYY'))
								let date = moment.utc(response.data.date).utc().format('MM/DD/YYYY');
								let {confirmationStatus,
									logStatus,
									time,
									title} = response.data

								this.setState({
									bookings:[ ...this.state.bookings,{confirmationStatus,date:date, logStatus, time, title}]
								});
								// this.setState({
								// 		bookings:[response.data]
								// });
							});
					});
				}
			});
		})
		

	}
	render() {
		let {bookings} = this.state;

		return (
			<>
				<h1>My Bookings</h1>
				<section className="bookinglist">
					{bookings.map((response) => {
						
						return (
							<>
								<Card key={response._id}>
									<span>
										<CardHeader><strong>{response.title}</strong></CardHeader>
										<CardBody><strong>Date:</strong>  {response.date}  |  <strong>Time:</strong>  {response.time}</CardBody>
									</span>
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