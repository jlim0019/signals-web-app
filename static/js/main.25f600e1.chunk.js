(this["webpackJsonpsignals-web-app"]=this["webpackJsonpsignals-web-app"]||[]).push([[0],{14:function(e,t,n){e.exports={home:"FrequencyDomain_home__30fuX",container:"FrequencyDomain_container__DTkEc",navbar:"FrequencyDomain_navbar__2nfHk",tab:"FrequencyDomain_tab__2HYGI",controls:"FrequencyDomain_controls__3_b1P",dials:"FrequencyDomain_dials__1_C6C",signal_container:"FrequencyDomain_signal_container__2wtJT",signal_info:"FrequencyDomain_signal_info__2oOve",signal_props:"FrequencyDomain_signal_props__3Psyr",signal_dials:"FrequencyDomain_signal_dials__36fR_",sinePlots:"FrequencyDomain_sinePlots__1Lmk_",otherPlots:"FrequencyDomain_otherPlots__2dZs_",freqPlots:"FrequencyDomain_freqPlots__2WRIF",sumPlots:"FrequencyDomain_sumPlots__9CQRp"}},15:function(e,t,n){e.exports={home:"App_home__gVUmA",container:"App_container__2fAhY",navbar:"App_navbar__3YSH8",tab:"App_tab__2izV7",centertext:"App_centertext__1tHIr"}},3:function(e,t,n){e.exports={home:"FourierCoefficients_home__10kQG",container:"FourierCoefficients_container__kd25g",navbar:"FourierCoefficients_navbar__2pTv4",tab:"FourierCoefficients_tab__8pHCY",tooltip:"FourierCoefficients_tooltip__1v6vc",tooltiptext:"FourierCoefficients_tooltiptext__P9iLV",controls:"FourierCoefficients_controls___EOHp",dials:"FourierCoefficients_dials__1zijK",global_controls:"FourierCoefficients_global_controls__1LP2r",signal_container:"FourierCoefficients_signal_container__1Of7C",signal_info:"FourierCoefficients_signal_info__2oYZ9",signal_props:"FourierCoefficients_signal_props__1Kcya",signal_dials:"FourierCoefficients_signal_dials__kLbm8",timePlots:"FourierCoefficients_timePlots__vs39U",sinePlots:"FourierCoefficients_sinePlots__NqB9U",otherPlots:"FourierCoefficients_otherPlots__AqeTC",fourierMagPlots:"FourierCoefficients_fourierMagPlots__1Fesw",fourierPhasePlots:"FourierCoefficients_fourierPhasePlots__3rZM3",sumPlots:"FourierCoefficients_sumPlots__DMOR_"}},86:function(e,t,n){e.exports=n(96)},96:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(18),l=n.n(o),s=n(5),r=n(6),u=n(8),c=n(7),g=n(9),d=n(15),h=n.n(d),p=n(1),m=n(19),v=n(2),f=n(10),_=n(3),y=n.n(_);function M(e){return i.a.createElement("div",{className:y.a.signal_container},i.a.createElement("div",{className:y.a.signal_info},i.a.createElement("div",{className:y.a.tooltip},"| Help |",i.a.createElement("span",{className:y.a.tooltiptext},i.a.createElement("p",null,"This is the control panel to adjust signal properties."),i.a.createElement("p",null,"Try adjusting the Amplitude and Phase!"))),i.a.createElement("div",null,"ID: ",e.signal.id),i.a.createElement("button",{id:"remove-signal",onClick:function(t){return e.onRemove(e.signal.id)}}," Remove Signal "),i.a.createElement("div",null," Colour "),i.a.createElement("svg",{height:"40",width:"20"},i.a.createElement("circle",{r:10,cx:10,cy:20,fill:e.signal.colour,stroke:"black",strokeWidth:"1"}))),i.a.createElement("div",{className:y.a.signal_props},i.a.createElement("div",null,"Amplitude: ",e.signal.amplitude.toFixed(2))),i.a.createElement("div",{className:y.a.signal_props},i.a.createElement("div",null,i.a.createElement("input",{id:"signal"+e.signal.id+"_AmpDial",signal_id:e.signal.id,input_type:"AmpDial",type:"range",min:-5,max:5,value:e.signal.amplitude,step:.1,onChange:e.onChange}),i.a.createElement("input",{id:"signal"+e.signal.id+"_AmpText",signal_id:e.signal.id,input_type:"AmpText",type:"number",min:-5,max:5,onChange:e.onChange}))),i.a.createElement("div",{className:y.a.signal_props},i.a.createElement("div",null,"Phase: ",e.signal.phase)),i.a.createElement("div",{className:y.a.signal_props},i.a.createElement("div",null,i.a.createElement("input",{id:"signal"+e.signal.id+"_PhaseDial",signal_id:e.signal.id,input_type:"PhaseDial",type:"range",min:-180,max:180,value:e.signal.phase,step:1,onChange:e.onChange}),i.a.createElement("input",{id:"signal"+e.signal.id+"_PhaseText",signal_id:e.signal.id,input_type:"PhaseText",type:"number",min:-180,max:180,onChange:e.onChange}))))}var E=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(r.a)(t,[{key:"renderDial",value:function(e){var t=this;return i.a.createElement(M,{signal:e,onChange:function(e){return t.props.onChange(e)},onRemove:function(e){return t.props.onRemove(e)}})}},{key:"render",value:function(){for(var e=this,t=[],n=0;n<this.props.signals.length;n++)t.push(i.a.createElement("div",{key:"signal"+this.props.signals[n].id},this.renderDial(this.props.signals[n])));return i.a.createElement("div",{className:y.a.dials},i.a.createElement("div",{className:y.a.global_controls},i.a.createElement("div",{className:y.a.tooltip},"| Help |",i.a.createElement("span",{className:y.a.tooltiptext},i.a.createElement("p",null,"Try adding a signal!"))),i.a.createElement("button",{id:"add-signal","align-content":"center",onClick:function(){return e.props.onAdd(0,0)}}," Add New Signal "),i.a.createElement("div",{style:{gridRow:"2"}}," Try a demo signal "),i.a.createElement("select",{name:"demoSignal",id:"demoSignal",value:this.props.demoSignal,onChange:function(t){return e.props.onDemoSignal(t)},style:{gridRow:"2"}},i.a.createElement("option",{value:"select"},"- Select -"),i.a.createElement("option",{value:"empty"},"Empty"),i.a.createElement("option",{value:"sine"},"Sine Wave"),i.a.createElement("option",{value:"even"},"Even Wave"),i.a.createElement("option",{value:"odd"},"Odd Wave"),i.a.createElement("option",{value:"triangle"},"Triangle Wave"))),t)}}]),t}(i.a.Component);function b(e){var t=document.getElementById("fourierMagPlotsID").getBoundingClientRect().height,n=document.getElementById("fourierMagPlotsID").getBoundingClientRect().width,a=.8*t,o=.8*n;return i.a.createElement("circle",{id:"circle_"+e.signal.id,signal_id:e.signal.id,cx:e.signal.id*(o/8),cy:e.signal.amplitude*(a/8),transform:"translate("+n/2+","+t/2+") scale(1,-1)",r:10,fill:e.signal.colour,stroke:"black",strokeWidth:"1",onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onMouseOut:e.onMouseUp,onMouseMove:e.onMouseMove})}function P(e){var t=document.getElementById("fourierMagPlotsID").getBoundingClientRect().height,n=document.getElementById("fourierMagPlotsID").getBoundingClientRect().width,a=.8*t,o=.8*n;return i.a.createElement("circle",{id:"circle_-"+e.signal.id,signal_id:e.signal.id,cx:e.signal.id*(-o/8),cy:e.signal.amplitude*(a/8),transform:"translate("+n/2+","+t/2+") scale(1,-1)",r:10,fill:e.signal.colour,stroke:"black",strokeWidth:"1",onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onMouseOut:e.onMouseUp,onMouseMove:e.onMouseMove})}function C(e){var t=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height,n=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width,a=.8*t,o=.8*n;return i.a.createElement("circle",{id:"circle_"+e.signal.id,signal_id:e.signal.id,cx:e.signal.id*(o/8),cy:e.signal.phase*(a/360),transform:"translate("+n/2+","+t/2+") scale(1,-1)",r:10,fill:e.signal.colour,stroke:"black",strokeWidth:"1",onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onMouseOut:e.onMouseUp,onMouseMove:e.onMouseMove})}function D(e){var t=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height,n=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width,a=.8*t,o=.8*n;return i.a.createElement("circle",{id:"circle_-"+e.signal.id,signal_id:e.signal.id,cx:e.signal.id*(-o/8),cy:-e.signal.phase*(a/360),transform:"translate("+n/2+","+t/2+") scale(1,-1)",r:10,fill:e.signal.colour,stroke:"black",strokeWidth:"1",onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onMouseOut:e.onMouseUp,onMouseMove:e.onMouseMove})}var x=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).height=0,n.width=0,n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.height=document.getElementById("fourierMagPlotsID").getBoundingClientRect().height,this.width=document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;var e=p.h("#svgFourierMagPlot");if(!document.getElementById("x_axis_fourierMagPlot")){var t=p.g().domain([-4,4]).range([.1*this.width,.9*this.width]),n=p.g().domain([4,-4]).range([.1*this.height,.9*this.height]),a=t.ticks().filter((function(e){return Number.isInteger(e)})),i=p.a(t).tickValues(a).tickFormat(p.d("d")),o=p.b(n);e.append("text").attr("text-anchor","middle").attr("x",this.width/2).attr("y",this.height/20).style("font-size","16px").style("text-decoration","underline").text("Fourier Magnitude Plot"),e.append("g").attr("id","x_axis_fourierMagPlot").attr("transform","translate(0,"+this.height/2+")").call(i),e.append("g").attr("id","y_axis_fourierMagPlot").attr("transform","translate("+this.width/2+",0)").call(o)}}},{key:"renderCirclePos",value:function(e){var t=this;return i.a.createElement(b,{signal:e,onMouseDown:function(e){return t.props.onMouseDown(e)},onMouseUp:function(e){return t.props.onMouseUp(e)},onMouseOut:function(e){return t.props.onMouseUp(e)},onMouseMove:function(e){return t.props.onMouseMove(e)}})}},{key:"renderCircleNeg",value:function(e){var t=this;return i.a.createElement(P,{signal:e,onMouseDown:function(e){return t.props.onMouseDown(e)},onMouseUp:function(e){return t.props.onMouseUp(e)},onMouseOut:function(e){return t.props.onMouseUp(e)},onMouseMove:function(e){return t.props.onMouseMove(e)}})}},{key:"render",value:function(){this.props.signals;for(var e=[],t=0;t<this.props.signals.length;t++)0==t?e.push(this.renderCirclePos(this.props.signals[t])):e.push(this.renderCirclePos(this.props.signals[t]),this.renderCircleNeg(this.props.signals[t]));return i.a.createElement("svg",null,e)}}]),t}(i.a.Component),w=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).height=0,n.width=0,n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.height=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height,this.width=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;var e=p.h("#svgFourierPhasePlot");if(!document.getElementById("x_axis_fourierPhasePlot")){var t=p.g().domain([-4,4]).range([.1*this.width,.9*this.width]),n=p.g().domain([180,-180]).range([.1*this.height,.9*this.height]),a=t.ticks().filter((function(e){return Number.isInteger(e)})),i=p.a(t).tickValues(a).tickFormat(p.d("d")),o=p.b(n);e.append("text").attr("text-anchor","middle").attr("x",this.width/2).attr("y",this.height/20).style("font-size","16px").style("text-decoration","underline").text("Fourier Phase Plot"),e.append("g").attr("id","x_axis_fourierPhasePlot").attr("transform","translate(0,"+this.height/2+")").call(i),e.append("g").attr("id","y_axis_fourierPhasePlot").attr("transform","translate("+this.width/2+",0)").call(o)}}},{key:"renderCirclePos",value:function(e){var t=this;return i.a.createElement(C,{signal:e,onMouseDown:function(e){return t.props.onMouseDown(e)},onMouseUp:function(e){return t.props.onMouseUp(e)},onMouseOut:function(e){return t.props.onMouseUp(e)},onMouseMove:function(e){return t.props.onMouseMove(e)}})}},{key:"renderCircleNeg",value:function(e){var t=this;return i.a.createElement(D,{signal:e,onMouseDown:function(e){return t.props.onMouseDown(e)},onMouseUp:function(e){return t.props.onMouseUp(e)},onMouseOut:function(e){return t.props.onMouseUp(e)},onMouseMove:function(e){return t.props.onMouseMove(e)}})}},{key:"render",value:function(){this.props.signals;for(var e=[],t=0;t<this.props.signals.length;t++)0==t?e.push(this.renderCirclePos(this.props.signals[t])):e.push(this.renderCirclePos(this.props.signals[t]),this.renderCircleNeg(this.props.signals[t]));return i.a.createElement("svg",null,e)}}]),t}(i.a.Component),S=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).height=0,n.width=0,n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.height=document.getElementById("sinePlotsID").getBoundingClientRect().height,this.width=document.getElementById("sinePlotsID").getBoundingClientRect().width;var e=p.h("#svgSinePlot"),t=p.g().domain([0,2]).range([.1*this.width,.9*this.width]),n=p.g().domain([4,-4]).range([.1*this.height,.9*this.height]),a=p.a().scale(t),i=p.b().scale(n);e.append("text").attr("text-anchor","middle").attr("x",this.width/2).attr("y",this.height/20).style("font-size","16px").style("text-decoration","underline").text("Sine Plots"),e.append("g").attr("transform","translate(0,"+this.height/2+")").call(a),e.append("g").attr("transform","translate("+.1*this.width+",0)").call(i)}},{key:"render",value:function(){for(var e=this.props.signals,t=0;t<e.length;t++){var n="svg_",a="path_";n=n.concat(t.toString(10)),a=a.concat(t.toString(10));var o=p.f().curve(p.c)(e[t].values);document.getElementById(a)&&p.h("#"+a).attr("d",o),document.getElementById(a)||p.h("#svgSinePlot").append("path").attr("id",a).attr("d",o).attr("transform","translate("+.1*this.width+")").attr("stroke",e[t].colour).attr("stroke-width",2).attr("fill","none")}return i.a.createElement("div",null)}}]),t}(i.a.Component),k=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).height=0,n.width=0,n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.height=document.getElementById("svgSumPlot").getBoundingClientRect().height,this.width=document.getElementById("svgSumPlot").getBoundingClientRect().width;var e=p.g().domain([0,2]).range([.1*this.width,.9*this.width]),t=p.g().domain([4,-4]).range([.1*this.height,.9*this.height]),n=p.a().scale(e),a=p.b().scale(t),i=p.h("#svgSumPlot");i.append("text").attr("text-anchor","middle").attr("x",this.width/2).attr("y",this.height/20).style("font-size","16px").style("text-decoration","underline").text("Sum of Signals Plot"),i.append("g").attr("transform","translate(0,"+this.height/2+")").call(n),i.append("g").attr("transform","translate("+.1*this.width+",0)").call(a)}},{key:"render",value:function(){for(var e=[],t=.8*this.width,n=0;n<t;n++)e.push([0,0]);for(var a=0;a<this.props.signals.length;a++)for(var o=0;o<this.props.signals[a].values.length;o++)e[o][0]=this.props.signals[a].values[o][0],e[o][1]+=this.props.signals[a].values[o][1];for(var l=0;l<e.length;l++)e[l][1]=e[l][1]-(this.props.signals.length-1)*(this.height/2);var s=p.f().curve(p.c)(e);return document.getElementById("path_Sum")&&p.h("#path_Sum").attr("d",s),document.getElementById("path_Sum")||p.h("#svgSumPlot").append("path").attr("id","path_Sum").attr("d",s).attr("transform","translate("+.1*this.width+")").attr("stroke","black").attr("stroke-width",2).attr("fill","none"),i.a.createElement("div",null)}}]),t}(i.a.Component),O=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={signals:[],demoSignal:"select"},n.handleMouseDown=n.handleMouseDown.bind(Object(f.a)(n)),n.handleMouseUp=n.handleMouseUp.bind(Object(f.a)(n)),n.handleMouseMove=n.handleMouseMove.bind(Object(f.a)(n)),n.handleMouseMoveFourierMag=n.handleMouseMoveFourierMag.bind(Object(f.a)(n)),n.handleMouseMoveFourierPhase=n.handleMouseMoveFourierPhase.bind(Object(f.a)(n)),n.handleDemoSignal=n.handleDemoSignal.bind(Object(f.a)(n)),n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"addSignal",value:function(e,t){var n=this.state.signals;this.setState({signals:n.concat([{id:n.length,amplitude:e,frequency:n.length,phase:t,values:this.generateSignal(e,n.length,t),dragging:!1,colour:Object(p.e)(60*n.length,100,50)}])})}},{key:"removeSignal",value:function(e){var t=this.state.signals;console.log("Hi from removeSignal"),console.log(e),console.log("Before: ",t),t.splice(e,1),console.log("After:",t);for(var n=0;n<this.state.signals.length;n++)t[n].id=n;var a="svg_",i="path_";a=a.concat(e.toString(10)),i=i.concat(e.toString(10)),p.h("#"+a).remove(),p.h("#"+i).remove(),this.setState({signals:t}),console.log(this.state.signals)}},{key:"generateSignal",value:function(e,t,n){for(var a=[],i=document.getElementById("svgSumPlot").getBoundingClientRect().height,o=.8*document.getElementById("svgSumPlot").getBoundingClientRect().width,l=-i/10,s=Math.PI/(o/4),r=0;r<o;r++)a[r]=[r,l*e*Math.sin(s*t*r+n*(Math.PI/180))+(i/2+0)];return a}},{key:"generateDC",value:function(e){for(var t=[],n=document.getElementById("svgSumPlot").getBoundingClientRect().height,a=.8*document.getElementById("svgSumPlot").getBoundingClientRect().width,i=-n/10,o=0;o<a;o++)t[o]=[o,i*e+(n/2+0)];return t}},{key:"updateDials",value:function(){for(var e=this.state.signals,t=0;t<e.length;t++)document.getElementById("signal"+e[t].id+"_AmpText").value=e[t].amplitude,document.getElementById("signal"+e[t].id+"_FreqText").value=e[t].frequency}},{key:"handleChange",value:function(e){console.log(e);var t=this.state.signals,n=e.target.getAttribute("input_type"),a=e.target.getAttribute("signal_id"),i=parseFloat(e.target.value);"AmpDial"===n||"AmpText"===n?isNaN(i)?i=0:0==a?(t[a].amplitude=i,t[a].values=this.generateDC(t[a].amplitude),document.getElementById("signal"+a+"_AmpText").value=i):(t[a].amplitude=i,t[a].values=this.generateSignal(t[a].amplitude,t[a].frequency,t[a].phase),document.getElementById("signal"+a+"_AmpText").value=i):"PhaseDial"!==n&&"PhaseText"!==n||(console.log("HELLO"),console.log(t[a].amplitude),console.log(t[a].phase),isNaN(i)?i=0:0==a?(t[a].phase=i,t[a].values=this.generateDC(t[a].amplitude),document.getElementById("signal"+a+"_PhaseText").value=i):(t[a].phase=i,t[a].values=this.generateSignal(t[a].amplitude,t[a].frequency,t[a].phase),document.getElementById("signal"+a+"_PhaseText").value=i)),this.setState({signals:t})}},{key:"handleMouseDown",value:function(e){console.log("clicked"),e.preventDefault();var t=this.state.signals;t[e.target.getAttribute("signal_id")].dragging=!0,this.setState({signals:t})}},{key:"handleMouseUp",value:function(e){console.log("click released");var t=this.state.signals,n=e.target.getAttribute("signal_id");console.log(e.type),"mouseout"==e.type&&t[n].dragging&&console.log("mouse went out"),t[n].dragging=!1,this.setState({signals:t})}},{key:"handleMouseMove",value:function(e){var t=this.state.signals,n=e.target.getAttribute("signal_id");if(t[n].dragging){e.preventDefault(),console.log(e),console.log(e.target),console.log("clientX:",e.clientX),console.log("clientY:",e.clientY);var a=e.target.parentNode.parentNode.getBoundingClientRect();console.log(a.left),console.log(a.top),t[n].frequency=(e.clientX-a.left-400)/100,t[n].amplitude=-(e.clientY-a.top-400)/100,t[n].values=this.generateSignal(t[n].amplitude,t[n].frequency,t[n].phase),console.log(t[n].frequency),console.log(t[n].amplitude),console.log(this),this.setState({signals:t})}}},{key:"handleMouseMoveFourierMag",value:function(e){var t=this.state.signals,n=e.target.getAttribute("signal_id");if(t[n].dragging){e.preventDefault(),console.log(e.target);var a=e.target.parentNode.parentNode.getBoundingClientRect(),i=document.getElementById("fourierMagPlotsID").getBoundingClientRect().height,o=.8*i;document.getElementById("fourierMagPlotsID").getBoundingClientRect().width;t[n].frequency=t[n].id,t[n].amplitude=-(e.clientY-a.top-i/2)/(o/8),t[n].values=this.generateSignal(t[n].amplitude,t[n].frequency,t[n].phase),0==n&&(t[n].values=this.generateDC(t[n].amplitude)),this.setState({signals:t})}}},{key:"handleMouseMoveFourierPhase",value:function(e){var t=this.state.signals,n=e.target.getAttribute("signal_id"),a=e.target.getAttribute("cx");if(console.log("signalID: ",n),console.log(a),t[n].dragging){e.preventDefault(),console.log(e.target);var i=e.target.parentNode.parentNode.getBoundingClientRect(),o=document.getElementById("fourierPhasePlotsID").getBoundingClientRect().height,l=.8*o;document.getElementById("fourierPhasePlotsID").getBoundingClientRect().width;a>=0?t[n].phase=parseInt(-(e.clientY-i.top-o/2)/(l/360)):a<0&&(t[n].phase=parseInt((e.clientY-i.top-o/2)/(l/360))),t[n].frequency=t[n].id,t[n].values=this.generateSignal(t[n].amplitude,t[n].frequency,t[n].phase),0==n&&(t[n].values=this.generateDC(t[n].amplitude)),this.setState({signals:t})}}},{key:"emptyPlots",value:function(){this.state.signals;for(var e=0;e<this.state.signals.length;e++){var t="svg_",n="path_";t=t.concat(e.toString(10)),n=n.concat(e.toString(10)),p.h("#"+t).remove(),p.h("#"+n).remove()}return[]}},{key:"handleDemoSignal",value:function(e){var t=this.state.signals,n=e.target.value;if("empty"==n&&(t=this.emptyPlots()),"sine"==n&&(t=(t=(t=this.emptyPlots()).concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateDC(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}])).concat([{id:t.length,amplitude:1,frequency:t.length,phase:0,values:this.generateSignal(1,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}])),"even"==n){t=(t=this.emptyPlots()).concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateDC(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}]);for(var a=0;a<4;a++)a%2!=0&&(t=t.concat([{id:t.length,amplitude:1,frequency:t.length,phase:0,values:this.generateSignal(1,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}])),a%2==0&&(t=t.concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateSignal(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}]))}if("odd"==n){t=(t=this.emptyPlots()).concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateDC(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}]);for(var i=0;i<4;i++)i%2!=0&&(t=t.concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateSignal(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}])),i%2==0&&(t=t.concat([{id:t.length,amplitude:1,frequency:t.length,phase:0,values:this.generateSignal(1,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}]))}if("triangle"==n){t=(t=this.emptyPlots()).concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateDC(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}]);for(var o=0;o<25;o++){if(o%2!=0){var l=4/o*Math.pow(-1,o);t=t.concat([{id:t.length,amplitude:l,frequency:t.length,phase:0,values:this.generateSignal(l,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}])}o%2==0&&(t=t.concat([{id:t.length,amplitude:0,frequency:t.length,phase:0,values:this.generateSignal(0,t.length,0),dragging:!1,colour:Object(p.e)(60*t.length,100,50)}]))}}this.setState({signals:t,demoSignal:n})}},{key:"render",value:function(){var e=this,t=this.state.signals;return console.log("demo:",this.state.demoSignal),i.a.createElement("div",{className:y.a.container},i.a.createElement("div",{className:y.a.timePlots,id:"timePlotsID"},i.a.createElement("div",{className:y.a.sinePlots,id:"sinePlotsID"},i.a.createElement("svg",{id:"svgSinePlot",width:"40vw",height:"45vh",style:{position:"relative",top:"0%",left:"0%",transform:"translate(0%, 0%)",border:"1px solid black"}},i.a.createElement(S,{signals:t}))),i.a.createElement("div",{className:y.a.sumPlots,id:"sumPlotsID"},i.a.createElement("svg",{id:"svgSumPlot",width:"40vw",height:"45vh",style:{position:"relative",top:"0%",left:"0%",transform:"translate(0%, 0%)",border:"1px solid black"}},i.a.createElement(k,{signals:t})))),i.a.createElement("div",{className:y.a.otherPlots},i.a.createElement("div",{className:y.a.fourierPhasePlots,id:"fourierPhasePlotsID"},i.a.createElement("svg",{id:"svgFourierPhasePlot",width:"40vw",height:"45vh",style:{position:"relative",top:"0%",left:"0%",transform:"translate(0%, 0%)",border:"1px solid black"}},i.a.createElement(w,{signals:t,onMouseDown:function(t){return e.handleMouseDown(t)},onMouseUp:function(t){return e.handleMouseUp(t)},onMouseOut:function(t){return e.handleMouseUp(t)},onMouseMove:function(t){return e.handleMouseMoveFourierPhase(t)}}))),i.a.createElement("div",{className:y.a.fourierMagPlots,id:"fourierMagPlotsID"},i.a.createElement("svg",{id:"svgFourierMagPlot",width:"40vw",height:"45vh",style:{position:"relative",top:"0%",left:"0%",transform:"translate(0%, 0%)",border:"1px solid black"}},i.a.createElement(x,{signals:t,onMouseDown:function(t){return e.handleMouseDown(t)},onMouseUp:function(t){return e.handleMouseUp(t)},onMouseOut:function(t){return e.handleMouseUp(t)},onMouseMove:function(t){return e.handleMouseMoveFourierMag(t)}})))),i.a.createElement("div",{className:y.a.controls},i.a.createElement(E,{signals:t,demoSignal:this.state.demoSignal,onChange:function(t){return e.handleChange(t)},onAdd:function(t,n){return e.addSignal(t,n)},onRemove:function(t){return e.removeSignal(t)},onDemoSignal:function(t){return e.handleDemoSignal(t)}})))}}]),t}(i.a.Component),I=n(14),j=n.n(I);function B(e){return i.a.createElement("div",{className:j.a.signal_container},i.a.createElement("div",{className:j.a.signal_info},i.a.createElement("div",null,"ID: ",e.signal.id),i.a.createElement("button",{id:"remove-signal",onClick:function(t){return e.onRemove(e.signal.id)}}," Remove Signal ")),i.a.createElement("div",{className:j.a.signal_props},i.a.createElement("div",null,"Amplitude: ",e.signal.amplitude),i.a.createElement("div",null,"Frequency: ",e.signal.frequency),i.a.createElement("div",null,"Phase: ",e.signal.phase)),i.a.createElement("div",{className:j.a.signal_dials},i.a.createElement("div",null,i.a.createElement("input",{id:"signal"+e.signal.id+"_AmpDial",signal_id:e.signal.id,input_type:"AmpDial",type:"range",min:-5,max:5,value:e.signal.amplitude,step:.1,onChange:e.onChange}),i.a.createElement("input",{id:"signal"+e.signal.id+"_AmpText",signal_id:e.signal.id,input_type:"AmpText",type:"number",min:-5,max:5,onChange:e.onChange})),i.a.createElement("div",null,i.a.createElement("input",{id:"signal"+e.signal.id+"_FreqDial",signal_id:e.signal.id,input_type:"FreqDial",type:"range",min:-4,max:4,value:e.signal.frequency,step:.1,onChange:e.onChange}),i.a.createElement("input",{id:"signal"+e.signal.id+"_FreqText",signal_id:e.signal.id,input_type:"FreqText",type:"number",min:-4,max:4,onChange:e.onChange})),i.a.createElement("div",null,i.a.createElement("input",{id:"signal"+e.signal.id+"_PhaseDial",signal_id:e.signal.id,input_type:"PhaseDial",type:"range",min:-180,max:180,value:e.signal.phase,step:1,onChange:e.onChange}),i.a.createElement("input",{id:"signal"+e.signal.id+"_PhaseText",signal_id:e.signal.id,input_type:"PhaseText",type:"number",min:-180,max:180,onChange:e.onChange}))))}var q=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(r.a)(t,[{key:"renderDial",value:function(e){var t=this;return i.a.createElement(B,{signal:e,onChange:function(e){return t.props.onChange(e)},onRemove:function(e){return t.props.onRemove(e)}})}},{key:"render",value:function(){for(var e=this,t=[],n=0;n<this.props.signals.length;n++)t.push(i.a.createElement("div",{key:"signal"+this.props.signals[n].id},this.renderDial(this.props.signals[n])));return i.a.createElement("div",{className:j.a.dials},t,i.a.createElement("button",{id:"add-signal","align-content":"center",onClick:function(){return e.props.onAdd()}}," Add New Signal "))}}]),t}(i.a.Component);function F(e){return i.a.createElement("circle",{id:"circle_"+e.signal.id,signal_id:e.signal.id,cx:100*e.signal.frequency,cy:100*e.signal.amplitude,transform:"translate(400,400) scale(1,-1)",r:20,fill:"black",stroke:"black",strokeWidth:"1",onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onMouseOut:e.onMouseUp,onMouseMove:e.onMouseMove})}var N=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){for(var e=this.props.signals,t=0;t<e.length;t++){var n="svg_",a="path_";n=n.concat(t.toString(10)),a=a.concat(t.toString(10));var o=p.f().curve(p.c)(e[t].values),l=p.g().domain([0,2]).range([50,750]),s=p.g().domain([3.5,-3.5]).range([50,750]),r=p.a().scale(l),u=p.b().scale(s);if(document.getElementById(n)&&p.h("#"+a).attr("d",o),!document.getElementById(n)){var c=p.h("#sinePlotsID").append("svg").attr("id",n).attr("width",800).attr("height",800).attr("transform","translate(10)").attr("style","position: absolute").attr("style","border: 1px solid black").attr("top","100px").attr("left","50px");c.append("text").attr("text-anchor","middle").attr("x",400).attr("y",30).style("font-size","16px").style("text-decoration","underline").text("Sine Plot "+t),c.append("path").attr("id",a).attr("transform","translate(50)").attr("d",o).attr("stroke","blue").attr("stroke-width",2).attr("fill","none"),c.append("g").attr("transform","translate(0,400)").call(r),c.append("g").attr("transform","translate(50,0)").call(u)}}return i.a.createElement("div",null)}}]),t}(i.a.Component),A=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(r.a)(t,[{key:"renderCircle",value:function(e){var t=this;return i.a.createElement(F,{signal:e,onMouseDown:function(e){return t.props.onMouseDown(e)},onMouseUp:function(e){return t.props.onMouseUp(e)},onMouseOut:function(e){return t.props.onMouseUp(e)},onMouseMove:function(e){return t.props.onMouseMove(e)}})}},{key:"render",value:function(){this.props.signals;for(var e=p.h("#svgFreqPlot"),t=[],n=0;n<this.props.signals.length;n++)t.push(this.renderCircle(this.props.signals[n]));if(!document.getElementById("x_axis_freqPlot")){var a=p.g().domain([-3.5,3.5]).range([50,750]),o=p.g().domain([3.5,-3.5]).range([50,750]),l=p.a().scale(a),s=p.b().scale(o);e.append("text").attr("text-anchor","middle").attr("x",400).attr("y",30).style("font-size","16px").style("text-decoration","underline").text("Frequency Domain Plot"),e.append("g").attr("id","x_axis_freqPlot").attr("transform","translate(0,400)").call(l),e.append("g").attr("id","y_axis_freqPlot").attr("transform","translate(400,0)").call(s)}return i.a.createElement("svg",null,t)}}]),t}(i.a.Component),U=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){for(var e=[],t=0;t<700;t++)e.push([0,0]);for(var n=0;n<this.props.signals.length;n++)for(var a=0;a<this.props.signals[n].values.length;a++)e[a][0]=this.props.signals[n].values[a][0],e[a][1]+=this.props.signals[n].values[a][1];for(var o=0;o<e.length;o++)e[o][1]=e[o][1]-400*(this.props.signals.length-1);var l=p.f().curve(p.c)(e),s=p.g().domain([0,2]).range([50,750]),r=p.g().domain([3.5,-3.5]).range([50,750]),u=p.a().scale(s),c=p.b().scale(r);if(document.getElementById("path_Sum")&&p.h("#path_Sum").attr("d",l),!document.getElementById("path_Sum")){p.h("#svgSumPlot").append("path").attr("id","path_Sum").attr("d",l).attr("transform","translate(50)").attr("stroke","blue").attr("stroke-width",2).attr("fill","none");var g=p.h("#svgSumPlot");g.append("text").attr("text-anchor","middle").attr("x",400).attr("y",30).style("font-size","16px").style("text-decoration","underline").text("Sum of Signals Plot"),g.append("g").attr("transform","translate(0,400)").call(u),g.append("g").attr("transform","translate(20,0)").call(c).attr("transform","translate(50,0)")}return i.a.createElement("div",null)}}]),t}(i.a.Component),R=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={signals:[],circles:[]},n.handleMouseDown=n.handleMouseDown.bind(Object(f.a)(n)),n.handleMouseUp=n.handleMouseUp.bind(Object(f.a)(n)),n.handleMouseMove=n.handleMouseMove.bind(Object(f.a)(n)),n}return Object(g.a)(t,e),Object(r.a)(t,[{key:"addSignal",value:function(){var e=this.state.signals;this.setState({signals:e.concat([{id:e.length,amplitude:0,frequency:0,phase:0,values:this.generateSignal(0,0,0),dragging:!1}])})}},{key:"removeSignal",value:function(e){var t=this.state.signals;console.log("Hi from removeSignal"),console.log(e),console.log("Before: ",t),t.splice(e,1),console.log("After:",t);for(var n=0;n<this.state.signals.length;n++)t[n].id=n;var a="svg_",i="path_";a=a.concat(e.toString(10)),i=i.concat(e.toString(10)),p.h("#"+a).remove(),this.setState({signals:t}),console.log(this.state.signals)}},{key:"generateSignal",value:function(e,t,n){for(var a=[],i=Math.PI/200,o=0;o<700;o++)a[o]=[o,-100*e*Math.sin(i*t*o+n*(Math.PI/180))+400];return a}},{key:"updateDials",value:function(){for(var e=this.state.signals,t=0;t<e.length;t++)document.getElementById("signal"+e[t].id+"_AmpText").value=e[t].amplitude,document.getElementById("signal"+e[t].id+"_FreqText").value=e[t].frequency}},{key:"handleChange",value:function(e){var t=this.state.signals,n=e.target.getAttribute("input_type"),a=e.target.getAttribute("signal_id"),i=parseFloat(e.target.value);"AmpDial"===n||"AmpText"===n?isNaN(i)?i=0:(t[a].amplitude=i,t[a].values=this.generateSignal(t[a].amplitude,t[a].frequency,t[a].phase),document.getElementById("signal"+a+"_AmpText").value=i):"FreqDial"===n||"FreqText"===n?isNaN(i)?i=0:(t[a].frequency=i,t[a].values=this.generateSignal(t[a].amplitude,t[a].frequency,t[a].phase),document.getElementById("signal"+a+"_FreqText").value=i):"PhaseDial"!==n&&"PhaseText"!==n||(isNaN(i)?i=0:(t[a].phase=i,t[a].values=this.generateSignal(t[a].amplitude,t[a].frequency,t[a].phase),document.getElementById("signal"+a+"_PhaseText").value=i)),this.setState({signals:t})}},{key:"handleMouseDown",value:function(e){console.log("clicked"),e.preventDefault();var t=this.state.signals;t[e.target.getAttribute("signal_id")].dragging=!0,this.setState({signals:t})}},{key:"handleMouseUp",value:function(e){console.log("click released");var t=this.state.signals,n=e.target.getAttribute("signal_id");console.log(e.type),"mouseout"==e.type&&t[n].dragging?console.log("mouse went out"):(t[n].dragging=!1,this.setState({signals:t}))}},{key:"handleMouseMove",value:function(e){var t=this.state.signals,n=e.target.getAttribute("signal_id");if(t[n].dragging){e.preventDefault(),console.log(e),console.log(e.target),console.log("clientX:",e.clientX),console.log("clientY:",e.clientY);var a=e.target.parentNode.parentNode.getBoundingClientRect();console.log(a.left),console.log(a.top),t[n].frequency=(e.clientX-a.left-400)/100,t[n].amplitude=-(e.clientY-a.top-400)/100,t[n].values=this.generateSignal(t[n].amplitude,t[n].frequency,t[n].phase),console.log(t[n].frequency),console.log(t[n].amplitude),console.log(this),this.setState({signals:t})}}},{key:"render",value:function(){var e=this,t=this.state.signals;return i.a.createElement("div",{className:j.a.container},i.a.createElement("div",{className:j.a.sinePlots,id:"sinePlotsID"},i.a.createElement(N,{signals:t})),i.a.createElement("div",{className:j.a.otherPlots},i.a.createElement("div",{className:j.a.freqPlots,id:"freqPlotsID"},i.a.createElement("svg",{id:"svgFreqPlot",width:"800",height:"800",style:{position:"relative",top:"0%",left:"0%",transform:"translate(0%, 0%)",border:"1px solid black"}},i.a.createElement(A,{signals:t,onMouseDown:function(t){return e.handleMouseDown(t)},onMouseUp:function(t){return e.handleMouseUp(t)},onMouseOut:function(t){return e.handleMouseUp(t)},onMouseMove:function(t){return e.handleMouseMove(t)}}))),i.a.createElement("div",{className:j.a.sumPlots,id:"sumPlotsID"},i.a.createElement("svg",{id:"svgSumPlot",width:"800",height:"800",style:{position:"relative",top:"0%",left:"0%",transform:"translate(0%, 0%)",border:"1px solid black"}},i.a.createElement(U,{signals:t})))),i.a.createElement("div",{className:j.a.controls},i.a.createElement(q,{signals:t,onChange:function(t){return e.handleChange(t)},onAdd:function(){return e.addSignal()},onRemove:function(t){return e.removeSignal(t)}})))}}]),t}(i.a.Component);function T(){return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"}),i.a.createElement(m.a,null,i.a.createElement("div",{className:h.a.navbar},i.a.createElement("div",{className:h.a.tab,id:"home"},i.a.createElement(m.b,{to:"/"},"Home")),i.a.createElement("div",{className:h.a.tab},i.a.createElement(m.b,{to:"/about"},"About")),i.a.createElement("div",{className:h.a.tab},i.a.createElement(m.b,{to:"/FourierCoefficients"},"Fourier Coefficients")),i.a.createElement("div",{className:h.a.tab},i.a.createElement(m.b,{to:"/FrequencyDomain"},"Frequency Domain"))),i.a.createElement(v.c,null,i.a.createElement(v.a,{exact:!0,path:"/"},i.a.createElement(Y,null)),i.a.createElement(v.a,{path:"/about"},i.a.createElement(W,null)),i.a.createElement(v.a,{path:"/FourierCoefficients"},i.a.createElement(O,null)),i.a.createElement(v.a,{path:"/FrequencyDomain"},i.a.createElement(R,null)))))}function W(){return i.a.createElement("div",{className:h.a.centertext},i.a.createElement("div",null,i.a.createElement("h2",null,"About the Project"),i.a.createElement("h4",null,"The aim of the project was to help students to have a more intuitive understanding of the various topics in ECE2111 - Signals and Systems. The unit ECE2111, Signals and Systems, taught by lecturer James Saunderson, involves many visual representations of the properties of sinusoidal signals and their frequency response."),i.a.createElement("h4",null,"James had an idea of a helpful, interactive web application where students could interact with and adjust signal properties and observe the relationships in time domain, frequency domain etc. Hence, this final year project was proposed."),i.a.createElement("h2",null)))}var Y=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:h.a.centertext},i.a.createElement("h2",null,"Welcome!"),i.a.createElement("h4",null,"This website was designed to allow students to learn more about topics in the unit ECE2111 through visualization and interaction with signal properties."),i.a.createElement("h4",null,"Feel free to explore the topics, there's (hopefully) more to come!")))}}]),t}(i.a.Component);l.a.render(i.a.createElement(T,null),document.getElementById("root"));var H=T;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[86,1,2]]]);
//# sourceMappingURL=main.25f600e1.chunk.js.map