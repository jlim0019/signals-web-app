import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import styles from './App.module.css';
import * as d3 from "d3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {FourierCoefficients} from './FourierCoefficients.js'
import {FrequencyDomain} from './FrequencyDomain.js'

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/


/* Known Bugs:
- removeSignal() only works if you starting removing from the last signal
- if you move/drag the mouse too fast the circle doesn't catch up
- phase dial for DC signal updates amplitude when it's not meant to
- negative phase circle is meant to move in opposite direction when dragged (cartersian coordinate problem)


- Changing frequency does update the signal (when it's not meant to)
^ But this is deliberate because we haven't updated FreqPlot functionality to fit with Fourier Plots
*/



function App() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Router>
          <div className = {styles.navbar}>
                      <div className = {styles.tab} id="home">  
                        <Link to="/">Home</Link>
                      </div>
                      <div className = {styles.tab}> 
                        <Link to="/about">About</Link>
                      </div>
                      <div className = {styles.tab}>  
                        <Link to="/FourierCoefficients">Fourier Coefficients</Link>
                      </div>
                      <div className = {styles.tab}>  
                        <Link to="/FrequencyDomain">Frequency Domain</Link>
                      </div>
          </div>
            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/FourierCoefficients">
                <FourierCoefficients />
              </Route>
              <Route path="/FrequencyDomain">
                <FrequencyDomain />
              </Route>
            </Switch>
  
        </Router>
      </div>
    );
  }

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