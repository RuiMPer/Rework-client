import React, { Component } from 'react';
import './Home.css';
import { Jumbotron, Button, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import AddNotification from '../notifications/AddNotification';
import addNotification from 'react-push-notification';

class Home extends Component {
    state = {
        listOfServices: []
    }


    componentDidMount() {
        this.getUserServices();
    }



    getUserServices = () => {
        let service = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER}`,
            withCredentials: true
        });
        return (service.get(`/services`)
            .then(responseFromAPI => {
                // console.log(responseFromAPI)
                // console.log("ISTO", responseFromAPI.data)
                // console.log(this.props)
                this.setState({
                    listOfServices: responseFromAPI.data
                })
            })
        )
    }


    handleNotification = () => {
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
                            console.log("IDSDAA", response)
                            let bookingInfo = response.data
                            console.log(bookingInfo)
                            console.log(bookingInfo.date)
                            // eachBooking.push(bookingInfo)
                            let notificationDay = moment(response.date).subtract(1, "days").format("DD/MM/YYYY")
                            let dateNot = moment(response.date).format("DD/MM/YYYY")
                            console.log(response.date)
                            console.log("hoje", today)
                            console.log("dia notificação", notificationDay)
                            if (today === notificationDay) {
                                console.log("finally")
                            } else {
                                console.log("no notification")
                            }

                        })
                })
            }
        })
        if (eachBooking.length >= 1) {
            console.log("OUTRO", eachBooking)

            eachBooking.map(response => {
                console.log("DATAS", response.date)
                let notificationDay = moment(response.date).subtract(1, "days").format("DD/MM/YYYY")
            })
        }
    }
    Page = () => {
        const buttonClick = (date, time) => {
            addNotification({
                title: 'New Booking',
                subtitle: "Sadas",
                message: "asdasd",
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
            });
            console.log("olhaeste", this.props)
        }

        return (
            <div className="page">
                {buttonClick()}
            </div>)
    }

    render() {
        // console.log("final", this.state.bookingRetrieve)
        // // console.log(newList)
        // console.log(this.state.listOfServices)
        return (
            <section className="home">
                {/* <h1>Welcome to Re-work!</h1> */}
                <button onClick={() => { this.handleNotification() }}>TESTE:</button>
                <button onClick={this.getUserServices}>Services</button>
                {this.props.isLoggedIn &&
                    <>
                        <h3>Todos os Serviços da Empresa X</h3>
                        {this.state.listOfServices.map(services => {
                            return (
                                <div key={services._id}>
                                    <p>{services.title}</p>
                                </div>
                            )
                        })}
                        <h3>Calendário da Empresa X</h3>
                        {/* {this.state.newBookings.map(booking => {
                            return (
                                <div key={booking._id}>
                                    <p>{booking.title}</p>
                                </div>
                            )
                        })} */}
                        <h3>Clientes da Empresa X</h3>
                    </>
                }


                <h3>About us</h3>
                <Jumbotron>
                    <h1 className="display-8">Um detaque sobre serviços ou categorias....</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>

                <h3>All our categories</h3>
                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://picsum.photos/200" alt="Card image cap" />
                    <CardImgOverlay>
                        <CardTitle>TÍTULO GOES HERE</CardTitle>
                        <CardText>
                            <small>Know more +</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>
            </section>
        )
    }

}
export default Home;