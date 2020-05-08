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
            </div>
            <div className = "signal-dials">
                <div>
                    <input 
                    id = {"signal" + props.signal.id + "_AmpDial" }
                    signal_id = {props.signal.id}
                    input_type = {"AmpDial"}
                    type ="range" 
                    min={-10} 
                    max ={10} 
                    value = {props.signal.amplitude} 
                    step={1}
                    onChange={props.onChange}
                    /> 
                    <input
                    id = {"signal" + props.signal.id + "_AmpText" }
                    signal_id = {props.signal.id}
                    input_type = {"AmpText"}
                    type = "number"  
                    min = {-10}
                    max = {10}
                    onChange={props.onChange}
                    />
                </div>
                <div>
                    <input 
                        id = {"signal" + props.signal.id + "_FreqDial" }
                        signal_id = {props.signal.id}
                        input_type = {"FreqDial"}
                        type ="range" 
                        min={-10} 
                        max ={10} 
                        value = {props.signal.frequency} 
                        step={1}
                        onChange={props.onChange}
                    /> 
                    <input
                        id = {"signal" + props.signal.id + "_FreqText" }
                        signal_id = {props.signal.id}
                        input_type = {"FreqText"}
                        type = "number"  
                        min = {-10}
                        max = {10}
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

class Circles extends React.Component {

    handleMouseDown(e){
        console.log("clicked")
        console.log(e)

    }

    handleMouseUp(){
        console.log("click released")

    }

    render(){
        return(
            <circle
                id = {"circle_"+this.props.signal.id}
                cx = {50}
                cy = {50}
                r = {10}
                fill = "black"
                stroke = "black"
                stroke-width="1"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            />
        );
    }
    
}

class FrequencyPlot extends React.Component {

    renderCircle(signal){
        return(
            <Circles
                signal = {signal}
            />
        );
    }

    render(){
     // console.log(this.props)
     // console.log(this.props.signals)
     const signals = this.props.signals;
     
        let circles = d3.range(signals.length).map(function (i) {
            return {
                // x:  (i+1)*width /6,
                x: signals[i].frequency*50,
                y: signals[i].amplitude*50,
                id: i
            };
        });

        console.log(circles)
  
        let color = d3.scaleOrdinal()
            .range(d3.schemeCategory10);
            
        // console.log("color",color)
        let freqSvg = d3.select("#svgFreqPlot")
        let radius = 10;  

        // Maybe we'll just have to manually write these out lol in the html div
        // console.log(circles[0])
/*
        freqSvg.selectAll("circle")
          .data(circles)
          .enter().append("circle")
            .attr("id", "circle_")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", radius)
            .style("fill", function (d, i) { console.log("Hi", d, i); return color(i); })
            .on("mouseover", function (d) {d3.select(this).style("cursor", "move");})
            .on("mouseout", function (d) {})
            .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended)
                  );
*/
        // Somehow need to get the new cx and cy values then do a setState()
        const circleList = []; 
       /* 
       
       for (let i=0; i < signals.length; i++){
           circleList.push(
               
               <circle key={"circle_" + signals[i].id}
                       cx={ circles[i].x }
                       cy={ circles[i].y }
                       r ={ radius }
                       
                       style = {{ fill: function(circles ,i) {return color(i);} }}
                       on = {{mouseover: function(circles) {d3.select(this).style("cursor","move");} }}
                       on = {{mouseout: function(circles) {} }}
                       call = { d3.drag()
                                    .on("start", dragstarted)
                                    .on("drag", dragged)
                                    .on("end", dragended)                                
                            }
                        
                       
                       onMouseDown={ e => {
                           console.log("clicked");
                       }}
                       

                       onMouseDown={dragged}
                       onMouseUp={dragended}
               > 
                  
               </circle>
           )
       }
       */
       
        for (let i=0; i < this.props.signals.length; i++){
            circleList.push(
                    this.renderCircle(this.props.signals[i])
            )
        }
        
//  
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
        for(let k = 0; k < 50; k++){
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
                console.log(this.props.signals[i].values[j])

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
          .curve(d3.curveBasis);

        let pathData = lineGenerator(sumSignals);
        // We should probably also store this in the React states in the Home class 

        // Create scale
        let xscale = d3.scaleLinear()
        .domain([0, 100]) // This needs to be dynamic
        .range([0, 800]);

        let yscale = d3.scaleLinear()
        .domain([0,100]) // This needs to be dynamic
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

                svgSumPlot.append('g')
                .attr("transform","translate(0,400)")
                .call(x_axis);

                svgSumPlot.append('g')
                .attr("transform","translate(20,0)")
                .call(y_axis);
                
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
                },
                */
            ],
            circles:[

            ],
        };
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
                amplitude: 1,   // Should be user input
                frequency: 1,   // Should be user input
                values: this.generateSignal(1,1),
            },]),
        });        


    }

    removeSignal(i){
        // Need to find signal id from the array and delete, then re-update id's
        const signals = this.state.signals;

        console.log("Hi from removeSignal");    
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

    generateSignal(amplitude, frequency){
        // Generating path data
        // should preallocate array
        let points = [];
        // decide scaling later i guess
        const svgContainerHeight = 800;
        const svgContainerWidth = 800;
        let scale = 100;
        let resolution = 50;

        // This is bascially an inverse FFT lmao
        for(let i = 0; i< resolution; i++)
        {
            points[i] = [scale*i, scale*amplitude*Math.sin(frequency*i) + svgContainerHeight/2];
        }
        // console.log(points)
        return points;
    }

    updateDials(){
        const signals = this.state.signals;

        for(let i = 0; i< signals.length; i++){
            document.getElementById("signal" + signals[i].id + "_AmpText").value = signals[i].amplitude;
            document.getElementById("signal" + signals[i].id + "_FreqText").value = signals[i].frequency;
        }
    }

    handleChange(event){
        /*
        console.log("Hi from handleChange", event);
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.value);
        console.log("State:", this.state);
        */

        const signals = this.state.signals;
        const inputType = event.target.getAttribute('input_type');
        const signalID = event.target.getAttribute('signal_id'); // Signal ID Number
        let value = parseInt(event.target.value);   

        // Text Form can exceed the maximum limit of 10?

        if((inputType === "AmpDial") || (inputType === "AmpText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].amplitude = value;                 
                signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency);
                document.getElementById("signal" + signalID + "_AmpText").value = value;
            }
        }
        else if ((inputType === "FreqDial") || (inputType === "FreqText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].frequency = value; 
                signals[signalID].values = this.generateSignal(signals[signalID].amplitude, signals[signalID].frequency);
                document.getElementById("signal" + signalID + "_FreqText").value = value;
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

    onFreqPlotChange(event){
        // This should be similar to handleChange()
    }

    render() {

    const current = this.state.signals;
    
        // Appending svg
        // Check if the element 'svg_id' exists. If not, create new svg, append and draw it
        // I'm not sure if this scales well lol

        // Check how to draw svg 
        // Currently it only draws when you click the add New Signal button
        // It should draw on page load
        // Or just make it so that there isn't any signal on page load lol
        /*
        let lineGenerator = d3.line()
                              .curve(d3.curveBasis);
        let pathData = [];     
        for(let i = 0; i< current.length; i++){
            pathData[i] = lineGenerator(current[i].values);
        }


        d3.select(pathID)
        .attr('d', pathData);
        */
        console.log(current.length)

       

        

        for(let i = 0; i < current.length; i++){

            let svgID  = 'svg_'
            let pathID = 'path_'
            svgID = svgID.concat(i.toString(10))
            pathID = pathID.concat(i.toString(10))

            let lineGenerator = d3.line()
                                  .curve(d3.curveBasis);

            let pathData = lineGenerator(current[i].values);

            // d3.select('path')
            // .attr('d', pathData);

             // Create scale
            let xscale = d3.scaleLinear()
                        .domain([0, 100]) // This needs to be dynamic
                        .range([0, 800]);

            let yscale = d3.scaleLinear()
                        .domain([0,100]) // This needs to be dynamic
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
                
                // For some reason "path" works but "pathID" doesn't work
                // d3.select("path").attr("d", pathData)      
            }
            
            // If svgID doesn't exist, then add it to the DOM

            if(!document.getElementById(svgID)){
                //The SVG Container
                const svgContainer = d3.select("#sinePlotsID").append("svg")
                .attr("id",svgID)
                .attr("width", svgContainerWidth)
                .attr("height", svgContainerHeight)
                .attr("position","absolute")
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
                .attr("transform","translate(20,0)")
                    .call(y_axis);
                

                 // Create Axis for Frequency Plot
                let xscale_freq = d3.scaleLinear()
                        .domain([0, 100]) // This needs to be dynamic
                        .range([50, 750]);

                let yscale_freq = d3.scaleLinear()
                        .domain([0,100]) // This needs to be dynamic
                        .range([50, 750]);

                // Add scales to axis
                let x_axis_freq = d3.axisBottom()
                .scale(xscale_freq);

                let y_axis_freq = d3.axisLeft()
                .scale(yscale_freq);

                d3.select("#svgFreqPlot").append('g')
                .attr("transform","translate(0,700)")
                .call(x_axis_freq);

                d3.select("#svgFreqPlot").append('g')
                .attr("transform","translate(400,0)")
                .call(y_axis_freq);    
            }          
        }

                                    
// transform = {{translate:"(50%,50%)"}}>
    return (
            <div className = "container">
                <div className = "canvas"></div>

                <div className = "navbar">
                    <div className = "tab" id="home"> Home </div>
                    <div className = "tab"> Topic 1 </div>
                    <div className = "tab"> Topic 2 </div>
                    <div className = "tab"> Topic 3 </div> 			
                </div>
                
                <div className = "navbar">
                    <div className = "tab" id="home"> Home </div>
                    <div className = "tab"> Topic 1 </div>
                    <div className = "tab"> Topic 2 </div>
                    <div className = "tab"> Topic 3 </div> 			
                </div>


                <div className = "sinePlots" id ="sinePlotsID">
                </div>

                <div className = "freqPlots" id ="freqPlotsID" width="800" height="800">
                    <svg id="svgFreqPlot" width="800" height="800" 
                        style = {{
                            position: "relative", 
                            top: "0%",
                            left: "50%",
                            transform: "translate(0%, 0%)",
                            border: '1px solid black'
                            }}> 
                    
                        <FrequencyPlot
                            signals = {current}
                            onFreqPlotChange = {(event) => this.freqPlotChange(event)}
                        />
                    </svg>

                </div>

                <div className = "sumPlots" id ="sumPlotsID">
                    <svg id="svgSumPlot" width="800" height="800" 
                        style = {{
                            position: "relative", 
                            top: "0%",
                            left: "50%",
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
  
/*
        // Creating the Frequency Domain Plot
        const freqContainer = d3.select("#freqPlotsID").append("svg")
        .attr("id", 'svgFreqPlot')
        .attr("width", 800)
        .attr("height", 800)
        
        // console.log("freqContainer:")
        // console.log(freqContainer)
        
        let svg = d3.select("svg")
                    .attr("style","border: 1px solid black")
        // width = +svg.attr("width"),
        // height = +svg.attr("height"),
        let radius = 10;
        

        let circles = d3.range(1).map(function (i) {
            return {
                // x:  (i+1)*width /6,
                x:  (i+1)* 800/6,
                y: 250,
                id: i+1
            };
        });
  
        let color = d3.scaleOrdinal()
            .range(d3.schemeCategory10);

        svg.selectAll("circle")
          .data(circles)
          .enter().append("circle")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", radius)
            .style("fill", function (d, i) { return color(i); })
            .on("mouseover", function (d) {d3.select(this).style("cursor", "move");})
            .on("mouseout", function (d) {})
            .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended)
                  );
*/

// Drag functions
function dragstarted(d) {
    d3.select(this).raise().classed("active", true);
}

function dragged(d) {
    // console.log(d3.event)
    console.log(d); 
    // console.log(this)

    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
    d3.select(this).classed("active", false);
}
