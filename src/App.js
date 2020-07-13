import React, { Component } from 'react';
import './App.css';

import ServiceList from './components/services/ServiceList';
import ServiceDetails from './components/services/ServiceDetails';
import EditService from './components/services/EditService';
import Navbar from './components/navbar/Navbar';
import AddImage from './components/images/AddImage';
import Profile from './components/profile/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';

import { Switch, Route, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';




class App extends Component {
  service = new AuthService();
  state = {
    loggedInUser: null
  }

  setCurrentUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate() {
    this.fetchUser();
  }

  fetchUser = () => {
    if(this.state.loggedInUser === null) {
      this.service.loggedin() 
      .then(response => {
        console.log(response)
        if (response._id) {
          localStorage.setItem("loggedin", true);
          this.setCurrentUser(response);
        } else {
          localStorage.clear();
        }
      })
    }
  }


  render() {
    return (
      <div className="App">
        <Navbar loggedInUser={this.state.loggedInUser} setCurrentUser={this.setCurrentUser} />
        <Switch>
          <Route path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path="/images/add" component={AddImage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/services" component={ServiceList} />
          <Route exact path="/services/:id" render={(props) => <ServiceDetails {...props} loggedInUser={this.state.loggedInUser} /> } />
          <Route exact path="/services/:id/edit" render={ (props) => {
            if (localStorage.getItem("loggedin")) {
              return <EditService loggedInUser={this.state.loggedInUser} {...props} />
            } else {
              return <Redirect to="/login" />
            }}}
           />
          
        </Switch>
      </div>
    );
  }
}

export default App;