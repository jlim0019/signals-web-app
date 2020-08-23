import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './FourierCoefficients.module.css'; 
import * as d3 from "d3";
import { hsl } from 'd3';

function Dials(props) {
    return(
        <div className={styles.signal_container}>
            <div className={styles.signal_info}>

                <div className={styles.tooltip}>
                    | Help |
                        <span className={styles.tooltiptext}>
                            <p>This is the control panel to adjust signal properties.</p>
                            <p>Try adjusting the Amplitude and Phase!</p>
                        </span>
                    
                </div>
                
                <div>ID: {props.signal.id}</div>
                <button id = "remove-signal" onClick={(i) => props.onRemove(props.signal.id)}> Remove Signal </button>
                <div> Colour </div>
                <svg height = "40" width = "20">
                    <circle
                        r = {10}
                        cx = {10}
                        cy = {20}
                        fill = {props.signal.colour}
                        stroke = "black"
                        strokeWidth="1"
                    />
                </svg>
            </div>
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
                    min={-5} 
                    max ={5} 
                    value = {props.signal.amplitude} 
                    step={0.1}
                    onChange={props.onChange}
                    /> 
                    <input
                    id = {"signal" + props.signal.id + "_AmpText" }
                    signal_id = {props.signal.id}
                    input_type = {"AmpText"}
                    type = "number"  
                    min = {-5}
                    max = {5}
                    onChange={props.onChange}
                    />
                </div>
            </div>


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
        </div>
    );
}

class Controls extends React.Component {

    renderDial(signal){
        return(
            <Dials
                signal = {signal}
                onChange = {(event) => this.props.onChange(event)}
                onRemove = {(i) => this.props.onRemove(i)}
            />
        );
    }

    render(){
        const signalList = []; 
        for (let i=0; i < this.props.signals.length; i++){
            signalList.push(
                <div key={"signal" + this.props.signals[i].id}> 
                    {this.renderDial(this.props.signals[i])} 
                </div>
            )
        }
        return(
            <div className = {styles.dials} >
                <div className = {styles.global_controls}>

                    <div className={styles.tooltip}>
                        | Help |
                            <span className={styles.tooltiptext}>
                                <p>Try adding a signal!</p>
                            </span>
                    </div>
                    <button id = "add-signal" align-content = "center" onClick={() => this.props.onAdd()}> Add New Signal </button>
                </div>
                {signalList}
            </div>
        );
    }
}

function FourierCirclesMagPos(props) {
    let divHeight = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    return(
        <circle
            id = {"circle_"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*(plotWidth/8)}
            cy = {(props.signal.amplitude)*(plotHeight/8)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {10}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth="1"
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseOut={props.onMouseUp}
            onMouseMove={props.onMouseMove}
        />
    );
}

function FourierCirclesMagNeg(props) {
    let divHeight = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    return(
        <circle
            id = {"circle_-"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*-(plotWidth/8)} // 8 is because our x-axis is divided into 8 sections 
            cy = {(props.signal.amplitude)*(plotHeight/8)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {10}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth="1"
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseOut={props.onMouseUp}
            onMouseMove={props.onMouseMove}
        />
    );
}

function FourierCirclesPhasePos(props) {
    let divHeight = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    return(
        <circle
            id = {"circle_"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*(plotWidth/8)} // 8 is because our x-axis is divided into 8 sections 
            cy = {(props.signal.phase)*(plotHeight/360)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {10}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth="1"
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseOut={props.onMouseUp}
            onMouseMove={props.onMouseMove}
        />
    );
}

function FourierCirclesPhaseNeg(props) {
    let divHeight = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
    let divWidth = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;
    let plotHeight = 0.8*divHeight;
    let plotWidth = 0.8*divWidth;

    return(
        <circle
            id = {"circle_-"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*-(plotWidth/8)} // 8 is because our x-axis is divided into 8 sections 
            cy = {-(props.signal.phase)*(plotHeight/360)}
            transform={"translate(" + divWidth/2 +"," + divHeight/2 +") scale(1,-1)"}
            r = {10}
            fill = {props.signal.colour}
            stroke = "black"
            strokeWidth="1"
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseOut={props.onMouseUp}
            onMouseMove={props.onMouseMove}
        />
    );
}

class FourierMagPlot extends React.Component {
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    componentDidMount(){
        // Only get dimensions when DOM is loaded
        this.height = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;

        let FourierMagSvg = d3.select("#svgFourierMagPlot")

        // Should probably check both axis if they exist before appending
        if(!document.getElementById("x_axis_fourierMagPlot")){
   
            // Create Axis for Frequency Plot
            let xscale_freq = d3.scaleLinear()
                    .domain([-4, 4]) // This needs to be dynamic
                    .range([ (1/10)*this.width, (9/10)*this.width ]);

            let yscale_freq = d3.scaleLinear()
                    .domain([4,-4]) // This needs to be dynamic
                    .range([ (1/10)*this.height, (9/10)*this.height ]);

            // Add scales to axis
            const xAxisTicks = xscale_freq.ticks()
                                     .filter(tick => Number.isInteger(tick));
 
            let x_axis_freq = d3.axisBottom(xscale_freq)
             .tickValues(xAxisTicks)
             .tickFormat(d3.format("d"));

            let y_axis_freq = d3.axisLeft(yscale_freq);

            FourierMagSvg.append("text")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Fourier Magnitude Plot");

            FourierMagSvg.append('g')
                         .attr("id","x_axis_fourierMagPlot")
                         .attr("transform","translate(0," + this.height/2 + ")")
                         .call(x_axis_freq)

            FourierMagSvg.append('g')
                         .attr("id","y_axis_fourierMagPlot")
                         .attr("transform","translate(" + this.width/2 + ",0)")
                         .call(y_axis_freq); 
        }
    }

    renderCirclePos(signal){
        return(
            <FourierCirclesMagPos
                signal = {signal}
                onMouseDown = {(event) => this.props.onMouseDown(event)}
                onMouseUp = {(event) => this.props.onMouseUp(event)}
                onMouseOut = {(event) => this.props.onMouseUp(event)}
                onMouseMove = {(event) => this.props.onMouseMove(event)}
            />
        );
    }

    renderCircleNeg(signal){
        return(
            <FourierCirclesMagNeg
                signal = {signal}
                onMouseDown = {(event) => this.props.onMouseDown(event)}
                onMouseUp = {(event) => this.props.onMouseUp(event)}
                onMouseOut = {(event) => this.props.onMouseUp(event)}
                onMouseMove = {(event) => this.props.onMouseMove(event)}
            />
        );
    }

    render(){

        const signals = this.props.signals;
   
           const circleList = [];
          
           for (let i=0; i < this.props.signals.length; i++){
                if(i ==0){
                    circleList.push(
                        this.renderCirclePos(this.props.signals[i]) 
                    )
                }
                else{
                    circleList.push(
                        this.renderCirclePos(this.props.signals[i]),
                        this.renderCircleNeg(this.props.signals[i])
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

class FourierPhasePlot extends React.Component {
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    componentDidMount(){
        // Only get dimensions when DOM is loaded
        this.height = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;

        let FourierPhaseSvg = d3.select("#svgFourierPhasePlot")

        // Should probably check both axis if they exist before appending
        if(!document.getElementById("x_axis_fourierPhasePlot")){
   
            // Create Axis for Frequency Plot
            let xscale_freq = d3.scaleLinear()
                    .domain([-4, 4]) // This needs to be dynamic
                    .range([ (1/10)*this.width, (9/10)*this.width ]);

            let yscale_freq = d3.scaleLinear()
                    .domain([180,-180]) // This needs to be dynamic
                    .range([ (1/10)*this.height, (9/10)*this.height ]);

            // Add scales to axis
            const xAxisTicks = xscale_freq.ticks()
                                     .filter(tick => Number.isInteger(tick));
 
            let x_axis_freq = d3.axisBottom(xscale_freq)
             .tickValues(xAxisTicks)
             .tickFormat(d3.format("d"));

            let y_axis_freq = d3.axisLeft(yscale_freq);
            
            FourierPhaseSvg.append("text")
                         .attr("text-anchor", "middle")  
                         .attr("x",this.width/2)
                         .attr("y",this.height/20)
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Fourier Phase Plot"); 

            FourierPhaseSvg.append('g')
                         .attr("id","x_axis_fourierPhasePlot")
                         .attr("transform","translate(0," + this.height/2 + ")")
                         .call(x_axis_freq)

            FourierPhaseSvg.append('g')
                         .attr("id","y_axis_fourierPhasePlot")
                         .attr("transform","translate(" + this.width/2 + ",0)")
                         .call(y_axis_freq); 
        }
    }

    renderCirclePos(signal){
        return(
            <FourierCirclesPhasePos
                signal = {signal}
                onMouseDown = {(event) => this.props.onMouseDown(event)}
                onMouseUp = {(event) => this.props.onMouseUp(event)}
                onMouseOut = {(event) => this.props.onMouseUp(event)}
                onMouseMove = {(event) => this.props.onMouseMove(event)}
            />
        );
    }

    renderCircleNeg(signal){
        return(
            <FourierCirclesPhaseNeg
                signal = {signal}
                onMouseDown = {(event) => this.props.onMouseDown(event)}
                onMouseUp = {(event) => this.props.onMouseUp(event)}
                onMouseOut = {(event) => this.props.onMouseUp(event)}
                onMouseMove = {(event) => this.props.onMouseMove(event)}
            />
        );
    }

    render(){

        const signals = this.props.signals;
    
           const circleList = []; 
           
           for (let i=0; i < this.props.signals.length; i++){

                if(i ==0){
                    circleList.push(
                        this.renderCirclePos(this.props.signals[i]) 
                    )
                }
                else{
                    circleList.push(
                        this.renderCirclePos(this.props.signals[i]),
                        this.renderCircleNeg(this.props.signals[i])
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


class SinePlot extends React.Component {
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    componentDidMount(){
        // Only get dimensions when DOM is loaded
        this.height = document.getElementById("sinePlotsID").getBoundingClientRect().height;
        this.width = document.getElementById("sinePlotsID").getBoundingClientRect().width;

        const svgSinePlot = d3.select("#svgSinePlot")

         // Create scale
        let xscale = d3.scaleLinear()
                        .domain([0, 2]) // This needs to be dynamic
                        .range([ (1/10)*this.width, (9/10)*this.width ]);

        let yscale = d3.scaleLinear()
                        .domain([4,-4]) // This needs to be dynamic
                        .range([ (1/10)*this.height, (9/10)*this.height ]);

        // Add scales to axis
        let x_axis = d3.axisBottom()
                        .scale(xscale);

        let y_axis = d3.axisLeft()
                        .scale(yscale);

        svgSinePlot.append("text")
                .attr("text-anchor", "middle")  
                .attr("x",this.width/2)
                .attr("y",this.height/20)
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Sine Plots");

                svgSinePlot.append('g')
                .attr("transform", "translate(0," + this.height/2 + ")")
                .call(x_axis);

                svgSinePlot.append('g')
                .attr("transform","translate(" + (1/10)*this.width + ",0)")
                .call(y_axis)


    }

    render(){
        const current = this.props.signals;
    
        // "Overlay all sine plots into one graph" version
        for(let i = 0; i < current.length; i++){

            let svgID  = 'svg_'
            let pathID = 'path_'
            svgID = svgID.concat(i.toString(10))
            pathID = pathID.concat(i.toString(10))

            let lineGenerator = d3.line().curve(d3.curveNatural);
  
            let pathData = lineGenerator(current[i].values);
    
            //The svg line Path we draw
    
            // If exists, update
            if(document.getElementById(pathID)){
                d3.select("#"+pathID).attr("d", pathData)                      
            }
            
            // Draws path if it doesn't exist
            if(!document.getElementById(pathID)){
                d3.select("#svgSinePlot").append("path")
                    .attr("id",pathID)
                    .attr("d", pathData)
                    .attr("transform","translate(" + (1/10)*this.width + ")")
                    .attr("stroke", current[i].colour)
                    .attr("stroke-width", 2)
                    .attr("fill", "none")
          }
        }


        // Appending svg
        // Check if the element 'svg_id' exists. If not, create new svg, append and draw it
        // Not sure if this scales well

        /* Code for seperate Plots
        for(let i = 0; i < current.length; i++){

            let svgID  = 'svg_'
            let pathID = 'path_'
            svgID = svgID.concat(i.toString(10))
            pathID = pathID.concat(i.toString(10))

            let lineGenerator = d3.line()
                                  .curve(d3.curveNatural);

            let pathData = lineGenerator(current[i].values);

             // Create scale
            let xscale = d3.scaleLinear()
                        .domain([0, 2]) // This needs to be dynamic
                        .range([ (1/10)*this.width, (9/10)*this.width ]);

            let yscale = d3.scaleLinear()
                        .domain([4,-4]) // This needs to be dynamic
                        .range([ (1/10)*this.height, (9/10)*this.height ]);

            // Add scales to axis
            let x_axis = d3.axisBottom()
                .scale(xscale);

            let y_axis = d3.axisLeft()
                .scale(yscale);

            // For now, if svgID exists, then just redraw
            if(document.getElementById(svgID)){
                d3.select("#"+pathID).attr("d", pathData)  
            }
            
            // If svgID doesn't exist, then add it to the DOM

            if(!document.getElementById(svgID)){
                //The SVG Container
                const svgSinePlot = d3.select("#sinePlotsID").append("svg")
                .attr("id",svgID)
                .attr("width", "40vw")
                .attr("height", "45vh")
                .attr("style","position: absolute")
                .attr("style", "border: 1px solid black")

                svgSinePlot.append("text")
                .attr("text-anchor", "middle")  
                .attr("x",this.width/2)
                .attr("y",this.height/20)
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Sine Plot " + i);

                //The line SVG Path we draw
                svgSinePlot.append("path")
                .attr("id",pathID)
                .attr("transform","translate(" + (1/10)*this.width + ",0)")
                .attr("d", pathData)
                .attr("stroke", current[i].colour)
                .attr("stroke-width", 2)
                .attr("fill", "none")

                svgSinePlot.append('g')
                .attr("transform","translate(0," + this.height/2 + ")")
                .call(x_axis);
                
                svgSinePlot.append('g')
                .attr("transform","translate(" + (1/10)*this.width + ",0)")
                .call(y_axis);
            }          
        }
        */

        return(
            <div></div>
        );
    }
}


class SumPlot extends React.Component {
    constructor(props){
        super(props);
        this.height = 0;
        this.width = 0;
    }

    componentDidMount(){
        // Only get dimensions when DOM is loaded
        this.height = document.getElementById("svgSumPlot").getBoundingClientRect().height;
        this.width = document.getElementById("svgSumPlot").getBoundingClientRect().width;

        // Create scale
        let xscale = d3.scaleLinear()
        .domain([0, 2]) // This needs to be dynamic
        .range([ (1/10)*this.width, (9/10)*this.width ]);

        let yscale = d3.scaleLinear()
        .domain([4,-4]) // This needs to be dynamic
        .range([(1/10)*this.height, (9/10)*this.height ]);

        // Add scales to axis
        let x_axis = d3.axisBottom()
        .scale(xscale);

        let y_axis = d3.axisLeft()
        .scale(yscale);

        const svgSumPlot = d3.select("#svgSumPlot")

                svgSumPlot.append("text")
                .attr("text-anchor", "middle")  
                .attr("x",this.width/2)
                .attr("y",this.height/20)
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Sum of Signals Plot");

                svgSumPlot.append('g')
                .attr("transform", "translate(0," + this.height/2 + ")")
                .call(x_axis);

                svgSumPlot.append('g')
                .attr("transform","translate(" + (1/10)*this.width + ",0)")
                .call(y_axis)
    }

    render(){

        let sumSignals = []; 
        let plotWidth = 0.8 * this.width;
        // console.log(this.height);
        // console.log(this.width);

        // This will break if we change plotWidth elsewhere 
        for(let k = 0; k < plotWidth; k++){
            sumSignals.push([0,0]);
        }

        // Looping through all the signals
        for (let i=0; i < this.props.signals.length; i++){

            // Looping through the signal values
            for(let j=0; j < this.props.signals[i].values.length; j++){

                //sumSignals[j] = this.props.signals[i].values[j];
                sumSignals[j][0] = this.props.signals[i].values[j][0];
                sumSignals[j][1] += this.props.signals[i].values[j][1];
            }
            
        }

        // Should scale this to the svg dimenesions rather than hardcoding it with svgContainerHeight
        for (let n =0; n < sumSignals.length; n++){
            sumSignals[n][1] = sumSignals[n][1] - (this.props.signals.length-1)*(this.height/2)
        }

        let lineGenerator = d3.line()
          .curve(d3.curveNatural);

        let pathData = lineGenerator(sumSignals);

        //The svg line Path we draw

        // If exists, update
        if(document.getElementById("path_Sum")){
            d3.select("#"+"path_Sum").attr("d", pathData)  
               
        }
        
        // Draws path if it doesn't exist
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

export class FourierCoefficients extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signals: [
                /* Example signal object 
                {
                    id: 0,
                    amplitude: 1,
                    frequency: 1,
                    values: this.generateSignal(1,1),
                    dragging: false,    
                },
                */
            ],
            circles:[
            ],
        };
        // This binding is necessary to make `this.` work in the callback   
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseMoveFourierMag = this.handleMouseMoveFourierMag.bind(this);
        this.handleMouseMoveFourierPhase = this.handleMouseMoveFourierPhase.bind(this);
    }
    
    addSignal(){
        const signals = this.state.signals;

        // Once this.setState has been called, it'll call render() to render straight away
        this.setState({
            signals: signals.concat([{       // Just concatenating array of JSON
                id: signals.length,
                amplitude: 0,                // Should be user input
                frequency: signals.length,   // Should be user input
                phase: 0,
                values: this.generateSignal(0,signals.length,0),
                dragging: false,    
                colour: hsl(signals.length*60, 100, 50)
            },]),
        });        


    }

    removeSignal(i){
        // Need to find signal id from the array and delete, then re-update id's
        const signals = this.state.signals;


        console.log("Hi from removeSignal");    
        console.log(i)
        console.log("Before: ", signals);
        signals.splice(i,1)
        console.log("After:", signals);

        for(let n = 0; n< this.state.signals.length; n++){
            signals[n].id = n;
        }        

        // Find the svgId and pathID and delete from DOM

        let svgID  = 'svg_'
        let pathID = 'path_'
        svgID = svgID.concat(i.toString(10))
        pathID = pathID.concat(i.toString(10))

        d3.select("#"+svgID).remove();

        this.setState({
            signals: signals,
        });
        console.log(this.state.signals);

    
    }

    generateSignal(amplitude, frequency, phase){
        // Generating path data
        let points = [];
        // This assumes that sumPlot and sinePlots have the same dimensions, since generateSignal() is called from those plots
        const divHeight = document.getElementById("svgSumPlot").getBoundingClientRect().height;
        const plotWidth = 0.8 * document.getElementById("svgSumPlot").getBoundingClientRect().width;
        // console.log("Plot Width",plotWidth)
        // console.log("Div Height", divHeight)
        let scale = -divHeight/10;
        let x_offset = 0;
        let y_offset = 0;

        // let Fs = 80;
        let Ts = Math.PI / (plotWidth/4);

        /* Calculation Reference
        // Assuming the plot is 800x800
        // 1 period = 1 second
        // 1 period = 400 pixels => Ts = 400 samples per second
        // 1 Hz = 2pi radians

        // Sampling frequency = samples/second
        // 1 sample per 1/400 second (Ts = 1/400)
        // Fs = 2pi * (1/400)
        // Fs = pi / 200

        // Frequency is in Hz
        // This is bascially an inverse FFT 
        // i is basically our t (1 unit of time)
        */
        for(let i = x_offset; i< plotWidth; i++)
        {
            points[i] = [i, scale*amplitude*Math.sin(Ts*frequency*i + (phase * (Math.PI / 180) )) + (divHeight/2 + y_offset)];
        }
        // console.log("Plot Length", points.length)

        return points;
    }

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

    updateDials(){
        const signals = this.state.signals;

        for(let i = 0; i< signals.length; i++){
            document.getElementById("signal" + signals[i].id + "_AmpText").value = signals[i].amplitude;
            document.getElementById("signal" + signals[i].id + "_FreqText").value = signals[i].frequency;
        }
    }

    handleChange(event){


        const signals = this.state.signals;
        const inputType = event.target.getAttribute('input_type');
        const signalID = event.target.getAttribute('signal_id'); // Signal ID Number
        let value = parseFloat(event.target.value);   

        // Text Form can currently exceed the maximum limit of 10, should limit?

        if((inputType === "AmpDial") || (inputType === "AmpText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                // DC Case
                if(signalID == 0){
                    signals[signalID].amplitude = value; 
                    signals[signalID].values = this.generateDC(signals[signalID].amplitude);
                    document.getElementById("signal" + signalID + "_AmpText").value = value;
                }
                // All Other cases
                else{
                    signals[signalID].amplitude = value;                 
                    signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);
                    document.getElementById("signal" + signalID + "_AmpText").value = value;
                }     
            }
        }
        else if ((inputType === "PhaseDial") || (inputType === "PhaseText")){
            console.log("HELLO")
            console.log(signals[signalID].amplitude)
            console.log(signals[signalID].phase)

            if(isNaN(value)){
                value = 0;
            }
            else{
                // DC Case
                if(signalID == 0){
                    signals[signalID].phase = value; 
                    signals[signalID].values = this.generateDC(signals[signalID].amplitude);
                    document.getElementById("signal" + signalID + "_PhaseText").value = value;
                }
                 // All Other cases
                else{
                    signals[signalID].phase = value; 
                    signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);
                    document.getElementById("signal" + signalID + "_PhaseText").value = value;
                }
            }
        }     

        this.setState({
                signals: signals,   
            }   
        );

    }

    
    handleMouseDown(e){
        console.log("clicked")

        e.preventDefault();
        const signals = this.state.signals;
        const signalID = e.target.getAttribute('signal_id'); // Signal ID Number

        signals[signalID].dragging = true;

        this.setState({
            signals: signals,   
            }
        );   
    }

    handleMouseUp(e){
        console.log("click released")

        const signals = this.state.signals;
        const signalID = e.target.getAttribute('signal_id'); // Signal ID Number
        console.log(e.type)
        if(e.type == 'mouseout' && signals[signalID].dragging) {
            console.log("mouse went out")
            return;
        }

        signals[signalID].dragging = false;
        
        this.setState({
            signals: signals,   
            }
        );
        
    }

    // Base Mouse move function. Used in Frequency Domain. Not currently in use in this .js file
    handleMouseMove(e) {

        const signals = this.state.signals;
        const signalID = e.target.getAttribute('signal_id'); // Signal ID Number

        //If we are dragging
          if (signals[signalID].dragging) {
              e.preventDefault();

              console.log(e)
              console.log(e.target)
              console.log("clientX:",e.clientX)
              console.log("clientY:",e.clientY)
              // console.log(e.target.parentNode.parentNode)
            let  rect = e.target.parentNode.parentNode.getBoundingClientRect();  

            console.log(rect.left);
            console.log(rect.top);


            // Maybe should seperate coordinates and freq/amp values
             signals[signalID].frequency = (e.clientX - rect.left - 400) / 100;
             signals[signalID].amplitude = - (e.clientY - rect.top - 400) / 100;
             signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);


            // We should set position limits

            console.log(signals[signalID].frequency)
            console.log(signals[signalID].amplitude)

            console.log(this)

            this.setState({
                signals: signals,   
                }
            );  
        }
    }

    handleMouseMoveFourierMag(e) {

        const signals = this.state.signals;
        const signalID = e.target.getAttribute('signal_id'); // Signal ID Number

        //If we are dragging
          if (signals[signalID].dragging) {
              e.preventDefault();


            console.log(e.target)
            let  rect = e.target.parentNode.parentNode.getBoundingClientRect();  

            let divHeight = document.getElementById("fourierMagPlotsID").getBoundingClientRect().height;
            let divWidth = document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;
            let plotHeight = 0.8*divHeight;
            let plotWidth = 0.8*divWidth;

            // Maybe should seperate coordinates and freq/amp values
             signals[signalID].frequency = signals[signalID].id;
             signals[signalID].amplitude = - (e.clientY - rect.top - divHeight/2) / (plotHeight/8);    // 800: svg height, 8: max axis size (-4 to 4)
             signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);

            // We should set position limits

            // Checking if signal is the DC value
            if(signalID == 0){
                signals[signalID].values = this.generateDC(signals[signalID].amplitude);
            }

            this.setState({
                signals: signals,   
                }
            );  
        }
    }
    
    handleMouseMoveFourierPhase(e) {

        const signals = this.state.signals;
        const signalID = e.target.getAttribute('signal_id'); // Signal ID Number
        const circleCX = e.target.getAttribute('cx'); // Circle x position
        console.log("signalID: ",signalID)
        console.log(circleCX)

        //If we are dragging
          if (signals[signalID].dragging) {
              e.preventDefault();


            console.log(e.target)
            let  rect = e.target.parentNode.parentNode.getBoundingClientRect();  

            let divHeight = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height;
            let divWidth = document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;
            let plotHeight = 0.8*divHeight;
            let plotWidth = 0.8*divWidth;

            // Maybe should seperate coordinates and freq/amp values

            if(circleCX >= 0){
                signals[signalID].phase = parseInt( - (e.clientY - rect.top - divHeight/2) / (plotHeight/360));
            } 
            else if(circleCX < 0){
                signals[signalID].phase = parseInt( (e.clientY - rect.top - divHeight/2) / (plotHeight/360));
            } 

            signals[signalID].frequency = signals[signalID].id; 
            signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);

            // We should set position limits

            // Checking if signal is the DC value
            if(signalID == 0){
                signals[signalID].values = this.generateDC(signals[signalID].amplitude);
            }

            this.setState({
                signals: signals,   
                }
            );  
        }
    }

    render() {

    const current = this.state.signals;

    return (
            <div className = {styles.container}>

                <div className = {styles.timePlots} id = "timePlotsID">
                    <div className = {styles.sinePlots} id ="sinePlotsID">
                        <svg id="svgSinePlot" width="40vw" height="45vh" 
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black'
                                }}> 
                            <SinePlot
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
                    <div className = {styles.fourierPhasePlots} id ="fourierPhasePlotsID">
                        <svg id="svgFourierPhasePlot" width="40vw" height="45vh"  
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black',
                                
                                }}> 
                        
                            <FourierPhasePlot
                                signals = {current}
                                onMouseDown = {(event) => this.handleMouseDown(event)}
                                onMouseUp = {(event) => this.handleMouseUp(event)}
                                onMouseOut = {(event) => this.handleMouseUp(event)}
                                onMouseMove = {(event) => this.handleMouseMoveFourierPhase(event)}
                            />
                        </svg>
                    </div>

                    <div className = {styles.fourierMagPlots} id ="fourierMagPlotsID">
                        <svg id="svgFourierMagPlot" width="40vw" height="45vh"  
                            style = {{
                                position: "relative", 
                                top: "0%",
                                left: "0%",
                                transform: "translate(0%, 0%)",
                                border: '1px solid black',
                                
                                }}> 
                        
                            <FourierMagPlot
                                signals = {current}
                                onMouseDown = {(event) => this.handleMouseDown(event)}
                                onMouseUp = {(event) => this.handleMouseUp(event)}
                                onMouseOut = {(event) => this.handleMouseUp(event)}
                                onMouseMove = {(event) => this.handleMouseMoveFourierMag(event)}
                            />
                        </svg>
                    </div>
                    
                </div>
                <div className = {styles.controls}>
                    
                        <Controls
                            signals = {current}
                            onChange = {(event) => this.handleChange(event)}
                            onAdd = {() => this.addSignal()}
                            onRemove = {(i) => this.removeSignal(i)}
                        />
                    
                </div>
            </div>
      );
    }
  }