import React, { Component } from 'react';
import './Home.css';
import { CardHeader, Jumbotron, Button, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
//import AddNotification from '../notifications/AddNotification';
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
        this.getUserServices();
        let today = moment().format("DD/MM/YYYY");
        let eachBooking = [];

        this.state.listOfServices.map((response) => {
            if (response.bookings.length >= 1) {
                response.bookings.map(response => {
                    console.log("ESTE", response)
                    let eachBook = axios.create({
                        baseURL: `${process.env.REACT_APP_SERVER}`,
                        withCredentials: true
                    });
                    return (
                        eachBook.get(`/bookings/${response}`)
                            .then(response => {
                                console.log("IDSDAA", response)
                                let bookingInfo = response.data
                                console.log(bookingInfo)
                                console.log(bookingInfo.date)
                                // eachBooking.push(bookingInfo)
                                let notificationDay = moment(response.date).subtract(1, "days").format("DD/MM/YYYY")
                                //let dateNot = moment(response.date).format("DD/MM/YYYY")
                                console.log(response.date)
                                console.log("hoje", today)
                                console.log("dia notificação", notificationDay)
                                // if (today === notificationDay) {
                                //     console.log("finally")
                                // } else {
                                //     console.log("no notification")
                                // }

                            })
                    )
                });
            }
        });

        if (eachBooking.length >= 1) {
            console.log("OUTRO", eachBooking)

            //eachBooking.map(response => {
            //console.log("DATAS", response.date)
            //let notificationDay = moment(response.date).subtract(1, "days").format("DD/MM/YYYY")
            //});
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
            console.log("olhaeste ", this.props)
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
                {/* <button onClick={() => { this.handleNotification() }}>TESTE:</button>
                <button onClick={this.getUserServices}>Services</button> */}
                {this.props.isLoggedIn &&
                    <>
                        <h3>My Services</h3>
                        <section className="servicesnahome">
                            {this.state.listOfServices.length === 0 && <> <p style={{ marginTop: "10px" }}>There is still no services to show.</p></>}
                            {this.state.listOfServices.length > 0 && <>
                                {this.state.listOfServices.map(services => {
                                    return (
                                        <>
                                            <Link to={`/services/${services._id}`}>
                                                <Card key={services._id}>
                                                    <CardHeader tag="h3">{services.title}</CardHeader>
                                                    <Button>+</Button>
                                                </Card>
                                            </Link>
                                        </>
                                    )
                                })}
                            </>}

                        </section>
                        {/* <h3>Calendário da Empresa X</h3> */}
                        {/* {this.state.newBookings.map(booking => {
                            return (
                                <div key={booking._id}>
                                    <p>{booking.title}</p>
                                </div>
                            )
                        })} */}
                        {/* <h3>Clientes da Empresa X</h3> */}
                        <hr />
                    </>
                }

                <div className="clearfix"></div>
                <h3>How things work at Rework:</h3>
                <Jumbotron>
                    <span className="lead">1 - </span><span>Advertise your services and manage booking.</span>
                    <hr className="my-2" />
                    <span className="lead">2 - </span><span>Look for what you need.</span>
                    <hr className="my-2" />
                    <span className="lead">3 - </span><span>Get notified about upcoming appointments.</span>
                    <hr className="my-2" />

                    <p className="lead">
                        <Button color="primary">Start Now!</Button>
                    </p>
                </Jumbotron>

                <h3>All our categories</h3>
                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://source.unsplash.com/1600x900/?health,human" alt="Card cap" />
                    <CardImgOverlay>
                        <CardTitle>HEALTH</CardTitle>
                        <CardText>
                            <small>Coming Soon...</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>

                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://source.unsplash.com/1600x900/?technology" alt="Card cap" />
                    <CardImgOverlay>
                        <CardTitle>TECHNOLOGY</CardTitle>
                        <CardText>
                            <small>Coming Soon</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>
                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://source.unsplash.com/1600x900/?beauty,aesthetics" alt="Card cap" />
                    <CardImgOverlay>
                        <CardTitle>BEAUTY & PERSONAL CARE</CardTitle>
                        <CardText>
                            <small>Coming Soon</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>
                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://source.unsplash.com/1600x900/?dyi,repairs,handy" alt="Card cap" />
                    <CardImgOverlay>
                        <CardTitle>HOME REPAIRS</CardTitle>
                        <CardText>
                            <small>Coming Soon</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>
                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://source.unsplash.com/1600x900/?cooking" alt="Card cap" />
                    <CardImgOverlay>
                        <CardTitle>COOKING</CardTitle>
                        <CardText>
                            <small>Coming Soon</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>
                <Card inverse className="category-card">
                    <CardImg width="100%" src="https://source.unsplash.com/1600x900/?education" alt="Card image cap" />
                    <CardImgOverlay>
                        <CardTitle>EDUCATION</CardTitle>
                        <CardText>
                            <small>Coming Soon</small>
                        </CardText>
                    </CardImgOverlay>
                </Card>
            </section>
        )
    }

}
export default Home;