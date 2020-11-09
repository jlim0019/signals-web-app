import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './FourierCoefficients.module.css'; 
import * as d3 from "d3";
import { hsl, nest } from 'd3';
import { rgb } from 'd3';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


// Prototype functions to move signals SVG elements front and back when hovered
d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        let firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};


/**
 * Returns HTML code for the control panel for an individual signal.
 *
 * @param {object} props An individual signal object and relevenat signal functions.
 * @return {HTML} HTML code for the control panel for an individual signal.
 */

function Dials(props) {

    const toolTipText = "Try adjusting the Amplitude or Phase!"

    return(
        <Grid
        id={'signal-controls-'.concat(props.signal.id.toString())} 
        signal_id = {props.signal.id}
        className={styles.signal_container}
        >
            <div className={styles.signal_info}>

            <Tooltip title={toolTipText}>
                <IconButton aria-label="Help" color="secondary">
                    <HelpIcon />
                </IconButton>
            </Tooltip>
                
                <Box component="div" m={0.5} p={1} bgcolor="primary.main">
                    Fundamental Frequency Multiple: {props.signal.id}
                </Box>
                <Button 
                    id = "remove-signal" 
                    onClick={(signalID) => props.onRemove(props.signal.id)}
                    variant="contained"
                    m={1}
                    p={1} 
                    color="secondary"
                > 
                    Remove Signal 
                </Button>

            </div>
            <Box 
                component="div" 
                m={0.5} 
                p={1} 
                bgcolor="primary.main" 
                color="primary.contrastText"
                className={styles.signal_props}
            >
                <div className={styles.signal_props}>
                    <div>Amplitude: {props.signal.amplitude.toFixed(2)}</div>
                </div>
                <div className = {styles.signal_props}>
                    <div>
                        <input 
                        id = {"signal" + props.signal.id + "_AmpDial" }
                        signal_id = {props.signal.id}
                        input_type = {"AmpDial"}
                        type ="range" 
                        min={0} 
                        max ={4} 
                        value = {props.signal.amplitude} 
                        step={0.1}
                        onChange={props.onChange}
                        /> 

                        <input
                        id = {"signal" + props.signal.id + "_AmpText" }
                        signal_id = {props.signal.id}
                        input_type = {"AmpText"}
                        type = "number"  
                        min = {0}
                        max = {4}
                        onChange={props.onChange}
                        />
                    </div>
                </div>
            </Box>

            <Box 
                component="div" 
                m={0.5} 
                p={1} 
                bgcolor="primary.main" 
                color="primary.contrastText"
                className={styles.signal_props}
            >
                <div className={styles.signal_props}>
                    <div>Phase: {props.signal.phase}</div>
                </div>
                <div className={styles.signal_props}>
                    <div>
                        <input 
                            id = {"signal" + props.signal.id + "_PhaseDial" }
                            signal_id = {props.signal.id}
                            input_type = {"PhaseDial"}
                            type ="range" 
                            min={-180} 
                            max ={180} 
                            value = {props.signal.phase} 
                            step={1}
                            onChange={props.onChange}
                        /> 
                        <input
                            id = {"signal" + props.signal.id + "_PhaseText" }
                            signal_id = {props.signal.id}
                            input_type = {"PhaseText"}
                            type = "number"  
                            min = {-180}
                            max = {180}
                            onChange={props.onChange}
                        />
                    </div>        
                </div>
            </Box>

            <div className={styles.signal_animate}>
                <button id = "animate-signal" align-content = "center" onClick={(signalID) => props.onAnimate(props.signal.id)}> Animate Signal </button>
            </div>
            
        </Grid>
    );
}

/**
 * Returns HTML code for the whole control panel (global controls and each individual signal).
 *
 * @param {object} props global state variables and functions, signals array and functions 
 * @return {HTML} HTML code for the control panel (global controls and each individual signal).
 */
class Controls extends React.Component {

    // Renders a signal's control panel
    renderDial(signal){
        return(
            <Dials
                signal = {signal}
                onChange = {(event) => this.props.onChange(event)}
                onRemove = {(i) => this.props.onRemove(i)}
                onAnimate = {(i) => this.props.onAnimate(i)}
            />
        );
    }

    // Returns HTML code to the FourierCoefficients parent class to render the control panel
    render(){

        // Creating each signal's control panel (for every signal in the signals state arary)
        const signalList = []; 
        for (let i=0; i < this.props.signals.length; i++){
            signalList.push(
                <div key={"signal" + this.props.signals[i].id}> 
                    {this.renderDial(this.props.signals[i])} 
                </div>
            )
        }

        const toolTipText = "Try adding a New Signal or Demo Signal!"
        return(
            <div className = {styles.dials} >
                <div className = {styles.global_controls}>

                    <Tooltip title={toolTipText}>
                        <IconButton aria-label="Help" color="primary">
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>

                    <Button 
                        id = "add-signal" 
                        align-content = "center" 
                        onClick={() => this.props.onAdd(0, 0)}
                        variant="contained" 
                        color="primary"
                    > 
                        Add New Signal 
                    </Button>
                    
                    <div style={{gridRow: "2"}}> Try a demo signal </div>

                    <select name="demoSignal" id="demoSignal" 
                        value = {this.props.demoSignal}
                        onChange = {(event) => this.props.onDemoSignal(event)}
                        style={{gridRow: "2"}}>
                        <option value ="select">- Select -</option>
                        <option value ="empty">Empty</option>
                        <option value="cosine">Cosine Wave</option>
                        <option value="triangle">Triangle Wave</option>
                        <option value="square">Square Wave Approx</option>
                        <option value="sawtooth">Sawtooth Wave Approx</option>
                    </select>

                    <div id="toggle-view" style = {{gridRow:"3"}}>
                        <FormControlLabel
                            label="Toggle View"
                            labelPlacement = "Start"
                            control={
                                <Switch
                                    checked={this.props.plotViewState}
                                    onClick={(event) => this.props.onToggleView(event)}
                                    name="toggleViewSwitch"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                        />
                    </div>

                    <Box 
                        style = {{gridRow:"3", gridColumn:"2"}} 
                        bgcolor="primary.main" 
                        color="white" m={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {this.props.plotView}
                    </Box>
                   
                </div>

                {signalList} 

            </div>
        );
    }
}

/**
 * Returns HTML code for an individual positive Fourier Magnitude Coefficient circle given
 * an individual signal's properties. To be plotted on the Fourier Magnitude plot. 
 *
 * @param {object} props an individual signal object 
 * @return {HTML} HTML code for an individual positive Fourier Magnitude Coefficient circle.
 */
function FourierCirclesMagPos(props) {

    // Getting plot's height and width
    let divHeight = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    // Checking if signal has been highlighted
    let strokeWidth
    if(props.signal.highlight){
        strokeWidth = "2" 
    }
    else{
        strokeWidth = "1" 
    }

    // Determining Coefficient's circle radius 
    let radius = 10;
    if((plotWidth / (5 * props.fourierMultiples)) < 10){
        radius = plotWidth / (5 * props.fourierMultiples)
    }

    // Returns HTML code to FourierMagPlot class to render the circle 
    return(
        <circle
            className ={styles.fourierCircles}
            id = {"circle_mag_"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*(plotWidth/ (props.fourierMultiples * 2))}
            cy = {(props.signal.amplitude)*(plotHeight/8)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {radius}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth= {strokeWidth}
        />
    );
}

/**
 * Returns HTML code for an individual negative Fourier Magnitude Coefficient circle given
 * an individual signal's properties. To be plotted on the Fourier Magnitude plot. 
 *
 * @param {object} props an individual signal object 
 * @return {HTML} HTML code for an individual negative Fourier Magnitude Coefficient circle.
 */
function FourierCirclesMagNeg(props) {

    // Getting plot's height and width
    let divHeight = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    // Checking if signal has been highlighted
    let strokeWidth
    if(props.signal.highlight){
        strokeWidth = "2" 
    }
    else{
        strokeWidth = "1" 
    }

    // Determining Coefficient's circle radius 
    let radius = 10;
    if((plotWidth / (5 * props.fourierMultiples)) < 10){
        radius = plotWidth / (5 * props.fourierMultiples)
    }

    // Returns HTML code to FourierMagPlot class to render the circle 
    return(
        <circle
            id = {"circle_mag_-"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*-(plotWidth/(props.fourierMultiples * 2))} // 8 is because our x-axis is divided into 8 sections 
            cy = {(props.signal.amplitude)*(plotHeight/8)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {radius}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth={strokeWidth}
        />
    );
}

/**
 * Returns HTML code for an individual positive Fourier Phase Coefficient circle given
 * an individual signal's properties. To be plotted on the Fourier Phase plot. 
 *
 * @param {object} props an individual signal object 
 * @return {HTML} HTML code for an individual positive Fourier Phase Coefficient circle.
 */
function FourierCirclesPhasePos(props) {

    // Getting plot's height and width
    let divHeight = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    // Checking if signal has been highlighted
    let strokeWidth
    if(props.signal.highlight){
        strokeWidth = "2" 
    }
    else{
        strokeWidth = "1" 
    }

    // Determining Coefficient's circle radius 
    let radius = 10;
    if((plotWidth / (5 * props.fourierMultiples)) < 10){
        radius = plotWidth / (5 * props.fourierMultiples)
    }
    
    // Returns HTML code to FourierMagPlot class to render the circle 
    return(
        <circle
            id = {"circle_phase_+"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*(plotWidth/ (props.fourierMultiples * 2))} 
            cy = {(props.signal.phase)*(plotHeight/360)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {radius}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth={strokeWidth}
        />
    );
}

/**
 * Returns HTML code for an individual negative Fourier Phase Coefficient circle given
 * an individual signal's properties. To be plotted on the Fourier Phase plot. 
 *
 * @param {object} props an individual signal object 
 * @return {HTML} HTML code for an individual negative Fourier Phase Coefficient circle.
 */
function FourierCirclesPhaseNeg(props) {

    // Getting plot's height and width
    let divHeight = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    // Checking if signal has been highlighted
    let strokeWidth
    if(props.signal.highlight){
        strokeWidth = "2" 
    }
    else{
        strokeWidth = "1" 
    }

    // Determining Coefficient's circle radius 
    let radius = 10;
    if((plotWidth / (5 * props.fourierMultiples)) < 10){
        radius = plotWidth / (5 * props.fourierMultiples)
    }

    // Returns HTML code to FourierMagPlot class to render the circle 
    return(
        <circle
            id = {"circle_phase_-"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*-(plotWidth/ (props.fourierMultiples * 2))} 
            cy = {-(props.signal.phase)*(plotHeight/360)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {radius}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth={strokeWidth}
        />
    );
}

/**
 * Returns HTML code to FourierCoefficients parent class to render the Fourier Magnitude Plot. 
 *
 * @param {object} props signals state array, fourierMultiples 
 * @return {HTML} HTML code for the Fourier Magnitude Plot.
 */
class FourierMagPlot extends React.Component {
    
    // Initializing plot's height and width (to be updated later when DOM is loaded)
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    // Draws the axis for the Fourier Magnitude Plot when called
    drawAxis(height, width, fourierMultiples){

        let FourierMagSvg = d3.select("#svgFourierMagPlot")

        // If axis exists but we are redrawing
        if(document.getElementById("x_axis_fourierMagPlot") || document.getElementById("y_axis_fourierMagPlot")){

            // remove current axis
            d3.select("#x_axis_fourierMagPlot").remove();
            d3.select("#y_axis_fourierMagPlot").remove();
        }

        // Drawing new axis

        // Creating axis domain based on pixel range for the plot
        let xscale_freq = d3.scaleLinear()
                            .domain([-fourierMultiples, fourierMultiples]) 
                            .range([ (1/10)*width, (9/10)*width ]);

        let yscale_freq = d3.scaleLinear()
                            .domain([4,0]) 
                            .range([ (1/10)*height, (5/10)*height ]);

        // Configuring axis ticks
        const xAxisTicks = xscale_freq.ticks()
                            .filter(tick => Number.isInteger(tick));

        const yAxisTicks = yscale_freq.ticks()
                            .filter(tick => Number.isInteger(tick))                         
 
        let x_axis_freq = d3.axisBottom(xscale_freq)
                            .tickValues(xAxisTicks)
                            .tickFormat(d3.format("d"));

        let y_axis_freq = d3.axisLeft(yscale_freq)
                            .tickValues(yAxisTicks)
                            .tickFormat(d3.format("d"));
            
        // Adding the axis to the plot
        FourierMagSvg.append('g')
                     .attr("id","x_axis_fourierMagPlot")
                     .attr("transform","translate(0," + this.height/2 + ")")
                     .attr("pointer-events", "none")
                     .call(x_axis_freq)

        FourierMagSvg.append('g')
                     .attr("id","y_axis_fourierMagPlot")
                     .attr("transform","translate(" + this.width/2 + ",0)")
                     .attr("pointer-events", "none")
                     .call(y_axis_freq); 

    }

    // Creates the Fourier Magnitude plot when DOM is loaded  
    componentDidMount(){
        // Get plot element's dimensions when DOM is loaded
        this.height = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;

        // Adding plot title
        let FourierMagSvg = d3.select("#svgFourierMagPlot")

        FourierMagSvg.append("text")
                         .attr("id","fourierMagPlotTitleText")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Fourier Magnitude Plot");

        // Initial drawing of the axis (default view of 4 multiples)
        this.drawAxis(this.height, this.width, this.props.fourierMultiples);
        
    }

    // Updates the Fourier Magnitude plot axis when DOM is reloaded or updated  
    componentDidUpdate(){
        // Get dimensions when DOM is updated
        this.height = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;

        d3.select("#fourierMagPlotTitleText").remove();
        
        let FourierMagSvg = d3.select("#svgFourierMagPlot")

        FourierMagSvg.append("text")
                         .attr("id","fourierMagPlotTitleText")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Fourier Magnitude Plot");

        // Updated drawing of the axis (default view of 4 terms)
        this.drawAxis(this.height, this.width, this.props.fourierMultiples);
        
    }

    // Function component to call to render a positive Fourier Magnitude Coefficient 
    renderCirclePos(signal, fourierMultiples){
        return(
            <FourierCirclesMagPos
                signal = {signal}
                fourierMultiples = {fourierMultiples}
            />
        );
    }

    // Function component to call to render a negative Fourier Magnitude Coefficient
    renderCircleNeg(signal, fourierMultiples){
        return(
            <FourierCirclesMagNeg
                signal = {signal}
                fourierMultiples = {fourierMultiples}
            />
        );
    }

    // Returns Fourier Magnitude Plot HTML code to parent class 
    render(){

        const signals = this.props.signals;
        const fourierMultiples = this.props.fourierMultiples;

        // call drawAxis to redraw axis if view mode was toggled between "default" and "full"
        this.drawAxis(this.height, this.width, fourierMultiples)

        // Generating circle SVG's for each of the positive and negative Fourier Coefficients
        const circleList = [];
          
        for (let i=0; i < signals.length; i++){
            // Render DC term
            if(signals[i].id === 0){
                circleList.push(
                    this.renderCirclePos(signals[i], fourierMultiples) 
                )
            }
            // Render all other Fourier Terms
            else{
                circleList.push(
                    this.renderCirclePos(signals[i], fourierMultiples),
                    this.renderCircleNeg(signals[i], fourierMultiples)
                )
             }
        }                    
   
        return( 
            <svg>
                {circleList}
            </svg>
        );
    }
}

/**
 * Returns HTML code to FourierCoefficients parent class to render the Fourier Phase Plot. 
 *
 * @param {object} props signals state array, fourierMultiples 
 * @return {HTML} HTML code for the Fourier Phase Plot.
 */
class FourierPhasePlot extends React.Component {

    // Initializing plot's height and width (to be updated later when DOM is loaded)
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    // Draws the axis for the Fourier Phase Plot when called
    drawAxis(height, width, fourierMultiples){

        let FourierMagSvg = d3.select("#svgFourierPhasePlot")

        // If axis exists but we are redrawing
        if(document.getElementById("x_axis_fourierPhasePlot") || document.getElementById("y_axis_fourierPhasePlot")){

            // remove current axis
            d3.select("#x_axis_fourierPhasePlot").remove();
            d3.select("#y_axis_fourierPhasePlot").remove();
        }

        // Drawing new axis

        // Creating axis domain based on pixel range for the plot
        let xscale_freq = d3.scaleLinear()
                            .domain([-fourierMultiples, fourierMultiples]) 
                            .range([ (1/10)*width, (9/10)*width ]);

        let yscale_freq = d3.scaleLinear()
                            .domain([180,-180]) 
                            .range([ (1/10)*height, (9/10)*height ]);

        // Configuring axis ticks
        const xAxisTicks = xscale_freq.ticks()
                            .filter(tick => Number.isInteger(tick));

        const yAxisTicks = yscale_freq.ticks()
                            .filter(tick => Number.isInteger(tick))                         
 
        let x_axis_freq = d3.axisBottom(xscale_freq)
                            .tickValues(xAxisTicks)
                            .tickFormat(d3.format("d"));

        let y_axis_freq = d3.axisLeft(yscale_freq)
                            .tickValues(yAxisTicks)
                            .tickFormat(d3.format("d"));
            
        // Adding the axis to the plot
        FourierMagSvg.append('g')
                     .attr("id","x_axis_fourierPhasePlot")
                     .attr("transform","translate(0," + this.height/2 + ")")
                     .attr("pointer-events", "none")
                     .call(x_axis_freq)

        FourierMagSvg.append('g')
                     .attr("id","y_axis_fourierPhasePlot")
                     .attr("transform","translate(" + this.width/2 + ",0)")
                     .attr("pointer-events", "none")
                     .call(y_axis_freq); 
        
    }
    
    // Creates the Fourier Magnitude plot when DOM is loaded  
    componentDidMount(){
        // Get dimensions when DOM is loaded
        this.height = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;

        // Adding plot title
        let FourierPhaseSvg = d3.select("#svgFourierPhasePlot")

        FourierPhaseSvg.append("text")
                         .attr("id","fourierPhasePlotTitleText")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Fourier Phase Plot");

        // Initial drawing of the axis (default view of 4 multiples)
        this.drawAxis(this.height, this.width, this.props.fourierMultiples);
        
    }

    // Updates the Fourier Magnitude plot axis when DOM is reloaded or updated
    componentDidUpdate(){
        // Get dimensions when DOM is updated
        this.height = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;

        d3.select("#fourierPhasePlotTitleText").remove();
        
        let FourierPhaseSvg = d3.select("#svgFourierPhasePlot")

        FourierPhaseSvg.append("text")
                         .attr("id","fourierPhasePlotTitleText")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Fourier Phase Plot");

        // Updated drawing of the axis (default view of 4 terms)
        this.drawAxis(this.height, this.width, this.props.fourierMultiples);
        
    }

    // Function component to call to render a positive Fourier Phase Coefficient 
    renderCirclePos(signal, fourierMultiples){
        return(
            <FourierCirclesPhasePos
                signal = {signal}
                fourierMultiples = {fourierMultiples}
            />
        );
    }

    // Function component to call to render a negative Fourier Phase Coefficient
    renderCircleNeg(signal, fourierMultiples){
        return(
            <FourierCirclesPhaseNeg
                signal = {signal}
                fourierMultiples = {fourierMultiples}
            />
        );
    }

    // Returns Fourier Phase Plot HTML code to parent class 
    render(){

        const signals = this.props.signals;
        const fourierMultiples = this.props.fourierMultiples;

        // call drawAxis to redraw axis if view mode was toggled between "default" and "full"
        this.drawAxis(this.height, this.width, fourierMultiples)
    
        // Generating circle SVG's for each of the positive and negative Fourier Coefficients
        const circleList = []; 
           
        for (let i=0; i < this.props.signals.length; i++){
            // Render DC term
            if(signals[i].id ===0){
                circleList.push(
                    this.renderCirclePos(this.props.signals[i], fourierMultiples) 
                )
            }
            // Render all other Fourier Terms
            else{
                circleList.push(
                    this.renderCirclePos(this.props.signals[i], fourierMultiples),
                    this.renderCircleNeg(this.props.signals[i], fourierMultiples)
                )
            }
               
        }
   
        return( 
            <svg>
                {circleList}
            </svg>
        );
    }
}

/**
 * Returns HTML code to FourierCoefficients parent class to render the Cosine Plot. 
 *
 * @param {object} props signals state array 
 * @return {HTML} HTML code for the Cosine Plot.
 */
class CosinePlot extends React.Component {

    // Initializing plot's height and width (to be updated later when DOM is loaded)
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    // Draws the axis for the Cosine Plot when called
    drawAxis(height, width){

        const svgCosinePlot = d3.select("#svgCosinePlot")

        // If axis exists but we are redrawing
        if(document.getElementById("x_axis_cosinePlot") || document.getElementById("y_axis_cosinePlot")){

            // remove current axis
            d3.select("#x_axis_cosinePlot").remove();
            d3.select("#y_axis_cosinePlot").remove();
        }

        // Drawing new axis

        // Creating axis domain based on pixel range for the plot
        let xscale = d3.scaleLinear()
                        .domain([0, 2]) 
                        .range([ (1/10)*width, (9/10)*width ]);

        let yscale = d3.scaleLinear()
                        .domain([4,-4]) 
                        .range([ (1/10)*height, (9/10)*height ]);

        // Configuring axis ticks
        let x_axis = d3.axisBottom()
                        .scale(xscale);

        let y_axis = d3.axisLeft()
                        .scale(yscale);

        // Adding the axis to the plot
        svgCosinePlot.append('g')
                     .attr("id","x_axis_cosinePlot")
                     .attr("transform", "translate(0," + height/2 + ")")
                     .attr("pointer-events", "none")
                     .call(x_axis);

            svgCosinePlot.append('g')
                     .attr("id","y_axis_cosinePlot")
                     .attr("transform","translate(" + (1/10)*width + ",0)")
                     .attr("pointer-events", "none")
                     .call(y_axis)
            
    }

    // Creates the Cosine plot when DOM is loaded  
    componentDidMount(){
        // Only get dimensions when DOM is loaded
        this.height = document.getElementById("cosinePlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("cosinePlotsID").getBoundingClientRect().width;

        // Adding plot title
        const svgCosinePlot = d3.select("#svgCosinePlot")

        svgCosinePlot.append("text")
                    .attr("id","cosinePlotTitleText")
                    .attr("text-anchor", "middle")  
                    .attr("x",this.width/2)
                    .attr("y",this.height/20)
                    .style("font-size", "16px") 
                    .style("text-decoration", "underline")  
                    .text("Cosine Plots");

        // Initial drawing of the axis 
        this.drawAxis(this.height, this.width);

    }

    // Updates the Cosine plot axis when DOM is reloaded or updated
    componentDidUpdate(){
        // Get dimensions when DOM is updated
        this.height = document.getElementById("cosinePlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("cosinePlotsID").getBoundingClientRect().width;

        d3.select("#cosinePlotTitleText").remove();
        
        let svgCosinePlot = d3.select("#svgCosinePlot")

        svgCosinePlot.append("text")
                         .attr("id","cosinePlotTitleText")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Cosine Plots");

        // Updated drawing of the axis
        this.drawAxis(this.height, this.width);
        
    }

    // Returns Cosine Plot HTML code to parent class 
    render(){
        const signals = this.props.signals;
    
        // "Overlay all sine plots into one graph" version
        for(let i = 0; i < signals.length; i++){

                
            // Creating the path svg for each signal  

            let lineGenerator = d3.line().curve(d3.curveNatural);
            let pathData = lineGenerator(signals[i].values);
    
            // If signal path exists, update
            if(document.getElementById(signals[i].pathID)){

                let signal = d3.select("#"+signals[i].pathID);

                // Checking if signal is highlighted
                let strokeWidth
                let color
                if(signals[i].highlight){
                    strokeWidth = 4;
                    signal.moveToFront();
                    color = 'blue'
                }
                else{
                    strokeWidth = 2;
                    signal.moveToBack();
                    color = signals[i].colour
                }
                
                signal.attr("d", pathData)
                      .attr("stroke", color)
                      .attr("stroke-width", strokeWidth)      
              
            }
            
            // Draws path if signal path doesn't exist
            if(!document.getElementById(signals[i].pathID)){

                d3.select("#svgCosinePlot").append("path")
                    .attr("id",signals[i].pathID)
                    .attr("d", pathData)
                    .attr("transform","translate(" + (1/10)*this.width + ")")
                    .attr("stroke", signals[i].colour)
                    .attr("stroke-width", 2)
                    .attr("fill", "none")
            }
        }

        return(
            <div></div>
        );
    }
}

/**
 * Returns HTML code to FourierCoefficients parent class to render the Sum of Signals Plot. 
 *
 * @param {object} props signals state array 
 * @return {HTML} HTML code for the Sum of Signals Plot.
 */
class SumPlot extends React.Component {

    // Initializing plot's height and width (to be updated later when DOM is loaded)
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    // Draws the axis for the Sum of Signals Plot when called
    drawAxis(height, width){

        const svgSumPlot = d3.select("#svgSumPlot")

        // If axis exists but we are redrawing
        if(document.getElementById("x_axis_sumPlot") || document.getElementById("y_axis_sumPlot")){

            // remove current axis
            d3.select("#x_axis_sumPlot").remove();
            d3.select("#y_axis_sumPlot").remove();
        }
    
        // Drawing new axis

        // Creating axis domain based on pixel range for the plot
        let xscale = d3.scaleLinear()
                        .domain([0, 2]) 
                        .range([ (1/10)*this.width, (9/10)*this.width ]);

        let yscale = d3.scaleLinear()
                        .domain([4,-4]) 
                        .range([(1/10)*this.height, (9/10)*this.height ]);

        // Configuring axis ticks
        let x_axis = d3.axisBottom()
                        .scale(xscale);

        let y_axis = d3.axisLeft()
                        .scale(yscale);

        // Adding the axis to the plot
        svgSumPlot.append('g')
                  .attr("id","x_axis_sumPlot")
                  .attr("transform", "translate(0," + this.height/2 + ")")
                  .attr("pointer-events", "none")
                  .call(x_axis);

        svgSumPlot.append('g')
                  .attr("id","y_axis_sumPlot")
                  .attr("transform","translate(" + (1/10)*this.width + ",0)")
                  .attr("pointer-events", "none")
                  .call(y_axis)

    }

    // Creates the Sum of Signals plot when DOM is loaded  
    componentDidMount(){
        // Only get dimensions when DOM is loaded
        this.height = document.getElementById("svgSumPlot").getBoundingClientRect().height;
        this.width = document.getElementById("svgSumPlot").getBoundingClientRect().width;

        // Adding plot title
        const svgSumPlot = d3.select("#svgSumPlot")

        svgSumPlot.append("text")
                .attr("id","sumPlotTitleText")
                .attr("text-anchor", "middle")  
                .attr("x",this.width/2)
                .attr("y",this.height/20)
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Sum of Signals Plot");

        // Initial drawing of the axis 
        this.drawAxis(this.height, this.width);

    }

    
    // Updates the Sum of Signals plot axis when DOM is reloaded or updated
    componentDidUpdate(){
        // Get dimensions when DOM is updated
        this.height = document.getElementById("svgSumPlot").getBoundingClientRect().height;
        this.width = document.getElementById("svgSumPlot").getBoundingClientRect().width;

        d3.select("#sumPlotTitleText").remove();
        
        let svgSumPlot = d3.select("#svgSumPlot")

        svgSumPlot.append("text")
                         .attr("id","sumPlotTitleText")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Sum of Signals Plot");

        // Updated drawing of the axis
        this.drawAxis(this.height, this.width);
        
    }
    

    // Returns Sum of Signals Plot HTML code to parent class 
    render(){

        // Generating Sum of Signals path (brute force summation)
        let sumSignals = []; 
        let plotWidth = 0.8 * this.width;

        for(let k = 0; k < plotWidth; k++){
            sumSignals.push([0,0]);
        }

        // Looping through all the signals
        for (let i=0; i < this.props.signals.length; i++){

            // Looping through and summing the signal values
            for(let j=0; j < this.props.signals[i].values.length; j++){
                sumSignals[j][0] = this.props.signals[i].values[j][0];
                sumSignals[j][1] += this.props.signals[i].values[j][1];
            }
            
        }

        // Centering the sum of signals path values to the middle of the plot's height 
        for (let n =0; n < sumSignals.length; n++){
            sumSignals[n][1] = sumSignals[n][1] - (this.props.signals.length-1)*(this.height/2)
        }

            
        // Creating the path svg for each signal  

        let lineGenerator = d3.line().curve(d3.curveNatural);
        let pathData = lineGenerator(sumSignals);

        // If signal path exists, update
        if(document.getElementById("path_Sum")){
            d3.select("#".concat("path_Sum")).attr("d", pathData)  
               
        }
        
        // Draws path if signal path doesn't exist
        if(!document.getElementById("path_Sum")){
             d3.select("#svgSumPlot").append("path")
                .attr("id","path_Sum")
                .attr("d", pathData)
                .attr("transform","translate(" + (1/10)*this.width + ")")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("fill", "none")
        }

        return(
            <div></div>
        );
    }
}

/**
 * Renders all the HTML code for the Fourier Coefficients page. 
 *
 * @return {HTML} HTML code for the FourierCoefficients topic page.
 */
export class FourierCoefficients extends React.Component {

    // Initializing page's default state
    constructor(props){
        super(props);
        this.state = {
            signals: [
                /* Example signal object 
                {
                    id: signals.length,
                    amplitude: amplitude,                
                    frequency: signals.length,   
                    phase: phase,
                    values: this.generateSignal(amplitude,signals.length,phase),
                    pathID: 'path_'.concat(i.toString(10)), 
                    draggingMag: false,    
                    draggingPhasePos: false,    
                    draggingPhaseNeg: false,  
                    colour: rgb(intensity,intensity,intensity),
                    highlight: false,
                    animating: false,
                }
                */
            ],
            demoSignal: 'select',
            plotViewState: false, // false is default view, true is full view
            plotView: 'Default',
            fourierMultiples: 4, // 4 is the default view, -4 to 4 multiples of fundamental frequency 
        };

        // These bindings are necessary to make `this.` work in the callback   
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseOverFourier = this.handleMouseOverFourier.bind(this);
        this.handleMouseMoveFourierMag = this.handleMouseMoveFourierMag.bind(this);
        this.handleMouseMoveFourierPhase = this.handleMouseMoveFourierPhase.bind(this);
        this.handleMouseOverSignalControls = this.handleMouseOverSignalControls.bind(this);
        this.handleDemoSignal = this.handleDemoSignal.bind(this);
        this.redrawSignal = this.redrawSignal.bind(this);
    }
    
    /* 
    * Adds a signal to the page's signals state array
    */
    addSignal(amplitude, phase){
        let signals = this.state.signals;

        // Colour intensity ranges from: 
        // Least intense: rgb(192,192,192) (Silver) 
        // Most intense: rgb(0,0,0) (Black)
        const intensity =  (192 - 48*amplitude);

        // Loop through the current state's signals array
        for(let i = 0; i < signals.length + 1; i++){

            // Add new signal object to end of array if we reach end of array
            if(i === signals.length){
                signals = signals.concat([{       
                    id: signals.length,
                    amplitude: amplitude,               
                    frequency: signals.length,   
                    phase: phase,
                    values: this.generateSignal(amplitude,signals.length,phase),
                    pathID: 'path_'.concat(i.toString(10)), 
                    draggingMag: false,    
                    draggingPhasePos: false,    
                    draggingPhaseNeg: false,  
                    colour: rgb(intensity,intensity,intensity),
                    highlight: false,
                    animating: false,
                },]);

                break;
            }

            // If there's a missing ID, insert it to appropriate index
            // e.g. id array: [0, 1, 3]. Therefore missing id 2
            if(i !== signals[i].id){
                let newSignal = {       
                    id: i,
                    amplitude: amplitude,                
                    frequency: i,   
                    phase: phase,
                    values: this.generateSignal(amplitude,i,phase),
                    pathID: 'path_'.concat(i.toString(10)), 
                    draggingMag: false,    
                    draggingPhasePos: false,    
                    draggingPhaseNeg: false,  
                    colour: rgb(intensity,intensity,intensity),
                    highlight: false,
                    animating: false,
                }

                signals.splice(i, 0, newSignal);
                break;
            }
        }

        // Once this.setState has been called, React will schedule an update to update the state
        this.setState({
            signals: signals,
        });        
    }

    /* 
    * Removes a signal from the signal state array given the signal's ID
    */
    removeSignal(signalID){

        // Need to find signal id from the array and delete, then re-update id's
        const signals = this.state.signals;

        // Finding signal's index in signals array based on signalID (DOM element ID)
        let index;
        for(index = 0; index < signals.length; index++){
            if(signals[index].id === signalID){
                break
            }
        }
        
        // Find the corresponding pathID and delete from DOM
        d3.select("#"+signals[index].pathID).remove();
        
        // Find the signal in the signals array and delete
        signals.splice(index,1)
        
        // Update the signals array
        this.setState({
            signals: signals,
        });
    
    }

    animateSignal(signalID){

        const signals = this.state.signals;
        // console.log(signalID)    

        // finding the signal
        let index;
        for(index = 0; index < signals.length; index++){
            if(signals[index].id === signalID){
                break
            }
        }

        // window.requestAnimationFrame(this.redrawSignal.bind(this, signals, index));
        
        // If we're not animating, we animate the signal
        // default value is false

        /*
        console.log(signals[index].animatingID)

        if(signals[index].animatingID === null){
            console.log('starting animation')
            let animatingID = this.redrawSignal(signals,index)
            signals[index].animatingID = animatingID
        }
        // If we're animating, we stop the animiation
        else if(signals[index].animatingID !== null){
            console.log('stopping animation')
            window.cancelAnimationFrame(signals[index].animatingID);
            signals[index].animatingID = null

            this.setState({
                signals: signals,
            });
        }
        */

        signals[index].animating = !signals[index].animating
        this.redrawSignal(signals,index, signals[index].animating)

        this.setState({
            signals: signals,
        });

    }

    redrawSignal(signals, index, animating){

        /* Remove the signal image */
        // Find the pathID and delete from DOM
        d3.select("#"+signals[index].pathID).remove();
        
        // Incrementing signal phase
        signals[index].phase += 1; 

        // Looping phase back to -180 degrees after passing 180 degrees
        if(signals[index].phase > 180){
            signals[index].phase = - 180
        }

        // Recalculating and redrawing signal

        // This may be a bit inefficient though?

        // DC Case
        
        if(signals[index].id === 0){
            signals[index].values = this.generateDC(signals[index].amplitude, signals[index].frequency, signals[index].phase)
        }
        else{
            signals[index].values = this.generateSignal(signals[index].amplitude, signals[index].frequency, signals[index].phase)
        }

        // "Cycling" the signal values
        // shift() removes the first item in the array and returns it
        // push() then pushes this first item into the last element in the array
        // signals[index].values.push(signals[index].values.shift())
        
        

        // let animatingID = requestAnimationFrame(this.redrawSignal.bind(this, signals, index, animating))
        
        // console.log('request:', animatingID)
        // console.log(animatingID)

        console.log(animating);
        if(animating === true){
            // console.log('starting animation')
            // let animatingID = this.redrawSignal(signals,index)

            let animatingID = requestAnimationFrame(this.redrawSignal.bind(this, signals, index, animating))
            
            // signals[index].animating = true
            this.setState({
                signals: signals,
            });
        }
        // If we're animating, we stop the animiation
        else if(animating === false){
            // console.log('stop:', animatingID)
            console.log('stopping animation')

            let animatingID = requestAnimationFrame(this.redrawSignal.bind(this, signals, index, animating))
            cancelAnimationFrame(animatingID)
            
            // signals[index].animating = false
        }

            


        // return animatingID
    }
    
    /*
    * Returns an array of cosine values given amplitude, frequency and phase values. 
    * Note: This function assumes that sumPlot and CosinePlots have the same dimensions, 
    *       since generateSignal() is called from those two plots
    */
    generateSignal(amplitude, frequency, phase){

        let points = [];
        
        const divHeight = document.getElementById("svgSumPlot").getBoundingClientRect().height;
        const plotWidth = 0.8 * document.getElementById("svgSumPlot").getBoundingClientRect().width;

        let scale = -divHeight/10;
        let x_offset = 0;
        let y_offset = 0;

        let Ts = Math.PI / (plotWidth/4);

        /* Calculation Reference
        // Assuming a plot is 800x800
        // 1 period = 1 second
        // If 1 period = 400 pixels, => then Ts = 400 samples per second

        // Sampling frequency = samples/second
        // 1 sample per 1/400 second (Ts = 1/400)
        // Ts = 2pi * (1/400)
        // Ts = pi / 200

        // Frequency is in Hz
        // Here, i refers to each unit of time
        */

        for(let i = x_offset; i< plotWidth; i++)
        {
            points[i] = [i, scale*amplitude*Math.cos(Ts*frequency*i + (phase * (Math.PI / 180) )) + (divHeight/2 + y_offset)];
        }

        return points;
    }

    /* 
    * Returns an array of values corresponding to a straight line, given an amplitude value.
    * Used to generate the signal for the 0th multiple of the fundamental frequency
    */ 
    generateDC(amplitude){

        let points = [];

        const divHeight = document.getElementById("svgSumPlot").getBoundingClientRect().height;
        const plotWidth = 0.8 * document.getElementById("svgSumPlot").getBoundingClientRect().width;
        
        let scale = - divHeight/10;
        let x_offset = 0;
        let y_offset = 0;

        for(let i = x_offset; i< plotWidth; i++)
        {
            points[i] = [i, scale*amplitude + (divHeight/2 + y_offset)];
        }
 
        return points
    }

    /*
    * Updates all signals' amplitude and phase values in the HTML when called.
    * Note: This method may be quite inefficient, as it loops through all signals, re-assigns and
    *       updates each signal's values in the HTML, even if only one signal's value has changed. 
    */
    updateDials(){
        const signals = this.state.signals;

        for(let i = 0; i< signals.length; i++){
            document.getElementById("signal" + signals[i].id + "_AmpText").value = signals[i].amplitude;
            document.getElementById("signal" + signals[i].id + "_FreqText").value = signals[i].frequency;
        }
    }

    /* 
    * Handles user input for an individual signal's control panel (slider or text input)
    */ 
    handleChange(event){

        // Collecting event information 
        const signals = this.state.signals;
        const inputType = event.target.getAttribute('input_type');
        const signalID = parseInt(event.target.getAttribute('signal_id')); // Signal ID Number
        let value = parseFloat(event.target.value);   

        // Checking if user input was an amplitude change
        if((inputType === "AmpDial") || (inputType === "AmpText")){
            
            // Sanity check if input is not a float number 
            if(isNaN(value)){
                value = 0;
            }

            else{

                // Finding signal's index in signals array based on signalID (DOM element ID)
                let index;
                for(index = 0; index < signals.length; index++){
                    if(signals[index].id === signalID){
                        break
                    }
                }

                // Setting limits
                if(value>4){
                    value = 4
                }
                else if(value < 0){
                    value = 0
                }

                // Updating signal's amplitude and path values

                // DC Case
                if(signalID === 0){
                    signals[index].amplitude = value; 
                    signals[index].values = this.generateDC(signals[index].amplitude);
                    document.getElementById("signal" + signalID + "_AmpText").value = value;

                    const intensity =  (192 - 48*value);
                    signals[index].colour = rgb(intensity,intensity,intensity);
                }

                // All Other cases
                else{
                    signals[index].amplitude = value;                 
                    signals[index].values = this.generateSignal(signals[index].amplitude, signals[index].frequency, signals[index].phase);
                    document.getElementById("signal" + signalID + "_AmpText").value = value;

                    const intensity =  (192 - 48*value);
                    signals[index].colour = rgb(intensity,intensity,intensity);
                }     
            }
        }

        // Checking if user input was a phase change
        else if ((inputType === "PhaseDial") || (inputType === "PhaseText")){

            // Sanity check if input is not a float number
            if(isNaN(value)){
                value = 0;
            }

            else{

                // Finding signal's index in signals array based on signalID (DOM element ID)
                let index;
                for(index = 0; index < signals.length; index++){
                    if(signals[index].id === signalID){
                        break
                    }
                }            
            
                // Setting limits
                if(value>180){
                    value = 180
                }
                else if(value < -180){
                    value = -180
                }

                // Updating signal's phase and path values

                // DC Case
                if(signalID === 0){
                    signals[index].phase = value; 
                    signals[index].values = this.generateDC(signals[index].amplitude);
                    document.getElementById("signal" + signalID + "_PhaseText").value = value;
                }

                // All Other cases
                else{
                    signals[index].phase = value; 
                    signals[index].values = this.generateSignal(signals[index].amplitude, signals[index].frequency, signals[index].phase);
                    document.getElementById("signal" + signalID + "_PhaseText").value = value;
                }
            }
        }     

        // Updating page's state with updated signals array
        this.setState({
                signals: signals,   
            }   
        );

    }
    
    /*
    * Handles mouse button down events (click down)
    * Embedded in Fourier Plot SVG elements for Fourier Coefficients circles dragging functionality
    */
    handleMouseDown(e){

        e.preventDefault();
        e.stopPropagation()

        const elementID = e.target.getAttribute('id');
        
        // Sanity check
        if(elementID !== null){

            // Check if a circle was clicked
            const condition = elementID.includes("circle_");

            if(condition){

                // Collecting event information 
                const signals = this.state.signals;
                const signalID = parseInt(e.target.getAttribute('signal_id')); // Signal ID Number
                const circleID = e.target.getAttribute('id'); // Circle ID 
                
                // Finding signal's index in signals array based on signalID (DOM element ID)
                let index;
                for(index = 0; index < signals.length; index++){
                    if(signals[index].id === signalID){
                        
                        break
                    }
                }
                
                // Toggling circle's dragging state   
                if(circleID.includes("circle_mag")){
                    signals[index].draggingMag = true;
                } 
                if(circleID.includes("circle_phase_+")){
                    signals[index].draggingPhasePos = true;
                } 
                if(circleID.includes("circle_phase_-")){
                    signals[index].draggingPhaseNeg = true;
                } 

                // Updating page's state with updated signals array
                this.setState({
                    signals: signals,   
                    }
                );   
            }
        }
    }

    
    /*
    * Handles mouse button up events (click release)
    * Embedded in Fourier Plot SVG elements for Fourier Coefficients circles dragging functionality
    */
    handleMouseUp(e){

        e.stopPropagation()
        e.preventDefault()

        const signals = this.state.signals;
        const elementID = e.target.getAttribute('id');

        // Sanity check
        if(elementID !== null){

            // set all signals dragging to false
            for(let n = 0; n < signals.length; n++){
                signals[n].draggingMag = false;
                signals[n].draggingPhasePos = false;
                signals[n].draggingPhaseNeg = false;
            }
                
            // Updating page's state with updated signals array
            this.setState({
                signals: signals,   
            });
        }
    }

    /*
    * Handles mouse move events (dragging) for Fourier Magnitude Coefficients' circles
    * Embedded in Fourier Plot SVG elements for Fourier Coefficients circles dragging functionality
    */
    handleMouseMoveFourierMag(e) {

        e.stopPropagation()
        e.preventDefault()
        
        // Collecting event information
        const elementID = e.target.getAttribute('id');

        // Sanity check
        if(elementID !== null){

            const signals = this.state.signals;
                
            // Note: 
            // Getting signal id number will not work if mouse event is outside of the div element (e.g. outside the plot)
            // Currently not an issue since there are position limits for the circle elements

            // Find the signal that is dragging 
            let index;
            let dragging = false;
            for(let n = 0; n < signals.length; n++){
                if(signals[n].draggingMag === true){
                    
                    dragging = true;
                    index = n;
                }
            }

            // If circle is dragging
            if (dragging) {

                let  rect = document.getElementById("fourierMagPlotsID").getBoundingClientRect();  

                let divHeight = rect.height;
                let divWidth = rect.width;
                let plotHeight = 0.8*divHeight;
                let plotWidth = 0.8*divWidth;

                // Divide by 8: max axis size (-4 to 4) (relative to Cosine plot y axis)
                let amplitude = - (e.clientY - rect.top - divHeight/2) / (plotHeight/8);

                // Setting plot y-axis limits
                if(amplitude > 4){
                    amplitude = 4;
                }
                if(amplitude < 0){
                    amplitude = 0;
                }

                /* Updating signal amplitude, phase and values */
                
                // Maybe should seperate coordinates and freq/amp values in future
                signals[index].frequency = signals[index].id;
                signals[index].amplitude = amplitude;    
                    
                const intensity =  (192 - 48*amplitude)
                signals[index].colour = rgb(intensity,intensity,intensity);


                // Checking if signal is the DC case
                if(index === 0){
                    signals[index].values = this.generateDC(signals[index].amplitude);
                }
                // All other cases
                else{
                    signals[index].values = this.generateSignal(signals[index].amplitude, signals[index].frequency, signals[index].phase);
                
                }

                // Updating page's state with updated signals array
                this.setState({
                    signals: signals,   
                });  
            }
        }
    }
    
    /*
    * Handles mouse move events (dragging) for Fourier Phase Coefficients' circles
    * Embedded in Fourier Plot SVG elements for Fourier Coefficients circles dragging functionality
    */
    handleMouseMoveFourierPhase(e) {

        e.stopPropagation()
        e.preventDefault()

        const elementID = e.target.getAttribute('id');

        // Sanity check
        if(elementID !== null){

            const signals = this.state.signals;

            // Note: 
            // Getting signal id number will not work if mouse event is outside of the div element (e.g. outside the plot)
            // Currently not an issue since there are position limits for the circle elements

            // Find the signal that is dragging 
            let index;
            let draggingPhasePos = false;
            let draggingPhaseNeg = false;
            for(let n = 0; n < signals.length; n++){
                if(signals[n].draggingPhasePos === true ){                        
                    draggingPhasePos = true;
                    index = n;
                }
                if(signals[n].draggingPhaseNeg === true){                      
                    draggingPhaseNeg = true;
                    index = n;
                }
            }

            // If circle is dragging
            if(draggingPhasePos || draggingPhaseNeg){

                let rect = document.getElementById("fourierPhasePlotsID").getBoundingClientRect();  

                let divHeight = rect.height;
                let divWidth = rect.width;
                let plotHeight = 0.8*divHeight;
                let plotWidth = 0.8*divWidth;

                // Finding circle element's ID from the mouse event 
                let circleID;
                if(draggingPhasePos){
                    circleID = "circle_phase_+".concat(index.toString(10)); 
                }
                if(draggingPhaseNeg){
                    circleID = "circle_phase_-".concat(index.toString(10)); 
                }
                
                /* Updating signal amplitude, phase and values */

                const circleCX = parseInt(document.getElementById(circleID).getAttribute("cx"))
                
                // Positive Circle case
                if(circleCX >= 0){

                    // Divide by 360: max axis size (-180 to 180) (relative to FourierPhasePlot y axis)
                    let phase = parseInt( - (e.clientY - rect.top - divHeight/2) / (plotHeight/360));
                    
                    // Setting plot y-axis limits
                    if(phase > 180){
                        phase = 180;
                    }
                    if(phase < -180){
                        phase = -180;
                    }
                    signals[index].phase = phase;
                } 

                // Negative Circle case (inverted direction)
                else if(circleCX < 0){

                    // Divide by 360: max axis size (-180 to 180) (relative to FourierPhasePlot y axis)
                    let phase = parseInt( (e.clientY - rect.top - divHeight/2) / (plotHeight/360));

                    // Setting plot y-axis limits
                    if(phase > 180){
                        phase = 180;
                    }
                    if(phase < -180){
                        phase = -180;
                    }
                    signals[index].phase = phase;
                } 

                signals[index].frequency = signals[index].id; 
                
                // Checking if signal is the DC case
                if(index === 0){
                    signals[index].values = this.generateDC(signals[index].amplitude);
                }
                // All other cases
                else{
                    signals[index].values = this.generateSignal(signals[index].amplitude, signals[index].frequency, signals[index].phase);
                }

                // Updating page's state with updated signals array
                this.setState({
                    signals: signals,   
                    }
                );  
            }
        }
    }

    /*
    * Handles mouse over events (highlighting) for Fourier Phase Coefficients' circles
    * Embedded in Fourier Plot SVG elements for Fourier Coefficients circles
    */
    handleMouseOverFourier(e){

        e.stopPropagation()
        e.preventDefault()
        
        const elementID = e.target.getAttribute('id');
        
        // Sanity check
        if(elementID !== null){

            const condition = elementID.includes("circle_");
            const signals = this.state.signals;

            // If mouseover event was over a circle 
            if(condition){
                
                const signalID = parseInt(e.target.getAttribute('signal_id')); 
                const circleID = e.target.getAttribute('id');  

                // Finding signal's index in signals array based on signalID (DOM element ID)
                let index;
                for(index = 0; index < signals.length; index++){
                    if(signals[index].id === signalID){
                        break
                    }
                }
                signals[index].highlight = true;

                // Highlighting signal control panel
                let signalControlID = 'signal-controls-'.concat(signalID.toString())
                document.getElementById(signalControlID).style.opacity = 1;
            }

            // If the mouseover is not over a circle
            else {

                // Set all highlight booleans to false
                let signalControlID
                for(let n = 0; n < signals.length; n++){
                    signals[n].highlight = false;
                    signalControlID = 'signal-controls-'.concat(n.toString())

                    // Check if the signal's control panel exists
                    if(document.getElementById(signalControlID)){
                        // Un-highlighting signal control panel
                        document.getElementById(signalControlID).style.opacity = 0.6;
                    }
                }  
            }

            // Updating page's state with updated signals array
            this.setState({
                signals: signals,   
            });
        }
    }

    handleMouseOverSignalControls(e){
        const elementID = e.target.getAttribute('id');
        console.log(elementID);

        /*
        // sanity check
        if(elementID !== null){

            const condition = elementID.includes("signal-controls-");
            const signals = this.state.signals;

            // if a mouseover was over a signal control panel 
            if(condition){

                console.log('signal mouse over!')
                
                const signalID = parseInt(e.target.getAttribute('signal_id')); // Signal ID Number

                // Finding signal array's index from signal id
                let index;
                for(index = 0; index < signals.length; index++){
                    if(signals[index].id === signalID){
                         
                        break
                    }
                }
                signals[index].highlight = true;

                let signalControlID = 'signal-controls-'.concat(signalID.toString())
                console.log(signalControlID)
                document.getElementById(signalControlID).style.opacity = 1;
            }

            // if the mouseover is not over a circle
            else {
                // Set all highlight to false

                let signalControlID
                for(let n = 0; n < signals.length; n++){
                    signals[n].highlight = false;

                    signalControlID = 'signal-controls-'.concat(n.toString())
                    // Check if signal dials exists
                    if(document.getElementById(signalControlID)){
                        document.getElementById(signalControlID).style.opacity = 0.6;
                    }
                }  
            }

            this.setState({
                signals: signals,   
            });
        }
        */
    }


    /*
    * Toggles between 'default' and 'full' view of the Fourier Magnitude and Phase Plots
    * The view will only toggle to 'full' view if there are more than 4 Fourier multiples on the plots
    */
    toggleView(e){

        // Toggle the state
        // False: Default 
        // True: Full
        const plotViewState = !this.state.plotViewState; 

        // Default View
        if(!plotViewState){
            
            this.setState({
                fourierMultiples: 4,
                plotViewState: plotViewState,
                plotView: 'Default',
            });
        }

        // Full View
        else{

            const fourierMultiples = this.state.signals.length - 1; // -1 because of DC term

            // Only change to full view if there are more than 4 Fourier Multiples
            if(fourierMultiples > 4){
                this.setState({
                    fourierMultiples: fourierMultiples,
                    plotViewState: plotViewState,
                    plotView: 'Full',
                });
            }
            else{
                this.setState({
                    fourierMultiples: 4,
                    plotViewState: plotViewState,
                    plotView: 'Full',
                });
            }
        }
    }

    /*
    * Removes all signals from the signal state array
    * Removes all signal SVG elements on the CosinePlot, SumPlot, FourierMagPlot, FourierPhasePlot    
    * i.e. Removes the signal path and Fourier Coefficients' circles SVG's    
    */
    emptyPlots(){
        let signals = this.state.signals;

        for(let i = 0; i< signals.length; i++){                 

            d3.select("#"+signals[i].pathID).remove();
        }  

        return signals = [];
    }

    /*
    * Handles user input select event of a selected demo signal
    * Updates the signals array and the demoSignal string in the 'global' state object
    */
    handleDemoSignal(e){

        let signals = this.state.signals;
        const demoSignal = e.target.value;

        if(demoSignal === 'empty'){
            signals = this.emptyPlots();
        }

        // Note: If there are multiple local setState() calls, only the last call will run (the prior ones won't run)
        // Hence why here, instead of repeatedly calling addSignal(), the code explicitly generates the signals array
        // setState() is asynchronous and are batched for performance gains. 
        
        if(demoSignal === 'cosine'){
 
            signals = this.emptyPlots();

            // Generating DC signal
            let amplitude = 0;
            signals = signals.concat([{       
                id: signals.length,
                amplitude: amplitude,               
                frequency: signals.length,  
                phase: 0,
                values: this.generateDC(amplitude,signals.length,0),
                pathID: 'path_0', 
                draggingMag: false,    
                draggingPhasePos: false, 
                draggingPhaseNeg: false,
                colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                highlight: false,
                animating: false,
            },])

            // Generating other sine waves
            amplitude = 1;
            signals = signals.concat([{       
                id: signals.length,
                amplitude: amplitude,                
                frequency: signals.length,   
                phase: 0,
                values: this.generateSignal(amplitude,signals.length,0),
                pathID: 'path_1', 
                draggingMag: false,    
                draggingPhasePos: false, 
                draggingPhaseNeg: false, 
                colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                highlight: false,
                animating: false,
            },])
        }


        if(demoSignal === 'triangle'){
            signals = this.emptyPlots();

            let amplitude = 0
            // Generating DC signal
            signals = signals.concat([{       
                id: signals.length,
                amplitude: amplitude,               
                frequency: signals.length,  
                phase: 0,
                values: this.generateDC(amplitude,signals.length,0),
                pathID: 'path_0',  
                draggingMag: false,    
                draggingPhasePos: false, 
                draggingPhaseNeg: false,     
                colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                highlight: false,
                animating: false,
            },])

            // Generating other sine waves
            let alternate = true;
            for(let i = 1; i < 20; i++){
                // Odd
                if((i % 2) !== 0 ){
                    amplitude = (8/Math.pow(Math.PI,2))*(1/Math.pow(i,2));

                    // Non-phase shifted harmonic
                    if(alternate){
                        signals = signals.concat([{       
                            id: signals.length,
                            amplitude: amplitude,                
                            frequency: signals.length,   
                            phase: 90,
                            values: this.generateSignal(amplitude,signals.length,90),
                            pathID: 'path_'.concat(i.toString(10)), 
                            draggingMag: false,    
                            draggingPhasePos: false, 
                            draggingPhaseNeg: false,   
                            colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                            highlight: false,
                            animating: false,
                        },])
                        alternate = !alternate; 
                    }
                    // Phase shifted harmonic
                    else if(!alternate){
                        signals = signals.concat([{       
                            id: signals.length,
                            amplitude: amplitude,                
                            frequency: signals.length,   
                            phase: -90,
                            values: this.generateSignal(amplitude,signals.length, -90),
                            pathID: 'path_'.concat(i.toString(10)), 
                            draggingMag: false,    
                            draggingPhasePos: false, 
                            draggingPhaseNeg: false,    
                            colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                            highlight: false,
                            animating: false,
                        },])
                        alternate = !alternate; 
                    }    
                    
                }
                // Even
                if((i % 2) === 0 ){
                    amplitude = 0;
                    
                    signals = signals.concat([{       
                        id: signals.length,
                        amplitude: 0,                
                        frequency: signals.length,   
                        phase: 0,
                        values: this.generateSignal(0,signals.length,0),
                        pathID: 'path_'.concat(i.toString(10)), 
                        draggingMag: false,    
                        draggingPhasePos: false, 
                        draggingPhaseNeg: false,    
                        colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                        highlight: false,
                        animating: false,
                    },])
                }
                    
            }
        }

        if(demoSignal === 'square'){
            signals = this.emptyPlots();

            // Generating DC signal
            let amplitude = 0
            signals = signals.concat([{       
                id: signals.length,
                amplitude: amplitude,               
                frequency: signals.length,  
                phase: 0,
                values: this.generateDC(amplitude,signals.length,0),
                pathID: 'path_0', 
                draggingMag: false,    
                draggingPhasePos: false, 
                draggingPhaseNeg: false,  
                colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                highlight: false,
                animating: false,
            },])

            // Generating other sine waves

            for(let i = 1; i < 25; i++){
                // Odd
                if((i % 2) !== 0 ){
                    
                    amplitude = (4/Math.PI)*(1/i);

                    signals = signals.concat([{       
                        id: signals.length,
                        amplitude: amplitude,                
                        frequency: signals.length,   
                        phase: 90,
                        values: this.generateSignal(amplitude,signals.length,90),
                        pathID: 'path_'.concat(i.toString(10)), 
                        draggingMag: false,    
                        draggingPhasePos: false, 
                        draggingPhaseNeg: false,     
                        colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                        highlight: false,
                        animating: false,
                    },])    

                }
                // Even
                if((i % 2) === 0 ){

                    amplitude = 0

                    signals = signals.concat([{       
                        id: signals.length,
                        amplitude: amplitude,                
                        frequency: signals.length,   
                        phase: 90,
                        values: this.generateSignal(amplitude,signals.length,90),
                        pathID: 'path_'.concat(i.toString(10)), 
                        draggingMag: false,    
                        draggingPhasePos: false, 
                        draggingPhaseNeg: false,    
                        colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                        highlight: false,
                        animating: false,
                    },])
                }
                    
            }
        }

        if(demoSignal === 'sawtooth'){
            signals = this.emptyPlots();

            // Generating DC signal
            let amplitude = 0
            signals = signals.concat([{       
                id: signals.length,
                amplitude: amplitude,               
                frequency: signals.length,  
                phase: 0,
                values: this.generateDC(amplitude,signals.length,0),
                pathID: 'path_0', 
                draggingMag: false,    
                draggingPhasePos: false, 
                draggingPhaseNeg: false,     
                colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                highlight: false,
                animating: false,
            },])

            // Generating other sine waves
            for(let i = 1; i < 25; i++){

                amplitude = (4/Math.PI)*(1/i);

                // Odd
                if((i % 2) !== 0 ){    
                    signals = signals.concat([{       
                        id: signals.length,
                        amplitude: amplitude,                
                        frequency: signals.length,   
                        phase: -90,
                        values: this.generateSignal(amplitude,signals.length,-90),
                        pathID: 'path_'.concat(i.toString(10)), 
                        draggingMag: false,    
                        draggingPhasePos: false, 
                        draggingPhaseNeg: false,    
                        colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                        highlight: false,
                        animating: false,
                    },])    
                }
                // Even
                if((i % 2) === 0 ){
                    signals = signals.concat([{       
                        id: signals.length,
                        amplitude: amplitude,                
                        frequency: signals.length,   
                        phase: 90,
                        values: this.generateSignal(amplitude,signals.length,90),
                        pathID: 'path_'.concat(i.toString(10)), 
                        draggingMag: false,    
                        draggingPhasePos: false, 
                        draggingPhaseNeg: false,    
                        colour: rgb((192 - 48*amplitude), (192 - 48*amplitude),(192 - 48*amplitude)),
                        highlight: false,
                        animating: false,
                    },])
                }
                    
            }
        }

        // Updating page's state with updated signals array and demo signal string
        this.setState({
            signals: signals,
            demoSignal: demoSignal,
        });
    }

    // Renders the HTML code for the FourierCoefficients page (other than the navigation bar)
    // Renders the Controls column, CosinePlot, SumPlot, FourierMagPlot, FourierPhasePlot
    render() {

    const current = this.state.signals;
    const fourierMultiples = this.state.fourierMultiples;

    return (
            <div className = {styles.container}>

                <div className = {styles.timePlots} id = "timePlotsID">
                    <div className = {styles.cosinePlots} id ="cosinePlotsID">
                        <svg id="svgCosinePlot" width="40vw" height="45vh" 
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black'
                            }}> 

                            <CosinePlot
                                signals = {current}
                            />

                        </svg>
                    </div>

                    <div className = {styles.sumPlots} id ="sumPlotsID">
                        <svg id="svgSumPlot" width="40vw" height="45vh" 
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black'
                            }}> 

                            <SumPlot
                                signals = {current}
                            />
                            
                        </svg>
                    </div>

                </div>

                <div className = {styles.otherPlots}>

                    <div className = {styles.fourierMagPlots} id ="fourierMagPlotsID">

                        <svg id="svgFourierMagPlot" width="40vw" height="45vh"  
                            onMouseDown = {(event) => this.handleMouseDown(event)}
                            onMouseUp = {(event) => this.handleMouseUp(event)}
                            onMouseMove = {(event) => this.handleMouseMoveFourierMag(event)}
                            onMouseOver = {(event) => this.handleMouseOverFourier(event)}
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black',
                            }}> 
                            
                            <FourierMagPlot
                                signals = {current}
                                fourierMultiples = {fourierMultiples}
                            />
                
                        </svg>
                    </div>

                    <div className = {styles.fourierPhasePlots} id ="fourierPhasePlotsID">
                        <svg id="svgFourierPhasePlot" width="40vw" height="45vh"
                            onMouseDown = {(event) => this.handleMouseDown(event)}
                            onMouseUp = {(event) => this.handleMouseUp(event)}
                            onMouseMove = {(event) => this.handleMouseMoveFourierPhase(event)}  
                            onMouseOver = {(event) => this.handleMouseOverFourier(event)}
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black',
                            }}> 
                        
                            <FourierPhasePlot
                                signals = {current}
                                fourierMultiples = {fourierMultiples}
                            />

                        </svg>
                    </div>  

                </div>

                <div className = {styles.controls} onMouseOver = {(event) => this.handleMouseOverSignalControls(event)}>
        
                        <Controls
                            signals = {current}
                            plotView = {this.state.plotView}
                            demoSignal = {this.state.demoSignal}
                            onChange = {(event) => this.handleChange(event)}
                            onAdd = {(amplitude, phase) => this.addSignal(amplitude, phase)}
                            onRemove = {(signalID) => this.removeSignal(signalID)}
                            onAnimate = {(signalID) => this.animateSignal(signalID)}
                            onDemoSignal = {(event) => this.handleDemoSignal(event)}
                            onToggleView = {(event) => this.toggleView(event)}
                        />
                    
                </div>
            </div>
      );
    }
  }