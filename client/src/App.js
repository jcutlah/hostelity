import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login';
import Map from './components/map';
import Signup from './components/signup';
import Home from './components/Home';
import Navbar from './components/subcomponent/Navbar';
import "./css/style.css";
import Search from "./components/subcomponent/Search";
import MyTrips from "./components/my-trips";
import Axios from 'axios';
import NoMatch from './components/noMatch';
import Grid from '@material-ui/core/Grid';
import Header from './components/subcomponent/Header';

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
        if (!userId){
            // console.log('No user id present');
            Axios.get('/api/users')
            .then(response => {
                console.log(response.data.passport);
                if (response.data.passport){
                    // console.log("setting user ID state");
                    setUserId(response.data.passport.user);
                } else {
                    console.log('sending user to login page');
                    // console.log(window.location.pathname);
                    if (window.location.pathname !== '/login'){
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Navbar
            loginCallback={loginCallback}
            isLoggedIn={loggedIn}
            userId={userId}
          />

        </Grid>

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" render={(props) => <Home {...props} userId={userId} />} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/my-trips" render={(props) => <MyTrips {...props} userId={userId} />} />
          <Route component={NoMatch} />
        </Switch>

      </Grid>

    </Router>
  )
  
}

export default App;
