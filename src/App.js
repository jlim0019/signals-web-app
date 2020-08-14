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
      <Router>
        <div className = {styles.navbar}>
                    <div className = {styles.tab} id="home">  
                      <Link to="/signals-web-app">Home</Link>
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
            <Route exact path="/signals-web-app">
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
    );
  }

  function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
  
  class Home extends React.Component{
    render() {

      return(
      <div>
        <h2>Home</h2>
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