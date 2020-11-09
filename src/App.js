import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.css';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {FourierCoefficients} from './FourierCoefficients.js'

// "Highest" Parent class App. Manages the website's navigation and routing
function App() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Router>
          <Typography className = {styles.navbar}>
                      <div className = {styles.tab} id="home">  
                        <Link to="/signals-web-app/">Home</Link>
                      </div>
                      <div className = {styles.tab}> 
                        <Link to="/about">About</Link>
                      </div>
                      <div className = {styles.tab}>  
                        <Link to="/FourierCoefficients">Fourier Coefficients</Link>
                      </div>
          </Typography>
            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}

            <Switch>
              <Route exact path="/signals-web-app/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/FourierCoefficients">
                <FourierCoefficients />
              </Route>
            </Switch>
  
        </Router>
      </div>
    );
  }

  // Returns HTML code for the "About" page
  function About() {
    return (
      <div className = {styles.centertext}>  
        <div>
          <h2>About the Project</h2>
            <h4>
              The aim of the project was to help students to have a more intuitive understanding 
              of the various topics in ECE2111 - Signals and Systems. The unit ECE2111, Signals and Systems, 
              taught by lecturer James Saunderson, involves many visual representations of the properties of 
              sinusoidal signals and their frequency response. 
            </h4>
            <h4>
              James had an idea of a helpful, interactive web application where students could interact 
              with and adjust signal properties and observe the relationships in time domain, frequency 
              domain etc. Hence, this final year project was proposed.
            </h4>
          <h2/>
        </div>
      </div>
    );
  }
  
  // Returns HTML code for the "Home" page
  class Home extends React.Component{
    render() {

      return(
      <div>
        <div className = {styles.centertext}>  
          <h2>Welcome!</h2>
          <h4>
            This website was designed to allow students to learn more about topics in the unit ECE2111
            through visualization and interaction with signal properties.
            
          </h4>
            <h4>
              Feel free to explore the topics, there's (hopefully) more to come!
            </h4>
          </div>
      </div>
      )

    };
  }

  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

  export default App;