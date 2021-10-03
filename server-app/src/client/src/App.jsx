import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
//mport React from 'react';
import Header from './Components/Header'
import Footer from './Components/Footer';
import Home from "./Components/Home";

import { StyledLink } from "./style";
// Source code imports
import   "./SelectedItems";
import Register from './Register';
import React,{Component} from 'react';
import Login from './Login';
import Profile from './Profile';

import Fiction from "./Fiction";
import NonFiction from "./Nonfiction";
import ItemsList from "./ItemsList";
import SelectedItems from "./SelectedItems";
import CheckoutForm from './Components/CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import "./styles.css";

const stripePromise = loadStripe("pk_test_51JdLrNA55RWoFjWF6pnCrLArW0O9N7SAVOuGDYaWdcjh3ULbmLDV8PO9cn3wIEcYkdOeqN39QQCXqDmoIKWvFG0N00MfbYn2Yw");
function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}
function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

const TYPE_NAMES = {
  fiction: "Fiction",
  nonfiction: "Nonfiction",
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};

function App(props) {
  // create the react component state we'll use to store our data
 const [items, setItems] = useState([]);
 const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

 const API_BOOKS_ROUTE = `${process.env.REACT_APP_API_HOST}/v1/books`

  useEffect(() => {
    axios
      .get(API_BOOKS_ROUTE)
      // handle success
      .then((response) => {
        const data = response.data;
        console.log(data);

        const parsedData = data.map((item) => ({ ...item, checked: false }));

        // set our react state w/data from the server!
        setItems(parsedData);
      });
  }, []);

   /*  const [optionValue, setOptionValue] = useState("");
    const handleSelect = (e) => {
      console.log(e.target.value);
      setOptionValue(e.target.value);
    };
   */

  const updateItem = (itemName) => {
    console.log("updateItem for ", itemName);
    // Go thru all items; change the desired one; return a new array which has our updated item and all the other items.
    setItems((prevState) => {
      return prevState.map((item) => {
        console.log(item);

        // If it's the desired item, flip the value of `item.checked`
        if (itemName === item.name) {
          console.log("desired item ", item);

          // This could also be done as `return { ...item, checked: !item.checked }`
          const newItem = {
            name: item.name,
            author: item.author,
            type: item.type,
            price: item.price,
            checked: !item.checked,
          };

          console.log("updated item ", newItem);
          return newItem;
        }

        // If it's not the desired item, return it unchanged
        return { ...item }; // IMPORTANT: Object destructuring like this creates a **new** object w/the same values
      });
    });
  };
  
  console.log("App.state.items is ", items);

  // Data being retrieved from server
  if (!items.length) {
    return <div>Loading</div>;
  } else {
    return (
      <div className = "App">
        <div>
            <Header/>
          </div>  
        <Router>
          <nav className = "navbar">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/Login">Login</StyledLink>
            <StyledLink to="/Register">Register</StyledLink>
            <StyledLink to="/Profile">Profile</StyledLink>
            <StyledLink to="/Fiction">Fiction</StyledLink>
            <StyledLink to="/NonFiction">NonFiction</StyledLink>
            <StyledLink to="/SelectedItems">Cart</StyledLink>
            <StyledLink to="/checkout">Payment</StyledLink>
            
          </nav>
          <Switch>
            <Route exact path="/">
              <Home/>
              </Route>
              <Route exact path="/register">
              <Register/>
              </Route>
              <Route exact path="/login">
              <Login/>
              </Route>
              <Route exact path="/profile">
              <Profile/>
              </Route>
              <Route path="/fiction">
              <ItemsList items={items} type="fiction" updateItem={updateItem} />
              </Route>
              <Route path="/nonfiction">
              <ItemsList items={items} type="nonfiction" updateItem={updateItem} />
              </Route>
              <Route path="/selecteditems">
              
              <SelectedItems items={items} />
              </Route>
              <Route path="/checkout">
                {/* <checkout/> */}
              <Route path="/payment">
              </Route> 
              <div className="AppWrapper">
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>  
            <CheckoutForm items={items} />
              </Elements>
              </div>
              </Route>      
          </Switch>
        </Router>
        </div>
        
    )
      
    
  }
}

export default App;



