import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as d3 from "d3";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/* Known Bugs:
- removeSignal() only works if you starting removing from the last signal
- if you move/drag the mouse too fast the circle doesn't catch up
- phase dial for DC signal updates amplitude when it's not meant to
- negative phase circle is meant to move in opposite direction when dragged (cartersian coordinate problem)


- Changing frequency does update the signal (when it's not meant to)
^ But this is deliberate because we haven't updated FreqPlot functionality to fit with Fourier Plots
*/

const svgContainerWidth = 800;
const svgContainerHeight = 800;

function Dials(props) {
    console.log("Hi from Dials!",props);
    return(
        <div className="signal-container">
            <div className="signal-info">
                <div>ID: {props.signal.id}</div>
                <button id = "remove-signal" onClick={(i) => props.onRemove(props.signal.id)}> Remove Signal </button>
            </div>
            <div className="signal-props">
                <div>Amplitude: {props.signal.amplitude}</div>
                <div>Frequency: {props.signal.frequency}</div>
                <div>Phase: {props.signal.phase}</div>
            </div>
            <div className = "signal-dials">
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
                        id = {"signal" + props.signal.id + "_FreqDial" }
                        signal_id = {props.signal.id}
                        input_type = {"FreqDial"}
                        type ="range" 
                        min={-4} 
                        max ={4} 
                        value = {props.signal.frequency} 
                        step={0.1}
                        onChange={props.onChange}
                    /> 
                    <input
                        id = {"signal" + props.signal.id + "_FreqText" }
                        signal_id = {props.signal.id}
                        input_type = {"FreqText"}
                        type = "number"  
                        min = {-4}
                        max = {4}
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
        // console.log("Hi from renderDial",this.props);
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
        // console.log("Hi from Controls render",this.props);
        // console.log(signalList);
        return(
            <div className = "dials" >
                {signalList}
                <button id = "add-signal" align-content = "center" onClick={() => this.props.onAdd()}> Add New Signal </button>
            </div>
        );
    }
}

function Circles(props) {
        return(
            <circle
                id = {"circle_"+props.signal.id}
                signal_id = {props.signal.id}
                cx = {(props.signal.frequency)* (800/8)}
                cy = {(props.signal.amplitude)*(800/8)}
                transform="translate(400,400) scale(1,-1)"
                r = {20}
                fill = "black"
                stroke = "black"
                stroke-width="1"
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                onMouseOut={props.onMouseUp}
                onMouseMove={props.onMouseMove}
            />
        );
    
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
            stroke-width="1"
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
            stroke-width="1"
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
            stroke-width="1"
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
            stroke-width="1"
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

class FrequencyPlot extends React.Component {

    renderCircle(signal){
        return(
            <Circles
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
     
        let freqSvg = d3.select("#svgFreqPlot")
        let radius = 10;  

        const circleList = []; 

       
        for (let i=0; i < this.props.signals.length; i++){
            circleList.push(
                    this.renderCircle(this.props.signals[i])
            )
        }
        
        // Should probably check both axis if they exist before appending
        if(!document.getElementById("x_axis_freqPlot")){

            // Create Axis for Frequency Plot
            let xscale_freq = d3.scaleLinear()
                                .domain([-3.5, 3.5]) // This needs to be dynamic
                                .range([50, 750]);

            let yscale_freq = d3.scaleLinear()
                                .domain([3.5,-3.5]) // This needs to be dynamic
                                .range([50, 750]);

            // Add scales to axis
            let x_axis_freq = d3.axisBottom()
                                .scale(xscale_freq);

            let y_axis_freq = d3.axisLeft()
                                .scale(yscale_freq);
            
            freqSvg.append("text")
                    .attr("text-anchor", "middle")  
                    .attr("x",400)
                    .attr("y",30)
                    .style("font-size", "16px") 
                    .style("text-decoration", "underline")  
                    .text("Frequency Domain Plot");
                    
            freqSvg.append('g')
                    .attr("id","x_axis_freqPlot")
                    .attr("transform","translate(0,400)")
                    .call(x_axis_freq);

            freqSvg.append('g')
                    .attr("id","y_axis_freqPlot")
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

class SumPlot extends React.Component {

    render(){

        // This is brute force?
        let sumSignals = []; 
        // This sum doesn't work lmao, returns like NaN's

        // This will break if the resolution breaks lool
        for(let k = 0; k < 800; k++){
            sumSignals.push([0,0]);
        }

        // Looping through all the signals
        for (let i=0; i < this.props.signals.length; i++){

            // console.log(this.props.signals[i].values)
            // console.log(this.props.signals[i].values[0])
            // console.log(this.props.signals[i].values[0][0])
            
            // console.log(sumSignals)

            // Looping through the signal values
            for(let j=0; j < this.props.signals[i].values.length; j++){

                //console.log(this.props.signals[i].values)
                // console.log(this.props.signals[i].values[j])

                //sumSignals[j] = this.props.signals[i].values[j];
                sumSignals[j][0] = this.props.signals[i].values[j][0];
                sumSignals[j][1] += this.props.signals[i].values[j][1];
            }
            
        }

        // There is a way to scale this to the svg dimenesions rather than hardcoding it
        for (let n =0; n < sumSignals.length; n++){
            sumSignals[n][1] = sumSignals[n][1] - (this.props.signals.length-1)*(400)
        }
        
        // console.log("sumSignals:", sumSignals)

        let lineGenerator = d3.line()
          .curve(d3.curveNatural);

        let pathData = lineGenerator(sumSignals);
        // We should probably also store this in the React states in the Home class 

        // Create scale
        let xscale = d3.scaleLinear()
        .domain([0, 2]) // This needs to be dynamic
        .range([0, 800]);

        let yscale = d3.scaleLinear()
        .domain([3.5,-3.5]) // This needs to be dynamic
        .range([50, 750]);

        // Add scales to axis
        let x_axis = d3.axisBottom()
        .scale(xscale);

        let y_axis = d3.axisLeft()
        .scale(yscale);

        //The line SVG Path we draw

        // If exists, update
        if(document.getElementById("path_Sum")){
            d3.select("#"+"path_Sum").attr("d", pathData)  
               
        }
        
        // Draws path if it doesn't exist
        if(!document.getElementById("path_Sum")){
             d3.select("#svgSumPlot").append("path")
                .attr("id","path_Sum")
                .attr("d", pathData)
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

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signals: [
                /*
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
        // This binding is necessary to make `this` work in the callback   
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseMoveFourierMag = this.handleMouseMoveFourierMag.bind(this);
        this.handleMouseMoveFourierPhase = this.handleMouseMoveFourierPhase.bind(this);
    }

    // https://stackoverflow.com/questions/47581967/reactjs-failed-to-compile-objects-is-not-defined-no-undef
    
    addSignal(){
        const signals = this.state.signals;

        // let svgContainerWidth  = 800;
        // let svgContainerHeight = 200;

        // Once this.setState has been called, it'll call render() to render straight away
        this.setState({
            signals: signals.concat([{  // Just concatenating array of JSON
                id: signals.length,
                amplitude: 0,   // Should be user input
                frequency: 0,   // Should be user input
                phase: 0,
                values: this.generateSignal(0,0,0),
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

// From James:
// If you want to find the fourier transform of a complex signal, just change the sin and cosines into exponetial form (phasor)
// Then just read of the phasor's coefficient for magnitude and frequency. 
// E.g. for X*exp(j*omega*t), X and omega is your magnitude and frequency to be plotted in the frequency domain
// So we don't have to compute FFT's on the fly (because then it'll be a performance vs memroy tradeoff). ^ If the above works well enough then we'll stick with it since it's much less restrictive

// For this week (week 6), try to just get the core technical functionality right. 
// Don't worry about UI at the moment, show that computing and rendering the signals is feasible (even if it's ugly/not formatted properly, just make sure it's fast)

// Maybe just put a square wave summation example, and just spam summing signals and see the performance (plot the newest individual signal, the sum of signal, and the frequency plot)


// Priorities:
// 1) Drag function -> fundamental functionality that can extend to other applications 
// (e.g. phasor vectors, sum of signals frequency represntations, frequency domain etc.)
// 2) Sum of signals (should be relatively easy to do)
// 3) Animate the signals 
// ^ (should be a cyclical permutation, or push the last element in the parth array to the first essentially)

    generateSignal(amplitude, frequency, phase){
        // Generating path data
        // should preallocate array
        let points = [];
        // decide scaling later i guess
        const svgContainerHeight = 800;
        const svgContainerWidth = 800;
        let scale = -100;

        // Sampling frequency: 50Hz ?
        let Fs = 80;
        // let Ts = 1/Fs;

        let Ts = Math.PI / 200;

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
        for(let i = 0; i< svgContainerWidth; i++)
        {
            points[i] = [i, scale*amplitude*Math.sin(Ts*frequency*i + (phase * (Math.PI / 180) )) + svgContainerHeight/2];
        }
        console.log(points)
        return points;
    }

    generateDC(amplitude){
        let points = [];
        // decide scaling later i guess
        const svgContainerHeight = 800;
        const svgContainerWidth = 800;
        let scale = -100;

        for(let i = 0; i< svgContainerWidth; i++)
        {
            points[i] = [i, scale*amplitude + svgContainerHeight/2 ];
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

        // Text Form can exceed the maximum limit of 10?

        if((inputType === "AmpDial") || (inputType === "AmpText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].amplitude = value;                 
                signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);
                document.getElementById("signal" + signalID + "_AmpText").value = value;
            }
        }
        else if ((inputType === "FreqDial") || (inputType === "FreqText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].frequency = value; 
                signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);
                document.getElementById("signal" + signalID + "_FreqText").value = value;
            }
        } 
        else if ((inputType === "PhaseDial") || (inputType === "PhaseText")){
            console.log("HELLO")
            console.log(signals[signalID].amplitude)
            console.log(signals[signalID].phase)
            // The problem with the DC value is probably because we're calling generateSignal()
            // insteaed of generateDC when the dials are changed?
            // I guess these are all deliberate bugs (because we're porting code)
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].phase = value; 
                signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency, signals[signalID].phase);
                document.getElementById("signal" + signalID + "_PhaseText").value = value;
            }
        }     

        // console.log(signals);
        this.setState({
                signals: signals,   
                // Rewriting the whole array of objects may be expensive but it works 
                // Could just access the key and change it's value rather than doing a whole update
                // This is actually using a lot of memory though? F12 -> Memory tab
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
        // this.state.dragging = false;
        // this.state.coords = {};

        const signals = this.state.signals;
        const signalID = e.target.getAttribute('signal_id'); // Signal ID Number
        console.log(e.type)
        if(e.type == 'mouseout' && signals[signalID].dragging) {
            console.log("mouse went out out")
            return;
        }

        signals[signalID].dragging = false;
        
        this.setState({
            signals: signals,   
            }
        );
        
    }

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
    
        // Appending svg
        // Check if the element 'svg_id' exists. If not, create new svg, append and draw it
        // I'm not sure if this scales well lol

        for(let i = 0; i < current.length; i++){

            let svgID  = 'svg_'
            let pathID = 'path_'
            svgID = svgID.concat(i.toString(10))
            pathID = pathID.concat(i.toString(10))

            let lineGenerator = d3.line()
                                  .curve(d3.curveNatural);

            let pathData = lineGenerator(current[i].values);

            // d3.select('path')
            // .attr('d', pathData);

             // Create scale
            let xscale = d3.scaleLinear()
                        .domain([0, 2]) // This needs to be dynamic
                        .range([0, 800]);

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
                // console.log("Hi from redraw")
                // console.log(pathID)
                d3.select("#"+pathID).attr("d", pathData)  
                  
            }
            
            // If svgID doesn't exist, then add it to the DOM

            if(!document.getElementById(svgID)){
                //The SVG Container
                const svgContainer = d3.select("#sinePlotsID").append("svg")
                .attr("id",svgID)
                .attr("width", svgContainerWidth)
                .attr("height", svgContainerHeight)
                .attr("style","position: absolute", "left: 5%")
                .attr("style", "border: 1px solid black")
                // .attr("y",i*svgContainerHeight)
                //.attr("y", 200)
                .attr("top","100")

                //The line SVG Path we draw
                const lineGraph = svgContainer.append("path")
                .attr("id",pathID)
                //.attr("datum", current[i].values)
                //.attr("d", line.interpolate("basis"))
                .attr("d", pathData)
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("fill", "none")

                svgContainer.append('g')
                    .attr("transform","translate(0,400)")
                    .call(x_axis);
                
                svgContainer.append('g')
                .attr("transform","translate(50,0)")
                    .call(y_axis);
            }          
        }

// transform = {{translate:"(50%,50%)"}}>
    return (
            <div className = "container">

                <div className = "navbar">
                    <div className = "tab" id="home"> Home </div>
                    <div className = "tab"> Topic 1 </div>
                    <div className = "tab"> Topic 2 </div>
                    <div className = "tab"> Topic 3 </div> 			
                </div>

                <div className = "sinePlots" id ="sinePlotsID">
                </div>

                <div className = "fourierPhasePlots" id ="fourierPhasePlotsID">
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

                <div className = "fourierMagPlots" id ="fourierMagPlotsID">
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

                <div className = "freqPlots" id ="freqPlotsID">
                    <svg id="svgFreqPlot" width="800" height="800"  
                        style = {{
                            position: "relative", 
                            top: "0%",
                            left: "0%",
                            transform: "translate(0%, 0%)",
                            border: '1px solid black',
                            
                            }}> 
                    
                        <FrequencyPlot
                            signals = {current}
                            onMouseDown = {(event) => this.handleMouseDown(event)}
                            onMouseUp = {(event) => this.handleMouseUp(event)}
                            onMouseOut = {(event) => this.handleMouseUp(event)}
                            onMouseMove = {(event) => this.handleMouseMove(event)}
                        />
                    </svg>
                </div>

                <div className = "sumPlots" id ="sumPlotsID">
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

                <div className = "controls">
                    
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

  // ========================================
  
  ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );
