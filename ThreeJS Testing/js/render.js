/* =============== To Do's =============== */
/*
    0) When zooming in or out of the page, the scaling goes haywire.
    Need to fix by setting elements relative to webpage rather than absolute. 

    1) Install Nodejs to build Threejs with DragControl 
    Need to learn how the build process works to make app lightweight 
    i.e. don't include uncessary modules or code
    https://github.com/mrdoob/three.js/wiki/Build-instructions

    2) Build React with a build process 
    Babel (which is often used in React) needs to be installed in a Node environment 
    See:
    https://stackoverflow.com/questions/48414834/installing-babel-to-use-with-react-and-jsx
    https://create-react-app.dev/docs/deployment/#github-pages

    3) Figure out how to host (Github pages?)

    - Webpack?
    - Typescript in the future?
    - As project gets bigger, build processes?
*/

// 'use strict';

/* =============== Initializes scene, camera and renderer =============== */
// import * as THREE from 'three';  // Needs Webpack build process

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/* =============== User Input =============== */

// !NEED TO MAKE THESE SLIDERS/USER INPUT DIALS MORE MODULAR OR AS CLASSES
// !NUMERICAL NUMBERING OF VARIABLES WILL BREAK CODE EASILY

// Sliders removes the previous wave and redraws a new wave based on new parameters
// This remove and redraw operations are pretty expensive memory wise? 
// Should probably use this.mesh.geometry.verticesNeedUpdate = true; method 

// Frequency Slider 1
document.getElementById("sliderFreq1").oninput = function() {
    // console.log("Slided!");
    document.getElementById("sliderFreqInput1").innerHTML = document.getElementById("sliderFreq1").value;
    
    freq[1] = parseInt(document.getElementById("sliderFreq1").value);

    scene.remove(wave);

    wave = initWave(amp,freq);
    scene.add(wave);
    wave.position.set(-1,1,0);
    
    renderer.render( scene, camera );
    
    // animateWave();
};

// Amplitude Slider 1
document.getElementById("sliderAmp1").oninput = function() {
    // console.log("Slided!");
    document.getElementById("sliderAmpInput1").innerHTML = document.getElementById("sliderAmp1").value;

    amp[1] = parseInt(document.getElementById("sliderAmp1").value);

    scene.remove(wave);

    wave = initWave(amp,freq);
    scene.add(wave);
    wave.position.set(-1,1,0);
    
    renderer.render( scene, camera );
    
    // animateWave();
};

// Frequency Slider 2
document.getElementById("sliderFreq2").oninput = function() {
    // console.log("Slided!");
    document.getElementById("sliderFreqInput2").innerHTML = document.getElementById("sliderFreq2").value;
    
    let scale = document.getElementById("sliderFreq2").value;
    freq2[0] = parseInt(scale);

    scene.remove(wave2);

    wave2 = initWave(amp2,freq2);
    scene.add(wave2);
    wave2.position.set(3,1,0);
    
    renderer.render( scene, camera );
    
    // animateWave();
};

// Amplitude Slider 2
document.getElementById("sliderAmp2").oninput = function() {
    // console.log("Slided!");
    document.getElementById("sliderAmpInput2").innerHTML = document.getElementById("sliderAmp2").value;
    
    let scale = document.getElementById("sliderAmp2").value;
    amp2[0] = parseInt(scale);

    scene.remove(wave2);

    wave2 = initWave(amp2,freq2);
    scene.add(wave2);
    wave2.position.set(3,1,0);
    
    renderer.render( scene, camera );
    
    // animateWave();
};

// https://stackoverflow.com/questions/50188311/three-dragcontrols-is-not-a-constructor-error

/*  Requires proper build process of Threejs rather than just including a script
// Drag Controls
objects = [circle];
const controls = new THREE.DragControls( objects, camera, renderer.domElement );

// add event listener to highlight dragged objects

controls.addEventListener( 'dragstart', function ( event ) {

	event.object.material.emissive.set( 0xaaaaaa );

} );

controls.addEventListener( 'dragend', function ( event ) {

	event.object.material.emissive.set( 0x000000 );

} );
*/

/* =============== Model Constructors =============== */

// initCube
const initCube = function (){    
    const geometryCube = new THREE.BoxGeometry();
    const materialCube = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh( geometryCube, materialCube );
    // console.log(cube);
    return cube;
}

// initLine
const initLine = function () {
    const materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const points = [];
    points.push( new THREE.Vector3( - 1, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 1, 0 ) );
    points.push( new THREE.Vector3( 1, 0, 0 ) );

    const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometryLine, materialLine );

    // console.log(line);
    return line;

}

// initCircle
const initCircle = function (){
    const geometry = new THREE.CircleGeometry( 0.05, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const circle = new THREE.Mesh( geometry, material );
    return circle;
}

// initWave
const initWave = function (amp,freq) {
            
    const step = 0.001;
    const x_max = 2*Math.PI;
    let wavepoints = [];
    let y = 0;

    // Should be a "try, except" for graceful error handling
    if(amp.length != freq.length){
        console.log( "Error: Number of Amplitudes and Frequencies does not match");
        console.log(amp);
        console.log(freq);
        return "Error: Number of Amplitudes and Frequencies does not match";
    }        

    for(x=0; x < x_max ; x += x_max*step){
        for(i = 0; i < amp.length; i++){
                y += amp[i] * Math.sin( freq[i] * x );
        }     
        wavepoints.push(new THREE.Vector3( x, y, 0));
        y = 0;
    }

    // y = A*Math.sin(C*x) + B*Math.sin(D*x);           // A=1,B=1,C=2,D=1
    // wavepoints.push(new THREE.Vector3( x, y, 0));

    const materialWave = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    const geometryWave = new THREE.BufferGeometry().setFromPoints( wavepoints );
    const wave = new THREE.Line(geometryWave, materialWave);
    console.log(wave.geometry.attributes.position);
    wave.scale.set(0.5,0.5,0.5);
    return wave;
    
};

/* =============== Animations =============== */

const animateCube = function () {
    requestAnimationFrame( animateCube );

    // console.log("AnimateCube!");
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};			

const animateLine = function () {
    requestAnimationFrame( animateLine );

    // console.log("AnimateLine!");
    // line.rotation.x += 0.01;
    line.rotation.y += 1;

    renderer.render( scene, camera );
};

// animateWave() may not be relevant as we draw a new wave each time for 
// different frequencies

const animateWave = function () {
     requestAnimationFrame( animateWave );

    // console.log("AnimateWave!");
    

    // wave.geometry.attributes.position.needsUpdate = true; 
    
    renderer.render( scene, camera );
};


/* =============== Initialize models and render =============== */


// Cube
cube = initCube();
scene.add( cube );
cube.position.set(-4,2,0);

// Line
line = initLine();
scene.add( line );
line.position.set(-4,-2,0);


// Circle
// circle = initCircle();
// scene.add( circle );

// Wave
// Should these be global? At the moment they are
// Maybe make a Wave class and have these amp and freq as public fields
let amp = [1,1];
let freq = [1,1];

wave = initWave(amp,freq);

scene.add(wave);
wave.position.set(-1,1,0);

let amp2 = [1]
let freq2 = [1];
wave2 = initWave(amp2, freq2);

scene.add(wave2);
wave2.position.set(3,1,0);

renderer.render( scene, camera );

animateCube();
animateLine();
// animateWave();

