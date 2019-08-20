import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login';
import Map from './components/map';
import Signup from './components/signup';
import Home from './components/dashboard/Home';
import Navbar from './components/layout/Navbar';
import "./css/style.css";
import SearchModal from "./components/subcomponent/searchModal";
import Axios from 'axios';

function App() {
    // Define hooks (state) variables
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    // Define callback 
    const loginCallback = (user) => {
        console.log(`running loginCallback`);
        setLoggedIn(user.isLoggedIn);
        setUserId(user.id);
        
    }
    const isLoggedIn = () => {
        console.log(`Checking if logged in`);
        Axios.get('/api/users')
        .then(response => {
            console.log(response.data.passport);
            if (response.data.passport.user){
                setLoggedIn(true);
                setUserId(response.data.passport.user);
                loggedIn ? console.log('User logged in') : console.log("user not logged in");
        console.log(`User id: ${userId}`);
            } else {
                setLoggedIn(false);
                setUserId(''); 
            }
            console.log(loggedIn);
        })
        .catch(err => {
            console.log(err);
        })
    }
    isLoggedIn();
  return (
    <Router>
      <div>

      <Navbar 
        loginCallback={loginCallback} 
        isLoggedIn={loggedIn}
        userId={userId}
      />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/searchModal" component={SearchModal} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
