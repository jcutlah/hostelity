import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import Login from './components/login';
import Map from './components/map';
import Signup from './components/signup';
import Home from './components/dashboard/Home';
import Navbar from './components/layout/Navbar';
import "./css/style.css";
import searchModal from "./components/subcomponent/searchModal";

function App() {
  return (
    <Router>
      <div>

      <Navbar />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/searchModal" component={searchModal} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
