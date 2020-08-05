import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './FourierCoefficients.module.css'; 
import * as d3 from "d3";

const svgContainerWidth = 800;
const svgContainerHeight = 800;

function Dials(props) {
    return(
        <div className={styles.signal_container}>
            <div className={styles.signal_info}>
                <div>ID: {props.signal.id}</div>
                <button id = "remove-signal" onClick={(i) => props.onRemove(props.signal.id)}> Remove Signal </button>
            </div>
            <div className={styles.signal_props}>
                <div>Amplitude: {props.signal.amplitude}</div>
                <div>Phase: {props.signal.phase}</div>
            </div>
            <div className = {styles.signal_dials}>
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
                {signalList}
                <button id = "add-signal" align-content = "center" onClick={() => this.props.onAdd()}> Add New Signal </button>
            </div>
        );
    }
}

function FourierCirclesMagPos(props) {
    return(
        <circle
            id = {"circle_"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*(800/8)}
            cy = {(props.signal.amplitude)*(800/8)}
            transform="translate(400,400) scale(1,-1)"
            r = {20}
            fill = "black"
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
    return(
        <circle
            id = {"circle_-"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*-(800/8)}
            cy = {(props.signal.amplitude)*(800/8)}
            transform="translate(400,400) scale(1,-1)"
            r = {20}
            fill = "black"
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
    return(
        <circle
            id = {"circle_"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*(800/8)}
            cy = {(props.signal.phase)*(700/360)}
            transform="translate(400,400) scale(1,-1)"
            r = {20}
            fill = "black"
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
    return(
        <circle
            id = {"circle_-"+props.signal.id}
            signal_id = {props.signal.id}
            cx = {(props.signal.id)*-(800/8)}
            cy = {(props.signal.phase)*-(700/360)}
            transform="translate(400,400) scale(1,-1)"
            r = {20}
            fill = "black"
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
        
           let FourierMagSvg = d3.select("#svgFourierMagPlot")
           let radius = 10;  
   
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
           
           // Should probably check both axis if they exist before appending
           if(!document.getElementById("x_axis_fourierMagPlot")){
   
               // Create Axis for Frequency Plot
               let xscale_freq = d3.scaleLinear()
                       .domain([-3.5, 3.5]) // This needs to be dynamic
                       .range([50, 750])
   
               let yscale_freq = d3.scaleLinear()
                       .domain([3.5,-3.5]) // This needs to be dynamic
                       .range([50, 750]);
   
               // Add scales to axis
               const xAxisTicks = xscale_freq.ticks()
                                        .filter(tick => Number.isInteger(tick));
    
               let x_axis_freq = d3.axisBottom(xscale_freq)
                .tickValues(xAxisTicks)
                .tickFormat(d3.format("d"));
   
               let y_axis_freq = d3.axisLeft(yscale_freq);

               FourierMagSvg.append("text")
                            .attr("text-anchor", "middle")  
                            .attr("x",400)
                            .attr("y",30)
                            .style("font-size", "16px") 
                            .style("text-decoration", "underline")  
                            .text("Fourier Magnitude Plot");

               FourierMagSvg.append('g')
                            .attr("id","x_axis_fourierMagPlot")
                            .attr("transform","translate(0,400)")
                            .call(x_axis_freq)
   
               FourierMagSvg.append('g')
                            .attr("id","y_axis_fourierMagPlot")
                            .attr("transform","translate(400,0)")
                            .call(y_axis_freq); 
           }
   
           return( 
               <svg>
                  {circleList}
               </svg>
           );
       }
}

class FourierPhasePlot extends React.Component {

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
        
           let FourierPhaseSvg = d3.select("#svgFourierPhasePlot")
           let radius = 10;  
   
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
           
           // Should probably check both axis if they exist before appending
           if(!document.getElementById("x_axis_fourierPhasePlot")){
   
               // Create Axis for Frequency Plot
               let xscale_freq = d3.scaleLinear()
                       .domain([-3.5, 3.5]) // This needs to be dynamic
                       .range([50, 750])
   
               let yscale_freq = d3.scaleLinear()
                       .domain([180,-180]) // This needs to be dynamic
                       .range([50, 750]);
   
               // Add scales to axis
               const xAxisTicks = xscale_freq.ticks()
                                        .filter(tick => Number.isInteger(tick));
    
               let x_axis_freq = d3.axisBottom(xscale_freq)
                .tickValues(xAxisTicks)
                .tickFormat(d3.format("d"));
   
               let y_axis_freq = d3.axisLeft(yscale_freq);
               
               FourierPhaseSvg.append("text")
                            .attr("text-anchor", "middle")  
                            .attr("x",400)
                            .attr("y",30)
                            .style("font-size", "16px") 
                            .style("text-decoration", "underline")  
                            .text("Fourier Phase Plot"); 

               FourierPhaseSvg.append('g')
                            .attr("id","x_axis_fourierPhasePlot")
                            .attr("transform","translate(0,400)")
                            .call(x_axis_freq)
   
               FourierPhaseSvg.append('g')
                            .attr("id","y_axis_fourierPhasePlot")
                            .attr("transform","translate(400,0)")
                            .call(y_axis_freq); 
           }
   
           return( 
               <svg>
                  {circleList}
               </svg>
           );
       }
}


class SinePlot extends React.Component {
    render(){
        const current = this.props.signals;
    
        // Appending svg
        // Check if the element 'svg_id' exists. If not, create new svg, append and draw it
        // Not sure if this scales well
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
                        .range([50, 750]);

            let yscale = d3.scaleLinear()
                        .domain([3.5,-3.5]) // This needs to be dynamic
                        .range([50, 750]);

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
                .attr("width", svgContainerWidth)
                .attr("height", svgContainerHeight)
                .attr("transform","translate(10)")
                .attr("style","position: absolute")
                .attr("style", "border: 1px solid black")
                .attr("top","100px")
                .attr("left","50px")

                svgSinePlot.append("text")
                .attr("text-anchor", "middle")  
                .attr("x",400)
                .attr("y",30)
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Sine Plot " + i);

                //The line SVG Path we draw
                svgSinePlot.append("path")
                .attr("id",pathID)
                .attr("transform","translate(50)")
                .attr("d", pathData)
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none")

                svgSinePlot.append('g')
                .attr("transform","translate(0,400)")
                .call(x_axis);
                
                svgSinePlot.append('g')
                .attr("transform","translate(50,0)")
                .call(y_axis);
            }          
        }

        return(
            <div></div>
        );
    }
}


class SumPlot extends React.Component {

    render(){

        let sumSignals = []; 
        let svgContainerHeight = 800;
        let plotWidth = 700;

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
            sumSignals[n][1] = sumSignals[n][1] - (this.props.signals.length-1)*(svgContainerHeight/2)
        }

        let lineGenerator = d3.line()
          .curve(d3.curveNatural);

        let pathData = lineGenerator(sumSignals);

        // Create scale
        let xscale = d3.scaleLinear()
        .domain([0, 2]) // This needs to be dynamic
        .range([50, 750]);

        let yscale = d3.scaleLinear()
        .domain([3.5,-3.5]) // This needs to be dynamic
        .range([50, 750]);

        // Add scales to axis
        let x_axis = d3.axisBottom()
        .scale(xscale);

        let y_axis = d3.axisLeft()
        .scale(yscale);

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
                .attr("transform","translate(50)")
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none")

            const svgSumPlot = d3.select("#svgSumPlot")

                svgSumPlot.append("text")
                .attr("text-anchor", "middle")  
                .attr("x",400)
                .attr("y",30)
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Sum of Signals Plot");

                svgSumPlot.append('g')
                .attr("transform","translate(0,400)")
                .call(x_axis);

                svgSumPlot.append('g')
                .attr("transform","translate(20,0)")
                .call(y_axis)
                .attr("transform","translate(50,0)");
                
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
        const plotHeight = 700;
        const plotWidth = 700;
        let scale = -100;
        let x_offset = 0;
        let y_offset = 50;

        let Fs = 80;
        let Ts = Math.PI / 200;

        /* Calculation Reference
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
            points[i] = [i, scale*amplitude*Math.sin(Ts*frequency*i + (phase * (Math.PI / 180) )) + (plotHeight/2 + y_offset)];
        }
        return points;
    }

    generateDC(amplitude){
        let points = [];
        const plotHeight = 700;
        const plotWidth = 700;
        let scale = -100;
        let x_offset = 0;
        let y_offset = 50;

        for(let i = x_offset; i< plotWidth; i++)
        {
            points[i] = [i, scale*amplitude + (plotHeight/2 + y_offset)];
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

            // Maybe should seperate coordinates and freq/amp values
             signals[signalID].frequency = signals[signalID].id;
             signals[signalID].amplitude = - (e.clientY - rect.top - 400) / (800/8);    // 800: svg height, 8: max axis size (-4 to 4)
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
        console.log("signalID: ",signalID)

        //If we are dragging
          if (signals[signalID].dragging) {
              e.preventDefault();


            console.log(e.target)
            let  rect = e.target.parentNode.parentNode.getBoundingClientRect();  

            // Maybe should seperate coordinates and freq/amp values
             signals[signalID].frequency = signals[signalID].id;
             signals[signalID].phase = parseInt( - (e.clientY - rect.top - 400) / (700/360) );
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

                <div className = {styles.sinePlots} id ="sinePlotsID">
                    <SinePlot
                        signals = {current}
                    />
                </div>
                <div className = {styles.otherPlots}>
                    <div className = {styles.fourierPhasePlots} id ="fourierPhasePlotsID">
                        <svg id="svgFourierPhasePlot" width="800" height="800"  
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
                        <svg id="svgFourierMagPlot" width="800" height="800"  
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
                    <div className = {styles.sumPlots} id ="sumPlotsID">
                        <svg id="svgSumPlot" width="800" height="800" 
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