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

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signals: [{
                id: 0,
                amplitude: 0,
                frequency: 0,
                // values: this.generateSignal(),
            },{
                id: 1,
                amplitude: 1,
                frequency: 1,
            },],
        };
    }

    // https://stackoverflow.com/questions/47581967/reactjs-failed-to-compile-objects-is-not-defined-no-undef
    
    addSignal(){
        const signals = this.state.signals;

        this.setState({
            signals: signals.concat([{  // Just concatenating array of JSON
                id: signals.length,
                amplitude: 1,   // Should be user input
                frequency: 1,   // Should be user input
                // values: this.generateSignal(1,1),
            },]),
        });
        // console.log(this.state.signals);
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
        
        this.setState({
            signals: signals,
        });
        console.log(this.state.signals);

        this.updateDials();
    }

    generateSgianl(amplitude, frequency){

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
        const signalID = event.target.getAttribute('signal_id');
        let value = parseInt(event.target.value);

        // Text Form can exceed the maximum limit of 10?

        if((inputType === "AmpDial") || (inputType === "AmpText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].amplitude = value; 
                document.getElementById("signal" + signalID + "_AmpText").value = value;
            }
        }
        else if ((inputType === "FreqDial") || (inputType === "FreqText")){
            if(isNaN(value)){
                value = 0;
            }
            else{
                signals[signalID].frequency = value; 
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

        // this.updateSignal();
    }

    

    render() {

    const current = this.state.signals;
    
    // Generating path data
    const points = [];
    const svgContainerHeight = 200;
    const svgContainerWidth = 800;
    let scale = 100;
    let resolution = 50;
    for(let i = 0; i< resolution; i++)
    {
        points[i] = [scale*i, scale*Math.sin(i) + svgContainerHeight/2];
    }

    let lineGenerator = d3.line()
                          .curve(d3.curveBasis);
    let pathData = lineGenerator(points);

    d3.select('path')
      .attr('d', pathData);

    //The SVG Container
    const svgContainer = d3.select("body").append("svg")
                                          .attr("width", svgContainerWidth)
                                          .attr("height", svgContainerHeight)
                                          .attr("position","absolute")
                                          .attr("top","100");

    //The line SVG Path we draw
    const lineGraph = svgContainer.append("path")
                                .attr("d", pathData)
                                .attr("stroke", "blue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none")

                                

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


                <div className = "sinePlots">

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
  
