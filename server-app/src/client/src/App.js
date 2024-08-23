import React from 'react';
import {useState} from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

//screens
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';

//components
import Navbar from "./components/Navbar";
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';

import { StyledLink } from "./style";

import Register from './Register';

import Login from './Login';
import Profile from './Profile';


import CheckoutForm from './components/CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import "./styles.css";
//import Success from "./Success";




const stripePromise = loadStripe("pk_test_51JdLrNA55RWoFjWF6pnCrLArW0O9N7SAVOuGDYaWdcjh3ULbmLDV8PO9cn3wIEcYkdOeqN39QQCXqDmoIKWvFG0N00MfbYn2Yw");
function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}
function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}


const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};

function App() {
  const[sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      {/*Navbar*/}
      {/*SideDrawer for mobile apps*/}
      {/*Backdrop*/}
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          {/*HomeScreen*/}
          {/*BookScreen*/}
          {/*CartScreen*/}
        <Route path="/" component={props => <HomeScreen{...props}/>} />
        <Route path="/book/:id" component={props => <BookScreen{...props}/>}/>
        <Route path="/cart" component={props => <CartScreen{...props}/>}/>
        </Switch>
      </main>
    </Router>
  );
}
export default App;




