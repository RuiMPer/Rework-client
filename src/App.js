import React, { Component } from 'react';
import './App.css';

import ServiceList from './components/services/ServiceList';
import ServiceDetails from './components/services/ServiceDetails';
import EditService from './components/services/EditService';
import Navbar from './components/Navbar';

import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    loggedInUser: null 
  }
  service = new AuthService();

  setCurrentUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }


  // 1. save the user into the browser localstorage
  // OR
  // 2. check if the user is still loggedin by calling the backend
  fetchUser = () => {
    if(this.state.loggedInUser === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.setState({
              loggedInUser: response
            })
          }
        })
    }
  }


  render() {
    this.fetchUser();
    return (
      <div className="App">
        <Navbar loggedInUser={this.state.loggedInUser} setCurrentUser= {this.setCurrentUser} />
        <Switch>
          <Route path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path="/services" component={ServiceList} />
          <Route exact path="/services/:id" render={(props) => <ServiceDetails {...props} loggedInUser={this.state.loggedInUser} /> } />
          <Route exact path="/services/:id/edit" render={ (props) => {
            if (this.state.loggedInUser){
              return <EditService {...props} />
            }
            else {
              return <Redirect to="/login" />
            }
          }}/>
        </Switch>
      </div>
    );
  }
}

export default App;