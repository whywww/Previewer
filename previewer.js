'use strict';
import * as THREE from './resources/three.module.js';

// global
var canvas, camera, scene, renderer;
var loader;
var isDrag = false;
var xMclik, yMclik; 
var xMdragTot = 0, yMdragTot = 0;
var imagePathPrefix = './images/';
var curr = 0;
var maxi = 29;

function main(){
    canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Set up a camera
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( -aspect, aspect, 1, - 1, 0, 1 );

    // Make a scene
    scene = new THREE.Scene();

    // Create a texture 
    loader = new THREE.TextureLoader();
        loader.load(imagePathPrefix + curr.toString() + '.png', function ( texture ) {
            var geometry = new THREE.PlaneBufferGeometry(1.5, 1.5);

            var material = new THREE.MeshBasicMaterial( { map: texture } );

            var mesh = new THREE.Mesh( geometry, material );

            scene.add( mesh );

            renderer.render(scene, camera);
        });
    

    window.addEventListener("resize", onResize, false);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function update(image){
    loader.load(image, function ( texture ) {
        var geometry = new THREE.PlaneBufferGeometry(1.5, 1.5);

        var material = new THREE.MeshBasicMaterial( { map: texture } );

        var mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );

        renderer.render(scene, camera);
    });
}

function next(){
    if (curr >= maxi) console.log('this is the last one!');
    else{
        curr ++;
        var image = imagePathPrefix + curr.toString() + '.png';
        document.getElementById('id').innerHTML = curr.toString() + '.png';
        update(image);
    }
}

function previous(){
    if (curr <= 0) console.log('this is the first one!');
    else{
        curr --;
        var image = imagePathPrefix + curr.toString() + '.png';
        document.getElementById('id').innerHTML = curr.toString() + '.png';
        update(image);
    }
}

function mouseDown(ev){
    var rect = ev.target.getBoundingClientRect();
    var xp = ev.clientX - rect.left;
    var yp = canvas.height - (ev.clientY - rect.top);
    var x = (xp - canvas.width/2) / (canvas.width/2);
    var y = (yp - canvas.height/2) / (canvas.height/2);
    isDrag = true;
    xMclik = x;	
    yMclik = y;
}

function mouseMove(ev){
    if(isDrag==false) return;	

    var rect = ev.target.getBoundingClientRect();	
    var xp = ev.clientX - rect.left;							
    var yp = canvas.height - (ev.clientY - rect.top);
    
    var x = (xp - canvas.width/2) / (canvas.width/2);	
    var y = (yp - canvas.height/2) / (canvas.height/2);
 
    xMdragTot = (x - xMclik);
    yMdragTot = (y - yMclik);
    
    xMclik = x;
    yMclik = y;

    if (xMdragTot < 0){
        next();
    } else if (xMdragTot > 0){
        previous();
    }
}

function mouseUp(ev) {
    isDrag = false;	
}

main();