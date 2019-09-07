import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/style.css";
import Login from './components/login';
import Map from './components/map';
import Signup from './components/signup';
import Home from './components/Home';
import Navbar from './components/subcomponent/Navbar';
import Search from "./components/subcomponent/Search";
import MyTrips from "./components/my-trips";
import Axios from 'axios';
import NoMatch from './components/noMatch';
import Header from './components/subcomponent/Header';
import LoadMap from './components/loadMap';
import Redir from './components/subcomponent/Redir';
import LandingPage from './components/LandingPage'
function App() {
  // Define hooks (state) variables
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  // Define callback 
  const loginCallback = (user) => {
    console.log(`running loginCallback`);
    // setLoggedIn(user.isLoggedIn);
    setUserId(user.id);

  }
  const isLoggedIn = () => {
    // console.log(`Checking if logged in`);
    if (!userId) {
      // console.log('No user id present');
      Axios.get('/auth/users')
        .then(response => {
          console.log(response.data.passport);
          if (response.data.passport) {
            // console.log(response.data.passport);
            // console.log("setting user ID state");
            if (response.data.passport.user) {
              setUserId(response.data.passport.user);
            } else {
              console.log('sending user to login page');
              // console.log(window.location.pathname);
              if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                window.location = '/login';
              }
            }
            // console.log('meep');

          } else {
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
              window.location = '/login';
            }
          }

        })
        .catch(err => {
          console.log(err);
        })
    } else {
      console.log(`User signed in with id ${userId}`);
    }
  }



  isLoggedIn();
  return (
    <Router>
      <>
        <Header />
        <Navbar
          loginCallback={loginCallback}
          isLoggedIn={loggedIn}
          userId={userId}
        />


        <Switch>
          <Route exact path='/welcome' component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/map/:id" component={LoadMap} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/new-search" component={Redir} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/my-trips" render={(props) => <Home {...props} userId={userId} />} />
          <Route component={NoMatch} />
        </Switch>

      </>

    </Router>
  )
}



export default App;
