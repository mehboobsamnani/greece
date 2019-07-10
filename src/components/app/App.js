import React from "react";
import { BrowserRouter as Router, Route ,Link, Switch } from "react-router-dom";
import Header from "../common/Header";

import SignUp from "../account/SignUp";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import About from "../about/About";
import AirportDetail from "../airport/AirportDetail";

import Hotel from "components/hotel/Hotel";
import HotelDetail from "components/hotel/HotelDetail";
import HotelBooking from "components/hotel/HotelBooking";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./App.scss";

import BG from "assets/images/bg.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    padding:0,
    background: `url(${BG})`
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container className={classes.root} maxWidth={false}>
        <Header />
          <Route path="/airport/:icao/:tab"  component={AirportDetail} />
          <Route path="/hotel" exact component={Hotel} />
          <Route path="/signup/" exact  component={ SignUp } />
          <Route path="/hotel/detail/:chainCode/:propertyCode"  component={HotelDetail} />
          <Route path="/hotel/booking/:id"  component={HotelBooking} />
          <Route path="/about"  component={About} />
          <Route path="/contact"  component={Contact} />
          <Route path="/" exact component={Home} />
      </Container>
    </div>
  );
}

export default App;
